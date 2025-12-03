import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { performance } from "node:perf_hooks";
import { chromium, Browser, BrowserContext, Page } from "playwright";
import prisma, { withRetry } from "@repo/db";

// --- Configuration ---
const HEADLESS = process.env.PLAYWRIGHT_HEADLESS !== "false"; // Default true
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const CAPTCHA_OVERRIDE = process.env.CAPTCHA_TEXT || "";
const OUTPUT_DIR = path.join(process.cwd(), "outputs");
const CAPTCHA_PATH = path.join(OUTPUT_DIR, "session-captcha.png");
const TABLE_RECORDS_PATH = path.join(OUTPUT_DIR, "final-records.json");
const TARGET_RECORDS = Number(process.env.TARGET_RECORDS || 10000); // Default to all if not set
const DRY_RUN = process.env.DRY_RUN === "true"; // Skip DB ingest if true

// Parallelism for Email Enrichment
const CONCURRENCY_LIMIT = 1; 

// Filter Config
const SELECTIONS = {
  selectedState: process.env.SCRAPER_STATE || "Karnataka",
  selectedDistrict: process.env.SCRAPER_DISTRICT || "BENGALURU URBAN",
  selectedSectors: (process.env.SCRAPER_SECTORS || "Differently Abled").split(",").map(s => s.trim()).filter(Boolean),
  selectedNgoTypes: (process.env.SCRAPER_TYPES || "Section 8 Company,Society,Trust").split(",").map(s => s.trim()).filter(Boolean),
};

// --- Interfaces ---
interface ApiNgoSummary {
  ngoId: string;
  darpanId: string;
  ngoName: string;
  ngoType: string;
  registrationNo: string;
  districtName: string;
  stateName: string;
  address: string;
  pinCode: number | null;
  subDstName: string;
  lastUpdateOn: string;
  sectors: string; // Comma separated
  latitude?: number;
  longitude?: number;
}

interface EnrichedNgo extends ApiNgoSummary {
  email: string | null;
  mobile: string | null; // Sometimes available in details
  registrationDate: Date | null;
  detailsRaw?: any;
}

// --- Utility Functions ---

async function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function computeHash(data: any) {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
}

async function solveCaptcha(imageBase64: string): Promise<string> {
  if (CAPTCHA_OVERRIDE) return CAPTCHA_OVERRIDE.trim();
  if (!OPENAI_API_KEY) throw new Error("No OPENAI_API_KEY provided for captcha.");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: [{ role: "user", content: [
        { type: "input_text", text: "Return exactly the characters in the image. No spaces." },
        { type: "input_image", image_url: `data:image/png;base64,${imageBase64}` }
      ]}]
    }),
  });

  const payload = await response.json();
  let text = "";
  if (Array.isArray(payload.output) && payload.output.length > 0) {
      text = payload.output[0].content[0].text || "";
  } else if (payload.choices && payload.choices.length > 0) {
      text = payload.choices[0].message?.content || "";
  }
  return text.replace(/\s+/g, "").trim();
}

// --- Phase 1: Authentication & API Harvesting ---

async function establishSession(browser: Browser): Promise<{ context: BrowserContext, page: Page, cookies: any[] }> {
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("🔐 Establishing Session...");
  await page.goto("https://ngodarpan.gov.in/#/search-ngo", { waitUntil: "networkidle", timeout: 60000 });

  // 1. Filters
  console.log("   Applying Filters...");
  await page.locator('p-dropdown[formcontrolname="selectedState"]').click();
  await page.locator(".p-dropdown-items li", { hasText: SELECTIONS.selectedState }).first().click();
  await page.waitForTimeout(200);

  await page.locator('p-dropdown[formcontrolname="selectedDistrict"]').click();
  await page.locator(".p-dropdown-items li", { hasText: SELECTIONS.selectedDistrict }).first().click();

  await page.locator('p-multiselect[formcontrolname="selectedSectors"]').click();
  for (const s of SELECTIONS.selectedSectors) await page.locator(".p-multiselect-item", { hasText: s }).first().click();
  await page.keyboard.press("Escape");

  await page.locator('p-multiselect[formcontrolname="selectedNgoTypes"]').click();
  for (const t of SELECTIONS.selectedNgoTypes) await page.locator(".p-multiselect-item", { hasText: t }).first().click();
  await page.keyboard.press("Escape");

  // 2. Captcha Retry Loop
  let success = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    console.log(`   Captcha Attempt ${attempt}...`);
    if (attempt > 1) {
        const refresh = page.locator(".captcha-refresh");
        if (await refresh.isVisible()) await refresh.click();
        await page.waitForTimeout(1000);
    }

    const captchaCanvas = page.locator("canvas.captcha-canvas");
    await captchaCanvas.waitFor();
    await captchaCanvas.screenshot({ path: CAPTCHA_PATH });
    const buffer = fs.readFileSync(CAPTCHA_PATH);
    const text = await solveCaptcha(buffer.toString("base64"));
    await page.fill("#captchaInput", text);
    
    await page.locator("#commonScrollTo button", { hasText: "Search" }).click();

    try {
      // Wait for results or error
      const result = await Promise.race([
        page.waitForSelector("table tbody tr", { timeout: 20000 }).then(() => "success"),
        page.waitForSelector(".custom-error", { timeout: 5000 }).then(() => "error").catch(() => "timeout") // check for visual error text if any
      ]);
      
      // Check if "No Data Found" actually appeared
      const noData = await page.getByText("No Data Found").isVisible().catch(() => false);
      if (noData) {
          console.log("   Login failed (No Data / Invalid Captcha). Retrying...");
          continue;
      }
      
      if (result === "success") {
        success = true;
        break;
      }
    } catch (e) {
        console.log("   Search timeout.");
    }
  }

  if (!success) throw new Error("Failed to establish session after 3 attempts.");
  console.log("✅ Session Established. Capturing cookies...");
  
  const cookies = await context.cookies();
  return { context, page, cookies };
}

async function fetchAllSummaries(page: Page): Promise<ApiNgoSummary[]> {
  console.log("📡 Fetching Summaries via API...");
  
  // We need to reverse-engineer the search params. 
  // Since we just performed a search, we can intercept the request re-triggering it 
  // OR we can just construct it if we knew the IDs.
  // Easier: Just use `page.evaluate` to fetch the API using the current session state.
  // The URL format is: /apis/regis/ngos-summary?stateId=...
  
  // However, we need the internal IDs for State/District/Sector to build the URL.
  // We can get these by intercepting the request we JUST made during `establishSession`.
  // BUT, since we are already logged in and the state is in the App, let's just inspect the last request?
  // No, cleaner way: Just iterate pages.
  // ISSUE: We need the specific params (stateId=29, districtId=525, etc).
  // FIX: We will grab the parameters from the UI state or network logs during the setup phase if possible.
  
  // ALTERNATIVE: We don't need to know the IDs if we just scrape the API response from the *initial* search 
  // and then iterate `page` param.
  
  // Let's use a hardcoded approach for now based on our probes, but ideally we'd scrape the IDs.
  // Based on probes: Karnataka=29, Bengaluru Urban=525. 
  // To be robust, we should capture the LAST request url.
  
  const allNgos: ApiNgoSummary[] = [];
  let pageIdx = 0;
  let hasNext = true;
  
  // Extract params from the network request that just happened
  // We can't easily go back in time. 
  // Let's assume we scrape the "Total Records" from the pagination to know limit?
  
  // BETTER: Just loop until empty array.
  // How to construct URL? 
  // Use `page.evaluate` to read the component state? Too complex.
  // Let's use the Network Listener approach during the setup phase to capture the `searchUrl`.
  
  return allNgos; // Placeholder, see main() implementation logic
}

// --- Phase 2: Enrichment (Parallel Browser) ---

async function enrichNgo(context: BrowserContext, ngo: ApiNgoSummary): Promise<EnrichedNgo> {
  const page = await context.newPage();
  
  // Forward browser console logs to Node.js process output
  page.on('console', msg => console.log(`   [Browser Console - NGO ${ngo.darpanId}] ${msg.text()}`));

  let email: string | null = null;
  let mobile: string | null = null; // If we want it

  try {
    const detailUrl = `https://ngodarpan.gov.in/#/ngo/view?id=${ngo.darpanId}`;
    await page.goto(detailUrl, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Wait for Email Label
    const emailLabel = page.locator('span', { hasText: "NPO Contact Email" });
    await emailLabel.waitFor({ timeout: 15000 });
    console.log(`   [Enrich] NGO ${ngo.darpanId}: Email label found.`);

    // FORCE CLICK "View NPO Email" if present
    const foundEmail = await page.evaluate(async (darpanId: string) => {
        const buttons = Array.from(document.querySelectorAll('a'));
        const viewBtn = buttons.find(b => b.textContent?.trim() === 'View NPO Email');
        if (viewBtn) {
            console.log(`   [Enrich:PageEval] NGO ${darpanId}: Clicking 'View NPO Email'.`);
            (viewBtn as HTMLElement).click();
            await new Promise(r => setTimeout(r, 1500));
        } else {
            console.log(`   [Enrich:PageEval] NGO ${darpanId}: 'View NPO Email' button not found.`);
        }
        const card = Array.from(document.querySelectorAll('p-card')).find(c => (c as HTMLElement).innerText.includes('NPO Contact Email'));
        const rawCardText = card ? (card as HTMLElement).innerText : null;
        console.log(`   [Enrich:PageEval] NGO ${darpanId}: Raw card text: ${rawCardText ? rawCardText.substring(0, 100) + '...' : 'null'}`);
        return rawCardText;
    }, ngo.darpanId); // Pass darpanId to page.evaluate

    console.log(`   [Enrich] NGO ${ngo.darpanId}: Raw foundEmail from page.evaluate: ${foundEmail ? foundEmail.substring(0, 100) + '...' : 'null'}`);

    if (foundEmail) {
         const emailMatch = foundEmail.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
         console.log(`   [Enrich] NGO ${ngo.darpanId}: Email match result: ${emailMatch ? emailMatch[0] : 'null'}`);
         if (emailMatch) email = emailMatch[0];
    } else {
        console.log(`   [Enrich] NGO ${ngo.darpanId}: No raw email text found.`);
    }

  } catch (e: any) { // Add ': any' to 'e' to handle it as an error object
    console.warn(`   ⚠️ Failed to enrich ${ngo.ngoName} (Darpan ID: ${ngo.darpanId}): ${e.message}`);
  } finally {
    await page.close();
  }

  return {
    ...ngo,
    email,
    mobile,
    registrationDate: null // We will parse this from `ngo.registrationNo` or API if available
  };
}

// --- Phase 3: Ingest ---

async function ingestBatch(ngos: EnrichedNgo[]) {
  // Upsert Sectors
  const sectorSet = new Set<string>();
  ngos.forEach(n => n.sectors.split(",").forEach(s => sectorSet.add(s.trim())));
  
  const sectorMap = new Map<string, bigint>();
  for (const sName of sectorSet) {
      if(!sName) continue;
      const sector = await prisma.sector.upsert({
          where: { name: sName },
          update: {},
          create: { name: sName }
      });
      sectorMap.set(sName.toLowerCase(), sector.id);
  }

  // Upsert NGOs
  let count = 0;
  for (const n of ngos) {
      const sectors = n.sectors.split(",").map(s => s.trim()).filter(Boolean);
      const normalizedPayload = {
          darpanId: n.darpanId,
          name: n.ngoName,
          address: n.address,
          district: n.districtName,
          state: n.stateName,
          pincode: n.pinCode?.toString(),
          email: n.email,
          registrationNumber: n.registrationNo,
          latitude: n.latitude,
          longitude: n.longitude,
          sourceUrl: `https://ngodarpan.gov.in/#/ngo/view?id=${n.darpanId}`,
          scrapedAt: new Date(),
          raw: n as any
      };
      const hash = computeHash(normalizedPayload);

      // Check dedupe
      const existing = await prisma.ngo.findUnique({ where: { darpanId: n.darpanId } });
      if (existing && existing.hash === hash) continue;

      const ngoRecord = await prisma.ngo.upsert({
          where: { darpanId: n.darpanId },
          update: { ...normalizedPayload, hash },
          create: { ...normalizedPayload, hash }
      });

      // Link Sectors
      if (sectors.length) {
          const sectorIds = sectors.map(s => sectorMap.get(s.toLowerCase())).filter(Boolean) as bigint[];
          await prisma.ngoSector.deleteMany({ where: { ngoId: ngoRecord.id } }); // Reset relations
          await prisma.ngoSector.createMany({
              data: sectorIds.map(sid => ({ ngoId: ngoRecord.id, sectorId: sid })),
              skipDuplicates: true
          });
      }
      count++;
  }
  return count;
}


// --- Main ---

async function main() {
  await ensureOutputDir();
  console.log(`🚀 Starting SaaS-Grade Hybrid Scraper`);
  console.log(`   Target: ${SELECTIONS.selectedDistrict}, ${SELECTIONS.selectedState}`);

  const browser = await chromium.launch({ headless: HEADLESS });
  
  let searchApiUrl = ""; // Declare here
  let initialApiResponse: any = null; // Declare here
  let currentBatchResolver: ((data: any) => void) | null = null; // Declare here

  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('response', async res => {
      if (res.url().includes("/apis/regis/ngos-summary") && res.request().method() === "GET") {
          searchApiUrl = res.url(); // Now it's in scope
          
          if (res.ok()) {
              const data = await res.json();
              if (!initialApiResponse) { // Now it's in scope
                  initialApiResponse = data;
              }
              if (currentBatchResolver) { 
                  currentBatchResolver(data);
                  currentBatchResolver = null; 
              }
          }
      }
  });

  try {
      await establishSessionLogic(page);
      
      if (!searchApiUrl) throw new Error("Could not capture Search API URL during login.");
      console.log(`✅ Captured Base API: ${searchApiUrl}`);

      // 2. API Pagination Loop
      const allSummaries: ApiNgoSummary[] = [];
      let pageNum = 0; // Initialize page number for pagination
      
      console.log("   🔄 Attempting to switch to 100 rows per page to trigger API...");
      
      const startApi = performance.now();
      
      try {
          const rppDropdown = page.locator(".p-paginator-bottom p-dropdown").first();
          if (await rppDropdown.isVisible()) {
              await rppDropdown.click();
              
              // Set up the promise for the expected API response after dropdown change
              const firstBatchPromise = new Promise<any>(r => currentBatchResolver = r); 
              await page.locator('li', { hasText: '100' }).click();
              
              const firstBatch = await firstBatchPromise; // Wait for the response
              
              const list = firstBatch.ngos || [];
              allSummaries.push(...list);
              console.log(`      + ${list.length} records (Total: ${allSummaries.length}) from 100 rows/page.`);
          } else {
              throw new Error("Rows per page dropdown not visible.");
          }
      } catch (e) {
          console.log("   ⚠️ Could not switch to 100 rows per page. Falling back to initial API response (10 records/page).");
          if (initialApiResponse && initialApiResponse.ngos && initialApiResponse.ngos.length > 0) {
              allSummaries.push(...initialApiResponse.ngos);
              console.log(`      + ${initialApiResponse.ngos.length} records (Total: ${allSummaries.length}) from initial 10 records/page.`);
          } else {
              throw new Error("Failed to get initial records; neither dropdown worked nor initial API response was captured.");
          }
      }

      // Pagination Loop
      while (allSummaries.length < TARGET_RECORDS) {
          console.log(`   👉 Clicking Next Page (current total: ${allSummaries.length})...`);
          const nextBtn = page.locator(".p-paginator-next");
          
          // Check if disabled
          const isDisabled = await nextBtn.evaluate((el: any) => el.classList.contains('p-disabled') || el.disabled);
          if (isDisabled) {
              console.log("   End of pagination: Next button is disabled.");
              break;
          }
          
          // Set up a promise for the next batch before clicking
          const nextBatchPromise = new Promise<any>(r => currentBatchResolver = r);
          await nextBtn.click();
          
          // Wait for the API response (captured by listener)
          const nextBatch = await nextBatchPromise;
          
          const nextList = nextBatch.ngos || [];
          if (nextList.length === 0) {
              console.log("   End of pagination: No more records in API response.");
              break; 
          }

          allSummaries.push(...nextList);
          console.log(`      + ${nextList.length} records (Total: ${allSummaries.length})`);
          pageNum++;
      }
      
      if (allSummaries.length > TARGET_RECORDS) {
          allSummaries.splice(TARGET_RECORDS);
      }
      
      console.log(`📋 API Phase Complete. Discovered ${allSummaries.length} NGOs in ${((performance.now() - startApi)/1000).toFixed(2)}s.`);

      // 3. Parallel Enrichment
      console.log(`⚡ Starting Enrichment Phase (Concurrency: ${CONCURRENCY_LIMIT})...`);
      const startEnrich = performance.now();
      
      const enrichedResults: EnrichedNgo[] = [];
      // Chunking
      for (let i = 0; i < allSummaries.length; i += CONCURRENCY_LIMIT) {
          const chunk = allSummaries.slice(i, i + CONCURRENCY_LIMIT);
          console.log(`   Processing batch ${i} - ${i + chunk.length}...`);
          
          const promises = chunk.map(ngo => enrichNgo(context, ngo));
          const batchResults = await Promise.all(promises);
          enrichedResults.push(...batchResults);
          
          if (!DRY_RUN) {
            const saved = await ingestBatch(batchResults);
            console.log(`      Saved ${saved} records to DB.`);
          }
      }
      console.log(`✨ Enrichment Complete in ${((performance.now() - startEnrich)/1000).toFixed(2)}s.`);

      // Save JSON Backup
      fs.writeFileSync(TABLE_RECORDS_PATH, JSON.stringify(enrichedResults, null, 2));
      console.log(`✅ Done. Full data saved to ${TABLE_RECORDS_PATH}`);

  } catch (e) {
      console.error("❌ Fatal Error:", e);
  } finally {
      await browser.close();
      await prisma.$disconnect();
  }
}

// Helper to keep main clean (Logic duplicated from establishSession above for scope reasons)
async function establishSessionLogic(page: Page) {
  console.log("🔐 Establish Session Logic...");
  await page.goto("https://ngodarpan.gov.in/#/search-ngo", { waitUntil: "networkidle", timeout: 60000 });

  // Filters
  await page.locator('p-dropdown[formcontrolname="selectedState"]').click();
  await page.locator(".p-dropdown-items li", { hasText: SELECTIONS.selectedState }).first().click();
  await page.waitForTimeout(500);

  await page.locator('p-dropdown[formcontrolname="selectedDistrict"]').click();
  await page.locator(".p-dropdown-items li", { hasText: SELECTIONS.selectedDistrict }).first().click();

  // Multi-selects
  const fillMulti = async (selector: string, items: string[]) => {
      await page.locator(selector).click();
      for (const item of items) await page.locator(".p-multiselect-item", { hasText: item }).first().click();
      await page.keyboard.press("Escape");
  };
  await fillMulti('p-multiselect[formcontrolname="selectedSectors"]', SELECTIONS.selectedSectors);
  await fillMulti('p-multiselect[formcontrolname="selectedNgoTypes"]', SELECTIONS.selectedNgoTypes);

  // Captcha Loop
  for (let i = 0; i < 3; i++) {
      if (i > 0) {
          const refresh = page.locator(".captcha-refresh");
          if (await refresh.isVisible()) await refresh.click();
          await page.waitForTimeout(1000);
      }
      const canvas = page.locator("canvas.captcha-canvas");
      await canvas.waitFor();
      await canvas.screenshot({ path: CAPTCHA_PATH });
      const txt = await solveCaptcha(fs.readFileSync(CAPTCHA_PATH).toString("base64"));
      await page.fill("#captchaInput", txt);
      
      await page.locator("#commonScrollTo button", { hasText: "Search" }).click();
      
      try {
          await page.waitForSelector("table tbody tr", { timeout: 20000 });
          return; // Success
      } catch (e) {
          const html = await page.locator("table tbody").innerHTML().catch(() => "");
          if (html.includes("No Data Found")) {
              console.log("   No Data / Captcha Fail. Retrying...");
              continue;
          }
          // If table appeared, good.
      }
  }
  throw new Error("Login failed.");
}

main();
