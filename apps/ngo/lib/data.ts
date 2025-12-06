import { promises as fs } from "fs";
import path from "path";
import { Ngo, RawNgoRecord } from "./types";

type OptimizedRecordFile = {
  capturedAt?: string;
  records: RawNgoRecord[];
};

export async function getRecords(): Promise<{ capturedAt?: string; records: Ngo[] }> {
  try {
    const filePath = path.join(process.cwd(), "apps", "ngo", "data", "records.json");
    // Fallback to checking if we are already in the app directory context
    const altFilePath = path.join(process.cwd(), "data", "records.json");
    
    let fileContents;
    try {
        fileContents = await fs.readFile(filePath, "utf8");
    } catch (e) {
        try {
            fileContents = await fs.readFile(altFilePath, "utf8");
        } catch (e2) {
             console.error("Failed to load records", e);
             return { records: [] };
        }
    }

    const data: OptimizedRecordFile = JSON.parse(fileContents);

    const records = data.records.map((record) => ({
      id: record.serialNumber,
      serialNumber: record.serialNumber,
      name: record.name,
      address: record.address,
      registrationType: record.registration.type || "Not specified",
      darpanId: record.registration.darpanId,
      contactEmail: record.contact.email || "—",
      contactWebsite: record.contact.website,
      contactMobile: record.contact.mobile,
      primarySectors: record.primarySectors,
      secondarySectors: record.secondarySectors,
      operationalDistrict: record.operationalDistrict,
      registrationCity: record.registration.city,
      registrationState: record.registration.state,
      officeBearers: record.officeBearers,
    }));

    return { capturedAt: data.capturedAt, records };
  } catch (error) {
    console.error("Error reading NGO records:", error);
    return { records: [] };
  }
}
