import axios from "axios";
import { parse, isValid } from "date-fns";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prisma, { Prisma } from "@repo/db";

// --- Configuration & Constants ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_DATA_PATH =
  process.env.NGO_SEED_FILE ||
  path.resolve(__dirname, "../outputs/optimized-detail-records.json");

const BATCH_SIZE = Number.parseInt(process.env.BATCH_SIZE || "2000", 10); // increased batch size to cover all records
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

// --- Types ---

type RawRecord = {
  index?: number;
  serialNumber?: string;
  name?: string;
  address?: string;
  registration?: {
    number?: string;
    registeredWith?: string;
    type?: string;
    actName?: string;
    city?: string;
    state?: string;
    date?: string;
    darpanId?: string;
    darpanRegistrationDate?: string;
    raw?: string;
  };
  contact?: {
    email?: string;
    mobile?: string;
    website?: string;
    phone?: string;
  };
  primarySectors?: string[];
  secondarySectors?: string[];
  operationalStates?: string;
  operationalDistrict?: string;
  officeBearers?: unknown;
};

type GeocodingStatus = "PENDING" | "SUCCESS" | "FAILED" | "APPROXIMATE";

// --- Helpers ---

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function parseDate(value?: string | null): Date | null {
  if (!value) return null;
  const normalized = value.replace(/\//g, "-");
  const parsed = parse(normalized, "dd-MM-yyyy", new Date());
  return isValid(parsed) ? parsed : null;
}

function extractPincode(text?: string | null): string | null {
  if (!text) return null;
  const match = text.match(/\b(5|6)\d{5}\b/);
  return match ? match[0] : null;
}

function normalizeArray(values?: string[] | null): string[] {
  return Array.isArray(values) ? values.filter(Boolean) : [];
}

function cleanAddress(raw?: string | null): string {
  if (!raw) return "";
  return raw.replace(/IN [A-Z0-9]+/, "").replace(/\s+/g, " ").trim();
}

async function loadRecordsFromFile(filePath: string): Promise<RawRecord[]> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(content);
    return parsed?.records ?? [];
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
}

function toNgoCreatePayload(record: RawRecord) {
  const reg = record.registration || {};
  const contact = record.contact || {};
  const pincode = extractPincode(record.address);

  const baseFields = {
    name: record.name || reg.actName || "Unknown NGO",
    normalizedName: record.name?.toLowerCase() || null,
    serialNumber: record.serialNumber || null,
    registrationNumber: reg.number || null,
    registrationRaw: reg.raw || null,
    email: contact.email || null,
    phone: contact.phone || null,
    mobile: contact.mobile || null,
    website: contact.website || null,
    summaryAddress: record.address || null,
    address: record.address || null,
    district: reg.city || null,
    state: reg.state || null,
    pincode,
    darpanRegistrationDate: parseDate(reg.darpanRegistrationDate),
    registeredWith: reg.registeredWith || null,
    typeOfNPO: reg.type || null,
    actName: reg.actName || null,
    cityOfRegistration: reg.city || null,
    stateOfRegistration: reg.state || null,
    dateOfRegistration: parseDate(reg.date),
    registrationDate: parseDate(reg.date),
    summarySectors: normalizeArray(record.primarySectors),
    primarySectors: normalizeArray(record.primarySectors),
    secondarySectors: normalizeArray(record.secondarySectors),
    operationalStates: record.operationalStates || null,
    operationalDistrict: record.operationalDistrict || null,
    officeBearers: record.officeBearers || null,
    raw: record as unknown as Prisma.JsonObject,
    rawScrapedDetails: null,
  };

  return {
    create: {
      ...baseFields,
      darpanId: reg.darpanId || undefined,
      geocodingStatus: "PENDING" as GeocodingStatus,
      geocodedPincode: null,
      latitude: null,
      longitude: null,
      sourceUrl: null,
      scrapedAt: null,
      hash: null,
    },
    update: {
      ...baseFields,
      pincode,
    },
    darpanId: reg.darpanId,
  };
}

async function seedFromFile(filePath: string) {
  console.log(`\n🚀 Starting Seed Process...`);
  const records = await loadRecordsFromFile(filePath);
  
  if (records.length === 0) {
    console.warn("No records found in file. Exiting seed process.");
    return;
  }

  console.log(`Found ${records.length} records. Processing...`);

  let created = 0;
  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const payload = toNgoCreatePayload(record);

    if (!payload.darpanId) {
      skipped += 1;
      continue;
    }

    try {
      const result = await prisma.ngo.upsert({
        where: { darpanId: payload.darpanId },
        create: payload.create,
        update: payload.update,
      });

      if (result.createdAt.getTime() === result.updatedAt.getTime()) {
        created += 1;
      } else {
        updated += 1;
      }
    } catch (e) {
      console.error(`Error upserting ${payload.darpanId}:`, e);
      errors += 1;
    }

    // Simple progress log every 100 records
    if ((i + 1) % 100 === 0) {
      console.log(`Processed ${i + 1}/${records.length} records...`);
    }
  }

  console.log(`\n✅ Seed Complete:`);
  console.log(`   - Created: ${created}`);
  console.log(`   - Updated: ${updated}`);
  console.log(`   - Skipped (No ID): ${skipped}`);
  console.log(`   - Errors: ${errors}`);
}

async function getCoordinates(query: string) {
  try {
    const { data } = await axios.get(NOMINATIM_URL, {
      params: { q: query, format: "json", limit: 1, countrycodes: "in" },
      headers: { "User-Agent": "PurplePages-Indexer/1.0" },
    });
    if (Array.isArray(data) && data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    }
    return null;
  } catch (error) {
    // console.error("Geocoding API error:", error); 
    return null;
  }
}

async function processPendingGeocodes() {
  console.log(`\n📍 Starting Geocoding Process...`);
  
  // Only process a limited batch to avoid timeouts/limits in one go
  const pendingCount = await prisma.ngo.count({
    where: { geocodingStatus: { in: ["PENDING", "FAILED"] } },
  });

  if (pendingCount === 0) {
    console.log("No pending geocodes found.");
    return;
  }

  console.log(`Total pending geocodes: ${pendingCount}`);
  console.log(`Processing batch of ${BATCH_SIZE}...`);

  const pending = await prisma.ngo.findMany({
    where: {
      geocodingStatus: { in: ["PENDING", "FAILED"] },
    },
    select: {
      id: true,
      address: true,
      cityOfRegistration: true,
      stateOfRegistration: true,
      pincode: true,
    },
    take: BATCH_SIZE,
  });

  let success = 0;
  let failed = 0;
  let approximate = 0;

  for (const ngo of pending) {
    let lat: string | null = null;
    let lon: string | null = null;
    let status: GeocodingStatus = "FAILED";
    let usedPincode: string | null = null;

    const cleanedAddress = cleanAddress(ngo.address);
    const pinMatch = ngo.pincode || extractPincode(cleanedAddress);

    // Strategy 1: Pincode (Most reliable for broad area)
    if (pinMatch) {
      usedPincode = pinMatch;
      const coords = await getCoordinates(`${pinMatch}, India`);
      if (coords) {
        lat = coords.lat;
        lon = coords.lon;
        status = "SUCCESS"; // Mapping to SUCCESS for now, but semantically might be APPROXIMATE
      }
    }

    // Strategy 2: City/State Fallback
    if (!lat && (ngo.cityOfRegistration || ngo.stateOfRegistration)) {
      const coords = await getCoordinates(
        `${ngo.cityOfRegistration || ""}, ${ngo.stateOfRegistration || ""}, India`
      );
      if (coords) {
        lat = coords.lat;
        lon = coords.lon;
        status = "APPROXIMATE";
      }
    }

    // Strategy 3: Full Address (Least reliable due to unstructured text)
    if (!lat && cleanedAddress) {
      const coords = await getCoordinates(`${cleanedAddress}, India`);
      if (coords) {
        lat = coords.lat;
        lon = coords.lon;
        status = "SUCCESS";
      }
    }

    await prisma.ngo.update({
      where: { id: ngo.id },
      data: {
        latitude: lat ? new Prisma.Decimal(lat) : null,
        longitude: lon ? new Prisma.Decimal(lon) : null,
        geocodingStatus: status,
        geocodedPincode: usedPincode,
      },
    });

    if (status === 'SUCCESS') success++;
    else if (status === 'APPROXIMATE') approximate++;
    else failed++;

    const currentIndex = success + failed + approximate;
    const symbol = status === 'SUCCESS' ? '✅' : status === 'APPROXIMATE' ? '⚠️' : '❌';
    console.log(`[${currentIndex}/${pending.length}] ${symbol} ${ngo.id} - ${status}`);

    await sleep(1100); // Respect Nominatim Rate Limit (1 req/sec)
  }

  console.log(`\n\n📍 Batch Complete:`);
  console.log(`   - Resolved (Precise): ${success}`);
  console.log(`   - Resolved (Approx): ${approximate}`);
  console.log(`   - Failed: ${failed}`);
}

async function main() {
  console.log(`Using dataset: ${DEFAULT_DATA_PATH}`);

  // Step 1: Ingest Data
  await seedFromFile(DEFAULT_DATA_PATH);

  // Step 2: Geocode
  await processPendingGeocodes();
}

main()
  .catch((error) => {
    console.error("Fatal Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });