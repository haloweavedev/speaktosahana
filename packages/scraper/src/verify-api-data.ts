import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const CAPTCHA_OVERRIDE = process.env.CAPTCHA_TEXT || "";
const OUTPUT_DIR = path.join(process.cwd(), "outputs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "api-probe-results.json");
const CAPTCHA_PATH = path.join(OUTPUT_DIR, "api-probe-captcha.png");

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

// --- Captcha Logic (Reused) ---
async function solveCaptcha(imageBase64: string): Promise<string> {
  if (CAPTCHA_OVERRIDE) return CAPTCHA_OVERRIDE.trim();
  if (!OPENAI_API_KEY) throw new Error("Set OPENAI_API_KEY or CAPTCHA_TEXT");

  console.log("   asking OpenAI to solve captcha...");
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Return exactly the characters in the image. No spaces. No punctuation.",
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${imageBase64}`,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI Error: ${await response.text()}`);
  }

  const payload = await response.json();
  console.log("   OpenAI Payload:", JSON.stringify(payload, null, 2)); // Debug

  let text = "";
  // Check for 'output' array from the new response format
  if (Array.isArray(payload.output) && payload.output.length > 0) {
      const firstItem = payload.output[0];
      if (Array.isArray(firstItem.content) && firstItem.content.length > 0) {
          text = firstItem.content[0].text || "";
      }
  }
  // Fallback for standard chat completion format
  if (!text && payload.choices && payload.choices.length > 0) {
      text = payload.choices[0].message?.content || "";
  }

  return text.replace(/\s+/g, "").trim();
}

async function main() {
  await ensureOutputDir();
  console.log("🚀 Starting API Data Verification Probe...");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let searchApiResponse: any = null;
  let detailsApiResponse: any = null;

  // 1. Intercept Responses
  page.on("response", async (response) => {
    const url = response.url();
    try {
      if (url.includes("/apis/") && response.status() === 200) {
          console.log(`[NETWORK] ${response.request().method()} ${url}`);
          if (url.includes("ngos-summary")) {
             console.log("✅ Captured Search API Response!");
             searchApiResponse = await response.json();
          } else if (url.includes("ngo-view")) {
             console.log("✅ Captured Details API Response (via UI interaction)!");
             detailsApiResponse = await response.json();
          }
      }
    } catch (e) {
      // ignore
    }
  });

  try {
    // 2. Navigate & Fill Form
    console.log("   Navigating to NGO Darpan...");
    await page.goto("https://ngodarpan.gov.in/#/search-ngo", {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    console.log("   Filling form filters...");
    // State
    await page.locator('p-dropdown[formcontrolname="selectedState"]').click();
    await page.locator(".p-dropdown-items li", { hasText: SELECTIONS.selectedState }).first().click();
    await page.waitForTimeout(500);

    // District
    await page.locator('p-dropdown[formcontrolname="selectedDistrict"]').click();
    await page.locator(".p-dropdown-items li", { hasText: SELECTIONS.selectedDistrict }).first().click();

    // Sectors
    await page.locator('p-multiselect[formcontrolname="selectedSectors"]').click();
    for (const s of SELECTIONS.selectedSectors) {
      await page.locator(".p-multiselect-item", { hasText: s }).first().click();
    }
    await page.keyboard.press("Escape");

    // Types
    await page.locator('p-multiselect[formcontrolname="selectedNgoTypes"]').click();
    for (const t of SELECTIONS.selectedNgoTypes) {
      await page.locator(".p-multiselect-item", { hasText: t }).first().click();
    }
    await page.keyboard.press("Escape");

    // 3. Captcha
    console.log("   Capturing captcha...");
    const captchaCanvas = page.locator("canvas.captcha-canvas");
    await captchaCanvas.waitFor();
    await captchaCanvas.screenshot({ path: CAPTCHA_PATH });
    const buffer = fs.readFileSync(CAPTCHA_PATH);
    const captchaText = await solveCaptcha(buffer.toString("base64"));
    console.log(`   Solved: ${captchaText}`);
    await page.fill("#captchaInput", captchaText);

    // 4. Submit Search
    console.log("   Clicking Search...");
    await page.locator("#commonScrollTo button", { hasText: "Search" }).click();

    // Wait for the API response (intercepted above) and the table to load
    await page.waitForSelector("table tbody tr", { timeout: 30000 });
    console.log("   Table loaded (UI).");

    if (!searchApiResponse) {
      console.warn("⚠️ Search API response was not captured automatically. Check URL pattern.");
    } else if (Array.isArray(searchApiResponse.ngos)) {
      console.log(`   Search API returned ${searchApiResponse.ngos.length} records (in 'ngos' field).`);
    } else {
      console.warn("⚠️ Search API response does not contain 'ngos'. Keys:", Object.keys(searchApiResponse));
    }

    // 5. Identify an ID for Details (Just for logging, we will click anyway)
    let targetId: string | null = null;

    if (searchApiResponse && Array.isArray(searchApiResponse.ngos) && searchApiResponse.ngos.length > 0) {
        const firstRecord = searchApiResponse.ngos[0];
        targetId = firstRecord.ngoId || firstRecord.id || firstRecord._id;
        console.log(`   Target ID from API: ${targetId}`);
    }

    // 6. CLICK THE UI TO TRIGGER REAL NETWORK REQUEST
    console.log("   Clicking first row to trigger details fetch...");
    const firstRowLink = page.locator("table tbody tr td:nth-child(2) a").first();
    await firstRowLink.waitFor({ state: "visible", timeout: 10000 });
    await firstRowLink.click();
    
    console.log("   Waiting for details network request...");
    await page.waitForTimeout(5000); // Give time for the request to fly and response to be captured

    if (!detailsApiResponse) {
        console.error("❌ Did not capture a 'details' API response after clicking.");
    } else {
        console.log("🎉 Successfully captured details from UI interaction.");
    }

    // 7. Save Output
    const resultData = {
        timestamp: new Date().toISOString(),
        searchApiUrl: "https://ngodarpan.gov.in/apis/regis/ngos-summary",
        detailsApiUrlTemplate: "https://ngodarpan.gov.in/apis/regis/view-ngo-details?id={id}",
        searchResultSample: searchApiResponse ? searchApiResponse : "Not Captured",
        detailsResultSample: detailsApiResponse ? detailsApiResponse : "Not Captured",
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(resultData, null, 2));
    console.log(`\n🎉 Done. Data saved to: ${OUTPUT_FILE}`);

  } catch (err) {
    console.error("❌ Script failed:", err);
  } finally {
    await browser.close();
  }
}

main();
