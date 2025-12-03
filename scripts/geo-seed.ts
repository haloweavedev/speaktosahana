import axios from "axios";
import { parse, isValid } from "date-fns";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prisma, { Prisma } from "@repo/db";

type RawRecord = {
  summary?: {
    serialNumber?: string;
    name?: string;
    address?: string;
    sectors?: string[];
    registration?: { raw?: string };
    raw?: Record<string, unknown>;
  };
  detail?: {
    darpanId?: string;
    darpanRegistrationDate?: string;
    registeredWith?: string;
    typeOfNPO?: string;
    registrationNo?: string;
    actName?: string;
    cityOfRegistration?: string;
    stateOfRegistration?: string;
    dateOfRegistration?: string;
    address?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    website?: string;
    officeBearers?: unknown;
    primarySectors?: string[];
    secondarySectors?: string[];
    operationalStates?: string;
    operationalDistrict?: string;
    _rawScrapedDetails?: Record<string, unknown>;
  };
};

type GeocodingStatus = "PENDING" | "SUCCESS" | "FAILED" | "APPROXIMATE";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_DATA_PATH =
  process.env.NGO_SEED_FILE ||
  path.resolve(__dirname, "../outputs/optimized-detail-records.json");
const BATCH_SIZE = Number.parseInt(process.env.BATCH_SIZE || "200", 10);
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

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
  const content = await fs.readFile(filePath, "utf-8");
  const parsed = JSON.parse(content);
  return parsed?.records ?? [];
}

function toNgoCreatePayload(record: RawRecord) {
  const detail = record.detail || {};
  const summary = record.summary || {};
  const pincode = extractPincode(detail.address || summary.address);

  const baseFields = {
    name: summary.name || detail.actName || "Unknown NGO",
    normalizedName: summary.name?.toLowerCase() || null,
    serialNumber: summary.serialNumber || null,
    registrationNumber: detail.registrationNo || null,
    registrationRaw: summary.registration?.raw || null,
    email: detail.email || null,
    phone: detail.phone || null,
    mobile: detail.mobile || null,
    website: detail.website || null,
    summaryAddress: summary.address || null,
    address: detail.address || summary.address || null,
    district: detail.cityOfRegistration || null,
    state: detail.stateOfRegistration || null,
    pincode,
    darpanRegistrationDate: parseDate(detail.darpanRegistrationDate),
    registeredWith: detail.registeredWith || null,
    typeOfNPO: detail.typeOfNPO || null,
    actName: detail.actName || null,
    cityOfRegistration: detail.cityOfRegistration || null,
    stateOfRegistration: detail.stateOfRegistration || null,
    dateOfRegistration: parseDate(detail.dateOfRegistration),
    registrationDate: parseDate(detail.dateOfRegistration),
    summarySectors: normalizeArray(summary.sectors),
    primarySectors: normalizeArray(detail.primarySectors || summary.sectors),
    secondarySectors: normalizeArray(detail.secondarySectors),
    operationalStates: detail.operationalStates || null,
    operationalDistrict: detail.operationalDistrict || null,
    officeBearers: detail.officeBearers || null,
    raw: summary.raw || null,
    rawScrapedDetails: detail._rawScrapedDetails || null,
  };

  return {
    create: {
      ...baseFields,
      darpanId: detail.darpanId || undefined,
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
    darpanId: detail.darpanId,
  };
}

async function seedFromFile(filePath: string) {
  const records = await loadRecordsFromFile(filePath);
  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const record of records) {
    const payload = toNgoCreatePayload(record);
    if (!payload.darpanId) {
      skipped += 1;
      continue;
    }

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
  }

  console.log(
    `Loaded ${created + updated} records from file (${created} created, ${updated} refreshed, ${skipped} skipped without darpanId).`
  );
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
    return null;
  }
}

async function processPendingGeocodes() {
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

  console.log(`📍 Processing ${pending.length} records (batch size ${BATCH_SIZE})...`);

  for (const ngo of pending) {
    let lat: string | null = null;
    let lon: string | null = null;
    let status: GeocodingStatus = "FAILED";
    let usedPincode: string | null = null;

    const cleanedAddress = cleanAddress(ngo.address);
    const pinMatch = ngo.pincode || extractPincode(cleanedAddress);

    if (pinMatch) {
      usedPincode = pinMatch;
      const coords = await getCoordinates(`${pinMatch}, India`);
      if (coords) {
        lat = coords.lat;
        lon = coords.lon;
        status = "SUCCESS";
        console.log(`✅ [${ngo.id}] Found via pincode ${pinMatch}`);
      }
    }

    if (!lat && (ngo.cityOfRegistration || ngo.stateOfRegistration)) {
      const coords = await getCoordinates(
        `${ngo.cityOfRegistration || ""}, ${ngo.stateOfRegistration || ""}, India`
      );
      if (coords) {
        lat = coords.lat;
        lon = coords.lon;
        status = "APPROXIMATE";
        console.log(`⚠️ [${ngo.id}] Fallback to city/state ${ngo.cityOfRegistration}`);
      }
    }

    if (!lat && cleanedAddress) {
      const coords = await getCoordinates(`${cleanedAddress}, India`);
      if (coords) {
        lat = coords.lat;
        lon = coords.lon;
        status = "SUCCESS";
        console.log(`✅ [${ngo.id}] Resolved via full address fallback`);
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

    await sleep(1100);
  }
}

async function main() {
  const datasetPath = DEFAULT_DATA_PATH;
  console.log(`Using dataset: ${datasetPath}`);

  await seedFromFile(datasetPath);
  await processPendingGeocodes();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
