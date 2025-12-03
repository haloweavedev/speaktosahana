import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { chromium } from 'playwright';

// Reuse constants/logic from main script roughly
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const CAPTCHA_OVERRIDE = process.env.CAPTCHA_TEXT || "";
const OUTPUT_DIR = path.join(process.cwd(), "outputs");
const CAPTCHA_PATH = path.join(OUTPUT_DIR, "probe-captcha.png");

async function solveCaptcha(imageBase64: string): Promise<string> {
  if (CAPTCHA_OVERRIDE) return CAPTCHA_OVERRIDE.trim();
  if (!OPENAI_API_KEY) throw new Error("No OPENAI_API_KEY for probe");
  
  const body = {
    model: "gpt-4o-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: "Return exactly the characters in the image. No spaces." },
          { type: "input_image", image_url: `data:image/png;base64,${imageBase64}` },
        ],
      },
    ],
  };
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  return payload.output_text || payload.choices?.[0]?.message?.content || "ABCD"; // Fallback logic simplified
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Intercept responses
  page.on('response', async response => {
    const url = response.url();
    const type = response.request().resourceType();
    if (type === 'xhr' || type === 'fetch') {
      if (url.includes('index.php') || url.includes('api')) {
        console.log(`[RESPONSE] ${response.status()} ${url}`);
        try {
            const contentType = response.headers()['content-type'] || '';
            if (contentType.includes('application/json')) {
                 const text = await response.text();
                 console.log('   JSON Body Snippet:', text.slice(0, 300));
            }
        } catch(e) {}
      }
    }
  });

  console.log('Navigating...');
  await page.goto("https://ngodarpan.gov.in/#/search-ngo", { waitUntil: "networkidle", timeout: 60000 });

  // Fill State
  const stateDropdown = page.locator('p-dropdown[formcontrolname="selectedState"]');
  await stateDropdown.click();
  await page.locator('.p-dropdown-items li', { hasText: "Karnataka" }).first().click();
  
  // Fill District
  await page.waitForTimeout(1000);
  const distDropdown = page.locator('p-dropdown[formcontrolname="selectedDistrict"]');
  await distDropdown.click();
  await page.locator('.p-dropdown-items li', { hasText: "BENGALURU URBAN" }).first().click();

  // Captcha
  const captchaCanvas = page.locator("canvas.captcha-canvas");
  await captchaCanvas.waitFor();
  await captchaCanvas.screenshot({ path: CAPTCHA_PATH });
  const buffer = fs.readFileSync(CAPTCHA_PATH);
  const captchaText = await solveCaptcha(buffer.toString("base64"));
  console.log('Solved Captcha:', captchaText);
  await page.fill("#captchaInput", captchaText);

  // Search
  const searchBtn = page.locator("#commonScrollTo button", { hasText: "Search" });
  await searchBtn.click();

  // Wait for results
  try {
      await page.waitForSelector("table tbody tr", { timeout: 20000 });
      console.log('Table loaded!');
      
      const firstLink = page.locator("table tbody tr td:nth-child(2) a").first();
      const href = await firstLink.getAttribute('href');
      const onclick = await firstLink.getAttribute('onclick');
      console.log('First Link HREF:', href);
      console.log('First Link OnClick:', onclick);

      // Click it to trigger details network request
      await firstLink.click();
      await page.waitForTimeout(3000);
      
  } catch (e) {
      console.log('Table/Search failed (likely captcha)', e.message);
  }

  await browser.close();
}

main();
