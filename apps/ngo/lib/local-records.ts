import fs from "node:fs/promises";
import path from "node:path";

export type LocalNgoRecord = {
  id: string;
  name: string;
  address: string;
  pincode: string | null;
  city: string | null;
  state: string | null;
  primarySectors: string[];
  registrationNo: string | null;
};

type RawRecord = {
  summary?: {
    serialNumber?: string;
    name?: string;
    address?: string;
    sectors?: string[];
    registration?: { raw?: string };
  };
  detail?: {
    darpanId?: string;
    actName?: string;
    registrationNo?: string;
    cityOfRegistration?: string;
    stateOfRegistration?: string;
    primarySectors?: string[];
    secondarySectors?: string[];
    address?: string;
  };
};

const candidatePaths = [
  path.resolve(process.cwd(), "outputs/optimized-detail-records.json"),
  path.resolve(process.cwd(), "../outputs/optimized-detail-records.json"),
  path.resolve(process.cwd(), "../../outputs/optimized-detail-records.json"),
];

function extractPincode(text?: string | null): string | null {
  if (!text) return null;
  const match = text.match(/\b(5|6)\d{5}\b/);
  return match ? match[0] : null;
}

export async function loadLocalRecordSamples(limit = 24): Promise<{
  total: number;
  records: LocalNgoRecord[];
}> {
  let filePath: string | null = null;

  for (const candidate of candidatePaths) {
    try {
      await fs.access(candidate);
      filePath = candidate;
      break;
    } catch {
      // Try next candidate path
    }
  }

  if (!filePath) {
    throw new Error("Unable to locate outputs/optimized-detail-records.json");
  }

  const file = await fs.readFile(filePath, "utf-8");
  const parsed = JSON.parse(file);
  const entries = parsed?.records ?? [];

  const records: LocalNgoRecord[] = (entries as RawRecord[]).slice(0, limit).map((entry, index) => {
    const summary = entry.summary || {};
    const detail = entry.detail || {};
    const address = summary.address || detail.address || "—";

    return {
      id: detail.darpanId || summary.serialNumber || String(index),
      name: summary.name || detail.actName || "Unknown NGO",
      address,
      pincode: extractPincode(address),
      city: detail.cityOfRegistration || null,
      state: detail.stateOfRegistration || null,
      primarySectors: detail.primarySectors || summary.sectors || [],
      registrationNo: detail.registrationNo || summary.registration?.raw || null,
    };
  });

  return { total: entries.length, records };
}
