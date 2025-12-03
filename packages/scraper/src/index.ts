import { chromium } from 'playwright';

async function main() {
  console.log('Starting scraper...');
  const browser = await chromium.launch(); // Headless by default
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to NGO Darpan...');
    // Sometimes gov sites are slow or block headless. We might need user agent spoofing later.
    await page.goto('https://ngodarpan.gov.in/', { timeout: 60000 });
    const title = await page.title();
    console.log(`Page title: ${title}`);
  } catch (error) {
    console.error('Error fetching page:', error);
  } finally {
    await browser.close();
  }
}

main();
