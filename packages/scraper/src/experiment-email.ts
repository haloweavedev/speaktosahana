import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const CAPTCHA_OVERRIDE = process.env.CAPTCHA_TEXT || "";
const OUTPUT_DIR = path.join(process.cwd(), "outputs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "email-experiment.json");
const CAPTCHA_PATH = path.join(OUTPUT_DIR, "experiment-captcha.png");

const SELECTIONS = {
  selectedState: "Karnataka",
  selectedDistrict: "BENGALURU URBAN",
  selectedSectors: ["Differently Abled"],
  selectedNgoTypes: ["Section 8 Company", "Society", "Trust"],
};

async function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

async function solveCaptcha(imageBase64: string): Promise<string> {
  if (CAPTCHA_OVERRIDE) return CAPTCHA_OVERRIDE.trim();
  if (!OPENAI_API_KEY) throw new Error("Set OPENAI_API_KEY");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: [{
        role: "user",
        content: [
          { type: "input_text", text: "Return exactly the characters in the image. No spaces." },
          { type: "input_image", image_url: `data:image/png;base64,${imageBase64}` }
        ]
      }]
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

async function main() {
  await ensureOutputDir();
  console.log("🧪 Starting Email Decryption Experiment...");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("   Navigating...");
    await page.goto("https://ngodarpan.gov.in/#/search-ngo", { waitUntil: "networkidle", timeout: 60000 });

    // Fill Filters
    console.log("   Applying filters...");
    await page.locator('p-dropdown[formcontrolname="selectedState"]').click();
    await page.locator(".p-dropdown-items li", { hasText: SELECTIONS.selectedState }).first().click();
    await page.waitForTimeout(200);

    await page.locator('p-dropdown[formcontrolname="selectedDistrict"]').click();
    await page.locator(".p-dropdown-items li", { hasText: SELECTIONS.selectedDistrict }).first().click();

    await page.locator('p-multiselect[formcontrolname="selectedSectors"]').click();
    for (const s of SELECTIONS.selectedSectors) {
      await page.locator(".p-multiselect-item", { hasText: s }).first().click();
    }
    await page.keyboard.press("Escape");

    await page.locator('p-multiselect[formcontrolname="selectedNgoTypes"]').click();
    for (const t of SELECTIONS.selectedNgoTypes) {
      await page.locator(".p-multiselect-item", { hasText: t }).first().click();
    }
    await page.keyboard.press("Escape");

    // Retry Loop for Search
    let searchSuccess = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
        console.log(`   Search Attempt ${attempt}...`);
        
        // Refresh Captcha if not first attempt
        if (attempt > 1) {
            const refreshBtn = page.locator(".captcha-refresh"); 
            await refreshBtn.click();
            await page.waitForTimeout(1000);
        }

        const captchaCanvas = page.locator("canvas.captcha-canvas");
        await captchaCanvas.waitFor();
        await captchaCanvas.screenshot({ path: CAPTCHA_PATH });
        const buffer = fs.readFileSync(CAPTCHA_PATH);
        const captchaText = await solveCaptcha(buffer.toString("base64"));
        await page.fill("#captchaInput", captchaText);

        await page.locator("#commonScrollTo button", { hasText: "Search" }).click();
        
        try {
            await page.waitForSelector("table tbody tr", { timeout: 20000 });
            const html = await page.locator("table tbody").innerHTML();
            if (html.includes("No Data Found")) {
                console.log("   Result: No Data Found.");
                continue; 
            }
            searchSuccess = true;
            break; 
        } catch (e) {
            console.log("   Search timed out.");
        }
    }

    if (!searchSuccess) throw new Error("Failed to get search results after 3 attempts.");

    console.log("   Table found with data.");
    
    // Try first 3 records
    for (let i = 0; i < 3; i++) {
        console.log(`   Attempting Record #${i + 1}...`);
        
        if (i > 0) {
             await page.locator('button', { hasText: 'Back' }).click(); 
             await page.waitForTimeout(1000);
        }

        const rowLink = page.locator("table tbody tr td:nth-child(2) a").nth(i);
        await rowLink.scrollIntoViewIfNeeded();
        await rowLink.click();

        // Wait for Email Label
        const emailLabel = page.locator('span', { hasText: "NPO Contact Email" });
        await emailLabel.waitFor({ timeout: 15000 });
        
        // FORCE CLICK "View NPO Email" if present
        const foundEmail = await page.evaluate(async () => {
            const buttons = Array.from(document.querySelectorAll('a'));
            const viewBtn = buttons.find(b => b.textContent?.trim() === 'View NPO Email');
            if (viewBtn) {
                viewBtn.click();
                await new Promise(r => setTimeout(r, 1500));
            }
            const card = Array.from(document.querySelectorAll('p-card')).find(c => c.innerText.includes('NPO Contact Email'));
            return card ? card.innerText : null;
        });

        if (foundEmail) {
             const emailMatch = foundEmail.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
             if (emailMatch) {
                console.log(`   ✅ Success! Found Email: ${emailMatch[0]}`);
                fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ 
                    rawText: foundEmail, 
                    email: emailMatch[0],
                    timestamp: new Date().toISOString()
                }, null, 2));
                return;
             }
        }
        
        console.log("   ❌ No email found in text block.");
    }
    
    console.log("   Failed to find email in first 3 records.");

  } catch (err) {
    console.error("❌ Experiment failed:", err);
  } finally {
    await browser.close();
  }
}

main();
