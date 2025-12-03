import { promises as fs } from "fs";
import path from "path";
import { columns } from "./columns"; // Import columns from the new file
import { DataTable } from "@repo/ui/components/data-table";

type RawNgoRecord = {
  index: number;
  serialNumber: string;
  name: string;
  address: string;
  registration: {
    number: string;
    registeredWith: string;
    type: string;
    actName: string;
    city: string;
    state: string;
    date: string;
    darpanId: string;
    darpanRegistrationDate: string;
  };
  contact: {
    email: string;
    mobile: string;
    website: string | null;
  };
  primarySectors: string[];
  secondarySectors: string[];
  operationalStates: string;
  operationalDistrict: string;
  officeBearers: Array<{ name: string; designation: string }>;
};

export type Ngo = {
  id: string; // Using serialNumber as a unique ID for the table
  serialNumber: string;
  name: string;
  address: string;
  registrationType: string;
  darpanId: string;
  contactEmail: string;
  contactWebsite: string | null;
  primarySectors: string[];
  operationalDistrict: string;
};

async function getRecords(): Promise<Ngo[]> {
  // Correct the file path to point to the monorepo root's outputs directory
  const filePath = path.join(process.cwd(), "..", "..", "outputs", "optimized-detail-records.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data: { records: RawNgoRecord[] } = JSON.parse(fileContents);

  return data.records.map((record) => ({
    id: record.serialNumber, // Use serialNumber as a unique ID
    serialNumber: record.serialNumber,
    name: record.name,
    address: record.address,
    registrationType: record.registration.type,
    darpanId: record.registration.darpanId,
    contactEmail: record.contact.email,
    contactWebsite: record.contact.website,
    primarySectors: record.primarySectors,
    operationalDistrict: record.operationalDistrict,
  }));
}

export default async function NgoDashboardPage() {
  const data = await getRecords();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-playfair text-foreground mb-6">NGO Dashboard</h1>
      <DataTable
        columns={columns}
        data={data}
        filterColumnId="name"
        filterPlaceholder="Filter NGO names..."
      />
    </div>
  );
}