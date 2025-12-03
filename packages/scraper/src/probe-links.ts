import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  console.log('Navigating to statewise_new...');
  await page.goto('https://ngodarpan.gov.in/index.php/home/statewise_new', { timeout: 60000 });
  
  try {
    await page.waitForSelector('table', { timeout: 10000 });
    console.log('Table found.');
    
    // Dump the first row HTML
    const firstRow = await page.innerHTML('table tbody tr:first-child');
    console.log('First Row HTML:', firstRow);
    
    // Check for links
    const links = await page.$$eval('table tbody tr td a', as => as.map(a => ({ href: a.href, text: a.innerText, onclick: a.getAttribute('onclick') })));
    console.log('Links found:', links.slice(0, 3));
    
  } catch (e) {
    console.log('Error:', e.message);
  }
  
  await browser.close();
}

main();
