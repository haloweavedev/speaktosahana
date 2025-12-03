require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const OUTPUT_DIR = path.join(process.cwd(), 'outputs');
const DETAIL_OUTPUT_PATH = path.join(OUTPUT_DIR, 'optimized-detail-records.json');
const SERVER_PORT = Number(process.env.COLLECTOR_PORT || process.env.SCRAPER_PORT || 4173);
const HEADLESS = process.env.PLAYWRIGHT_HEADLESS !== 'false';
const MAX_RECORDS = Number(process.env.MAX_DETAIL_RECORDS) || 5;
const INCLUDE_RAW = process.env.INCLUDE_RAW === 'true';

const SELECTIONS = {
  selectedState: 'Karnataka',
  selectedDistrict: 'BENGALURU URBAN',
  selectedSectors: ['Differently Abled'],
  selectedNgoTypes: ['Section 8 Company', 'Society', 'Trust'],
};

const DATE_SELECTOR =
  '#commonScrollTo > div.masonry-container.ng-star-inserted > p-card:nth-child(2) > div > div > div.p-card-content > div > div:nth-child(7) > p';
const EMAIL_SECTION_SELECTOR =
  '#commonScrollTo > div.masonry-container.ng-star-inserted > p-card:nth-child(4) > div > div > div.p-card-content > div > div:nth-child(2) > p';
const EMAIL_VIEW_TEXT = 'View NPO Email';
const EMAIL_LABEL_TEXT = 'NPO Contact Email';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const CAPTCHA_PROMPT = 'Return only the characters in the image.';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureOutputDir() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function captureCaptcha(page) {
  const captchaCanvas = page.locator('canvas.captcha-canvas');
  await captchaCanvas.waitFor({ state: 'visible', timeout: 20000 });
  const buffer = await captchaCanvas.screenshot();
  return buffer.toString('base64');
}

async function decodeCaptchaText(imageBase64) {
  if (!OPENAI_API_KEY) throw new Error('Set OPENAI_API_KEY');
  
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      input: [{ role: 'user', content: [
        { type: 'input_text', text: CAPTCHA_PROMPT },
        { type: 'input_image', image_url: `data:image/png;base64,${imageBase64}` }
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

async function selectDropdownOption(page, formControlName, optionText) {
  const dropdown = page.locator(`p-dropdown[formcontrolname="${formControlName}"]`);
  await dropdown.waitFor({ state: 'visible', timeout: 20000 });
  const trigger = dropdown.locator('.p-dropdown-trigger');

  // Some dropdowns briefly block pointer events; retry with a forced click if needed.
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await page
        .locator('.p-component-overlay.p-component-overlay-leave-active, .p-component-overlay')
        .first()
        .waitFor({ state: 'hidden', timeout: 3000 })
        .catch(() => {});
      await trigger.scrollIntoViewIfNeeded();
      await trigger.click({ timeout: 5000 });
      break;
    } catch (err) {
      if (attempt === 2) throw err;
      await page.waitForTimeout(200 + attempt * 150);
      await trigger.click({ force: true, timeout: 5000 }).catch(() => {});
    }
  }

  const option = page.locator('.p-dropdown-items li', { hasText: optionText }).first();
  await option.waitFor({ state: 'visible', timeout: 20000 });
  await option.click({ timeout: 10000 });
  // Wait for overlay to close or just short pause
  await page.waitForTimeout(200); 
}

async function selectMultiOptions(page, formControlName, optionTexts) {
  const multiselect = page.locator(`p-multiselect[formcontrolname="${formControlName}"]`);
  await multiselect.waitFor({ state: 'visible', timeout: 20000 });
  await multiselect.locator('.p-multiselect-label-container').click();
  await page.waitForSelector('.p-multiselect-panel:visible', { timeout: 20000 });
  const panel = page.locator('.p-multiselect-panel:visible').first();
  for (const text of optionTexts) {
    const item = panel.locator('.p-multiselect-item', { hasText: text }).first();
    await item.waitFor({ state: 'visible', timeout: 20000 });
    await item.click();
  }
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
}




function normalizeRow(row) {
  const serial = row['Sr. No.'] || row['Sr No.'] || null;
  const name = row['Name of NPO'] || row['Name'] || null;
  const registrationRaw = row['Registration No, District (State)'] || null;
  const address = row['Address'] || null;
  const sectors = Array.from(
    new Set((row['Sectors working in'] || '').split(',').map((item) => item.trim()).filter(Boolean))
  );
  
  const base = {
    serialNumber: serial,
    name,
    address,
    sectors,
    registration: { raw: registrationRaw },
  };

  if (INCLUDE_RAW) {
    base.raw = row;
  }

  return base;
}

function dedupeArray(values = []) {
  return Array.from(
    new Set(
      values
        .map((v) => (typeof v === 'string' ? v.trim() : v))
        .filter((v) => v !== undefined && v !== null && v !== '' && v !== '--')
    )
  );
}

function cleanValue(value) {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed || trimmed === '--') return null;
    return trimmed;
  }
  return value;
}

function buildOutputRecord(index, summary, detail) {
  const cleanedDetail = {
    ...detail,
    email: normalizeEmail(cleanValue(detail.email)),
    mobile: cleanValue(detail.mobile),
    website: cleanValue(detail.website),
    address: cleanValue(detail.address),
    registrationNo: cleanValue(detail.registrationNo),
    registeredWith: cleanValue(detail.registeredWith),
    typeOfNPO: cleanValue(detail.typeOfNPO),
    actName: cleanValue(detail.actName),
    cityOfRegistration: cleanValue(detail.cityOfRegistration),
    stateOfRegistration: cleanValue(detail.stateOfRegistration),
    dateOfRegistration: cleanValue(detail.dateOfRegistration),
    darpanId: cleanValue(detail.darpanId),
    darpanRegistrationDate: cleanValue(detail.darpanRegistrationDate),
    operationalStates: cleanValue(detail.operationalStates),
    operationalDistrict: cleanValue(detail.operationalDistrict),
    primarySectors: dedupeArray(detail.primarySectors || []),
    secondarySectors: dedupeArray(detail.secondarySectors || []),
    officeBearers: (detail.officeBearers || []).filter(Boolean),
  };

  const record = {
    index,
    serialNumber: cleanValue(summary.serialNumber),
    name: cleanValue(summary.name),
    address: cleanedDetail.address || cleanValue(summary.address),
    registration: {
      number: cleanedDetail.registrationNo || cleanValue(summary.registration?.raw),
      registeredWith: cleanedDetail.registeredWith,
      type: cleanedDetail.typeOfNPO,
      actName: cleanedDetail.actName,
      city: cleanedDetail.cityOfRegistration,
      state: cleanedDetail.stateOfRegistration,
      date: cleanedDetail.dateOfRegistration,
      darpanId: cleanedDetail.darpanId,
      darpanRegistrationDate: cleanedDetail.darpanRegistrationDate,
    },
    contact: {
      email: cleanedDetail.email,
      mobile: cleanedDetail.mobile,
      website: cleanedDetail.website,
    },
    primarySectors: cleanedDetail.primarySectors,
    secondarySectors: cleanedDetail.secondarySectors,
    operationalStates: cleanedDetail.operationalStates,
    operationalDistrict: cleanedDetail.operationalDistrict,
    officeBearers: cleanedDetail.officeBearers,
  };

  if (INCLUDE_RAW) {
    record.raw = {
      tableRow: summary.raw || summary,
      scrapedSections: detail._rawScrapedDetails,
    };
  }

  return record;
}

// --- Detail Extraction ---

async function extractTable(page) {
  await page.waitForSelector('table tbody tr', { timeout: 60000 });
  return page.$eval('table', (table) => {
    const headerNodes = Array.from(table.querySelectorAll('thead th'));
    const headers = headerNodes.map((node) => node.textContent.trim() || null);
    const rows = Array.from(table.querySelectorAll('tbody tr')).map((tr) => {
      const cells = Array.from(tr.querySelectorAll('td'));
      const rowObj = {};
      cells.forEach((cell, index) => {
        const key = headers?.[index] || `column${index + 1}`;
        rowObj[key] = cell.textContent.trim().replace(/\s+/g, ' ');
      });
      return rowObj;
    });
    return { headers, rows };
  });
}

function extractDate(text) {
  if (!text) return null;
  const trimmed = text.trim();
  const match = trimmed.match(/\d{2}-\d{2}-\d{4}/);
  return match ? match[0] : trimmed;
}

function normalizeEmail(value) {
  return (
    value
      ?.replace(/\[at\]/gi, '@')
      .replace(/\[dot\]/gi, '.')
      .replace(/\bat\b/gi, '@')
      .replace(/\bdot\b/gi, '.')
      .replace(/\s+/g, '')
      .trim() || null
  );
}

async function clickBackToTable(page) {
  // The back button usually has 'Back' text or is in a specific location
  const backButton = page.locator('button', { hasText: 'Back' });
  if (await backButton.isVisible()) {
      await backButton.click();
  } else {
      // Fallback selector from original script
      await page.locator('#exclude > p-button:nth-child(2) > button').click();
  }
  await page.waitForSelector('table tbody tr', { timeout: 60000 });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);
}

async function goToNextPage(page) {
  const nextButton = page.locator('button.p-paginator-next');
  if (!(await nextButton.isVisible())) return false;
  if (await nextButton.isDisabled()) return false;
  await nextButton.click();
  await page.waitForSelector('table tbody tr', { timeout: 60000 });
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(400);
  return true;
}

async function fetchDateAndEmailFallback(page) {
  let email = null;
  let dateOfRegistration = null;

  try {
    const dateNode = page.locator(DATE_SELECTOR);
    await dateNode.waitFor({ state: 'visible', timeout: 15000 });
    const dateText = await dateNode.textContent();
    dateOfRegistration = extractDate(dateText);
  } catch (_) {
    // Ignore if the specific date selector is missing for this record
  }

  try {
    const emailSection = page.locator(EMAIL_SECTION_SELECTOR);
    await emailSection.waitFor({ state: 'visible', timeout: 20000 });
    const viewLink = emailSection.locator('a', { hasText: EMAIL_VIEW_TEXT }).first();
    if ((await viewLink.count()) > 0) {
      await viewLink.click();
    }

    await emailSection.locator('span', { hasText: EMAIL_LABEL_TEXT }).waitFor({ timeout: 15000 });
    const emailText = await emailSection.evaluate((node) => {
      const label = node.querySelector('span')?.textContent || '';
      let text = node.textContent || '';
      if (label) {
        text = text.replace(label, '');
      }
      return text.replace(/\s+/g, ' ').trim();
    });
    email = normalizeEmail(emailText);
  } catch (_) {
    // Ignore if email is unavailable
  }

  return { email, dateOfRegistration };
}

async function gatherDetailForRow(page, rowIndex) {
  // Locate targets fresh per attempt to avoid stale handles when the table re-renders
  const resolveClickTarget = async () => {
    const row = page.locator('table tbody tr').nth(rowIndex);
    await row.waitFor({ state: 'visible', timeout: 60000 });

    const candidates = [
      row.locator('td:nth-child(2) a').first(),
      row.locator('td:nth-child(2) button').first(),
      row.locator('a', { hasText: /view/i }).first(),
      row.locator('button', { hasText: /view/i }).first(),
    ];

    for (const candidate of candidates) {
      if ((await candidate.count()) > 0) return candidate;
    }

    return row;
  };

  let clickTarget = await resolveClickTarget();

  let clicked = false;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await clickTarget.scrollIntoViewIfNeeded();
      await clickTarget.click({ timeout: 30000 });
      clicked = true;
      break;
    } catch (err) {
      if (attempt === 1) throw err;
      // Re-resolve in case the table rerendered or the target was missing
      await page.waitForTimeout(300);
      clickTarget = await resolveClickTarget();
    }
  }

  if (!clicked) throw new Error('Unable to click row link');

  let detailMode = false;
  try {
    // Wait for detail cards to render
    await page.waitForSelector('.label-head', { timeout: 45000 });
    await page
      .waitForFunction(
        () => {
          const darpanRow = Array.from(document.querySelectorAll('p')).find((p) =>
            p.textContent.includes('DARPAN ID')
          );
          if (!darpanRow) return false;
          const text = darpanRow.textContent.replace(/DARPAN ID/i, '').replace(/\s+/g, ' ').trim();
          return text && text !== '--';
        },
        { timeout: 20000 }
      )
      .catch(() => {});
    detailMode = true;

    const extractedDetails = await page.evaluate(async () => {
      const clean = (text) => text?.replace(/\s+/g, ' ').trim() || null;
      const result = {};

      const cards = Array.from(document.querySelectorAll('p-card'));

      // Click email view button early to reveal email text
      const contactCard = cards.find(
        (c) => c.querySelector('.p-card-title')?.textContent?.trim() === 'Contact Details'
      );
      if (contactCard) {
        const viewEmailButton = Array.from(contactCard.querySelectorAll('a')).find(
          (a) => a.textContent.trim() === 'View NPO Email'
        );
        if (viewEmailButton) {
          viewEmailButton.click();
          await new Promise((r) => setTimeout(r, 1200));
        }
      }

      cards.forEach((card) => {
        const headerElement = card.querySelector('.p-card-title');
        const header = headerElement?.textContent?.trim();
        const content = card.querySelector('.p-card-content');
        if (!header || !content) return;

        const sectionData = {};
        if (header === 'Office Bearers') {
          const table = content.querySelector('table');
          const rows = table ? Array.from(table.querySelectorAll('tr')) : [];
          sectionData.officeBearers = rows
            .map((tr) => {
              // Skip header rows containing <th>
              if (tr.querySelectorAll('th').length) return null;
              const cols = Array.from(tr.querySelectorAll('td'));
              if (cols.length >= 2) {
                return {
                  name: clean(cols[0].textContent),
                  designation: clean(cols[1].textContent),
                };
              }
              return null;
            })
            .filter(Boolean);
        } else if (header === 'Working Sectors') {
          const items = Array.from(content.querySelectorAll('.col-12 p'));
          items.forEach((p) => {
            const labelSpan = p.querySelector('span.label-head');
            if (!labelSpan) return;
            const label = labelSpan.textContent?.replace(/\s+/g, ' ').trim();

            const anchors = Array.from(p.querySelectorAll('a')).map((a) => a.href).filter(Boolean);
            const textWithoutLabel = (p.textContent || '').replace(labelSpan.textContent || '', '');
            let value = clean(textWithoutLabel);
            if (anchors.length) {
              value = anchors[0];
            }

            if (label?.includes('Primary Sectors')) {
              sectionData.primarySectors = value
                ?.split(',')
                .map((s) => s.trim())
                .filter(Boolean);
            } else if (label?.includes('Secondary Sectors')) {
              sectionData.secondarySectors = value
                ?.split(',')
                .map((s) => s.trim())
                .filter(Boolean);
            } else if (label?.includes('Operational Area - States')) {
              sectionData.operationalStates = value;
            } else if (label?.includes('Operational Area - District')) {
              sectionData.operationalDistrict = value;
            }
          });
        } else {
          const items = Array.from(content.querySelectorAll('p'));
          items.forEach((p) => {
            const labelSpan = p.querySelector('span.label-head');
            if (!labelSpan) return;
            const label = labelSpan.textContent?.replace(/\s+/g, ' ').trim();

            // Value is all text except the label
            let value = (p.textContent || '').replace(labelSpan.textContent || '', '');
            value = clean(value);

            const link = p.querySelector('a');
            if (link && link.href && !link.href.includes('javascript:void')) {
              value = link.href;
            }

            if (label) {
              sectionData[label] = value;
            }
          });
        }

        result[header] = sectionData;
      });

      return result;
    });

    // Normalize fields
    let email = extractedDetails['Contact Details']?.['NPO Contact Email'] || null;
    if (email) email = normalizeEmail(email);

    let mobile = extractedDetails['Contact Details']?.['NPO Contact Mobile No.'] || null;
    let website = extractedDetails['Contact Details']?.['Website Url'] || null;
    let dateOfRegistration = extractDate(extractedDetails['Registration Details']?.['Date of Registration (Society / Trust / Entity)']);

    const fallback = await fetchDateAndEmailFallback(page);
    if (!email || email === '--') email = fallback.email || email;
    if (!dateOfRegistration || dateOfRegistration === '--') {
      dateOfRegistration = fallback.dateOfRegistration || dateOfRegistration;
    }

    return {
      darpanId: extractedDetails['NPO Details']?.['DARPAN ID'] || null,
      darpanRegistrationDate: extractedDetails['NPO Details']?.['DARPAN Registration Date'] || null,
      registeredWith: extractedDetails['Registration Details']?.['Registered With'] || null,
      typeOfNPO: extractedDetails['Registration Details']?.['Type of NPO'] || null,
      registrationNo: extractedDetails['Registration Details']?.['Registration No'] || null,
      actName: extractedDetails['Registration Details']?.['Act name'] || null,
      cityOfRegistration: extractedDetails['Registration Details']?.['City of Registration'] || null,
      stateOfRegistration: extractedDetails['Registration Details']?.['State of Registration'] || null,
      dateOfRegistration: dateOfRegistration,
      address: extractedDetails['Contact Details']?.['Address'] || null,
      email: email,
      mobile: mobile,
      website: website,
      officeBearers: extractedDetails['Office Bearers']?.officeBearers || [],
      primarySectors: extractedDetails['Working Sectors']?.primarySectors || [],
      secondarySectors: extractedDetails['Working Sectors']?.secondarySectors || [],
      operationalStates: extractedDetails['Working Sectors']?.operationalStates || null,
      operationalDistrict: extractedDetails['Working Sectors']?.operationalDistrict || null,
      _rawScrapedDetails: extractedDetails 
    };

  } finally {
    if (detailMode) {
      await clickBackToTable(page);
    }
  }
}

// --- Writer ---

function createRecordWriter(meta) {
  const stream = fs.createWriteStream(meta.path);
  let isFirst = true;
  const capturedAt = new Date().toISOString();

  stream.write('{\n');
  stream.write(`  "capturedAt": ${JSON.stringify(capturedAt)},
`);
  stream.write(`  "selections": ${JSON.stringify(meta.selections, null, 2).replace(/\n/g, '\n  ')},
`);
  stream.write(`  "tableHeaders": ${JSON.stringify(meta.headers || [], null, 2).replace(/\n/g, '\n  ')},
`);
  stream.write('  "records": [');

  return {
    write(record) {
      // Pretty print each record with indentation relative to the array
      const payload = JSON.stringify(record, null, 2).replace(/\n/g, '\n    ');
      stream.write(isFirst ? `\n    ${payload}` : `,\n    ${payload}`);
      isFirst = false;
    },
    finalize(stats) {
      stream.write('\n  ],\n');
      stream.write(`  "stats": ${JSON.stringify(stats, null, 2).replace(/\n/g, '\n  ')}\n`);
      stream.write('}\n');
      stream.end();
    },
  };
}

// --- Main Flow ---

async function runCollector() {
  await ensureOutputDir();
  const startTime = Date.now();
  console.log(`Starting collection (Limit: ${MAX_RECORDS})...`);

  const browser = await chromium.launch({ headless: HEADLESS });
  const page = await browser.newPage();
  let writer = null;
  let processedRecords = 0;

  try {
    console.log('Navigating...');
    await page.goto('https://ngodarpan.gov.in/#/search-ngo', { waitUntil: 'networkidle', timeout: 60000 });

    console.log('Applying filters...');
    await selectDropdownOption(page, 'selectedState', SELECTIONS.selectedState);
    await selectDropdownOption(page, 'selectedDistrict', SELECTIONS.selectedDistrict);
    await selectMultiOptions(page, 'selectedSectors', SELECTIONS.selectedSectors);
    await selectMultiOptions(page, 'selectedNgoTypes', SELECTIONS.selectedNgoTypes);

  console.log('Solving captcha...');
  const captchaImageBase64 = await captureCaptcha(page);
  const captchaText = await decodeCaptchaText(captchaImageBase64);
  console.log(`Captcha: ${captchaText}`);
  await page.fill('#captchaInput', captchaText);

  await (await page.locator('#commonScrollTo button', { hasText: 'Search' })).click();
  console.log('Search submitted. Waiting for table...');

  await page.waitForSelector('table tbody tr', { timeout: 60000 });
  let tableData = await extractTable(page);
  
  writer = createRecordWriter({
    path: DETAIL_OUTPUT_PATH,
    selections: SELECTIONS,
    headers: tableData.headers,
  });

    // Process rows across pages
    while (processedRecords < MAX_RECORDS && tableData.rows.length > 0) {
      for (let i = 0; i < tableData.rows.length && processedRecords < MAX_RECORDS; i++) {
        console.log(`Processing record ${processedRecords + 1}/${MAX_RECORDS}...`);
        const summary = normalizeRow(tableData.rows[i]);
        const detail = await gatherDetailForRow(page, i);

        writer.write(buildOutputRecord(processedRecords + 1, summary, detail));
        processedRecords++;
      }

      if (processedRecords >= MAX_RECORDS) break;

      const moved = await goToNextPage(page);
      if (!moved) break;
      tableData = await extractTable(page);
    }

    const durationMs = Date.now() - startTime;
    writer.finalize({ durationMs, status: 'completed', processedRecords });
    console.log(`Done! Saved to ${DETAIL_OUTPUT_PATH}`);
    console.log(`Total Time: ${(durationMs/1000).toFixed(2)}s`);

  } catch (err) {
    console.error("Fatal Error:", err);
    if (writer) writer.finalize({ status: 'error', error: err.message });
  } finally {
    await browser.close();
    process.exit(0);
  }
}

runCollector();
