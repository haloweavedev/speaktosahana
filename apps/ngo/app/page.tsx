import { promises as fs } from "fs";
import path from "path";
import { Badge, Button, DataTable } from "@repo/ui";
import { CircleDot, Filter, Gauge, MapPin, Orbit, Sparkles } from "lucide-react";
import { columns } from "./columns";

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

type OptimizedRecordFile = {
  capturedAt?: string;
  records: RawNgoRecord[];
};

export type Ngo = {
  id: string;
  serialNumber: string;
  name: string;
  address: string;
  registrationType: string;
  darpanId: string;
  contactEmail: string;
  contactWebsite: string | null;
  primarySectors: string[];
  operationalDistrict: string;
  registrationCity?: string | null;
  registrationState?: string | null;
};

type DashboardInsights = {
  topSectors: Array<{ name: string; count: number }>;
  districtCoverage: number;
  websiteRatio: number;
  avgSectorsPerNgo: number;
};

function formatNumber(value: number) {
  return value.toLocaleString("en-IN");
}

function buildInsights(records: Ngo[]): DashboardInsights {
  const sectorCounts = new Map<string, number>();
  const districts = new Set<string>();
  let websiteCount = 0;

  for (const ngo of records) {
    if (ngo.contactWebsite) websiteCount += 1;
    ngo.primarySectors.forEach((sector) => {
      const key = sector.trim();
      if (!key) return;
      sectorCounts.set(key, (sectorCounts.get(key) || 0) + 1);
    });

    const districtList = ngo.operationalDistrict?.split(/[,;|]/) ?? [];
    districtList.forEach((district) => {
      const clean = district.trim();
      if (clean && clean.toLowerCase() !== "all") {
        districts.add(clean);
      }
    });
  }

  const topSectors = Array.from(sectorCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));

  const totalSectorMentions = Array.from(sectorCounts.values()).reduce((sum, count) => sum + count, 0);
  const avgSectorsPerNgo = records.length ? Number((totalSectorMentions / records.length).toFixed(1)) : 0;

  return {
    topSectors,
    districtCoverage: Math.max(districts.size, 1),
    websiteRatio: records.length ? websiteCount / records.length : 0,
    avgSectorsPerNgo,
  };
}

async function getRecords(): Promise<{ capturedAt?: string; records: Ngo[] }> {
  const filePath = path.join(process.cwd(), "..", "..", "outputs", "optimized-detail-records.json");
  const fileContents = await fs.readFile(filePath, "utf8");
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
    primarySectors: record.primarySectors,
    operationalDistrict: record.operationalDistrict,
    registrationCity: record.registration.city,
    registrationState: record.registration.state,
  }));

  return { capturedAt: data.capturedAt, records };
}

export default async function NgoDashboardPage() {
  const { capturedAt, records } = await getRecords();
  const insights = buildInsights(records);
  const snapshotDate = capturedAt ? new Date(capturedAt) : null;
  const snapshotLabel =
    snapshotDate && !Number.isNaN(snapshotDate.getTime())
      ? snapshotDate.toLocaleDateString("en-IN")
      : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0b061a] via-[#0b0830] to-[#040211] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(126,87,255,0.18),transparent_35%),radial-gradient(circle_at_80%_0,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(236,72,153,0.12),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-white/8 via-white/0 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full border border-white/15 bg-white/10 px-6 py-3 shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur">
            <span className="font-display font-light text-2xl tracking-tight text-white">purplePages</span>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-violet-100/80">NGO directory</p>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
              Find NGOs that match your cause
            </h1>
            <p className="max-w-3xl text-base text-violet-100/85">
              Filter by name, sector, or district. Each record shows registration type, contact trail, and focus areas so
              you can shortlist fast.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-violet-100/80">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-inner">
              <Sparkles className="h-4 w-4 text-amber-300" />
              {snapshotLabel ? `Snapshot: ${snapshotLabel}` : "Snapshot: optimized-detail-records.json"}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-inner">
              <CircleDot className="h-4 w-4 text-cyan-300" />
              {formatNumber(insights.districtCoverage)} districts represented
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-inner">
              <MapPin className="h-4 w-4 text-rose-300" />
              Search by name below
            </div>
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.8fr,1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-violet-100/70">Dataset overview</p>
                  <h2 className="font-display text-2xl text-white sm:text-3xl">Snapshot of this dataset</h2>
                  <p className="text-sm text-violet-100/80">Counts refresh whenever optimized-detail-records.json updates.</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-primary/30 via-white/5 to-secondary/30 px-4 py-2 text-sm text-white shadow-lg">
                  <Orbit className="h-4 w-4" />
                  Geographic view coming soon
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
                  <div className="flex items-center justify-between text-violet-100/70">
                    <span className="text-xs uppercase tracking-[0.2em]">Indexed NGOs</span>
                    <Sparkles className="h-4 w-4 text-amber-300" />
                  </div>
                  <p className="mt-3 font-display text-3xl text-white">{formatNumber(records.length)}</p>
                  <p className="text-sm text-violet-100/75">Cleaned from optimized-detail-records.json</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
                  <div className="flex items-center justify-between text-violet-100/70">
                    <span className="text-xs uppercase tracking-[0.2em]">Districts</span>
                    <MapPin className="h-4 w-4 text-rose-300" />
                  </div>
                  <p className="mt-3 font-display text-3xl text-white">{formatNumber(insights.districtCoverage)}</p>
                  <p className="text-sm text-violet-100/75">Operational districts mentioned</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
                  <div className="flex items-center justify-between text-violet-100/70">
                    <span className="text-xs uppercase tracking-[0.2em]">Sector depth</span>
                    <Gauge className="h-4 w-4 text-cyan-300" />
                  </div>
                  <p className="mt-3 font-display text-3xl text-white">{insights.avgSectorsPerNgo} / org</p>
                  <p className="text-sm text-violet-100/75">Primary sector signals per NGO</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
                <span className="text-xs uppercase tracking-[0.25em] text-violet-100/70">Top sectors</span>
                {insights.topSectors.map((sector) => (
                  <Badge
                    key={sector.name}
                    variant="secondary"
                    className="bg-white/8 text-foreground/90 ring-1 ring-white/10"
                  >
                    {sector.name} · {sector.count}
                  </Badge>
                ))}
                <Badge variant="secondary" className="bg-primary/20 text-primary-foreground ring-1 ring-primary/40">
                  {Math.round(insights.websiteRatio * 100)}% list a website
                </Badge>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-primary/10 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-violet-100/80">Sector spotlight</p>
                  <h3 className="font-display text-xl text-white">Popular sectors</h3>
                </div>
                <Filter className="h-5 w-5 text-violet-100/80" />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {insights.topSectors.map((sector) => (
                  <div
                    key={sector.name}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-violet-100/90 shadow-inner"
                  >
                    <span className="font-semibold text-white">{sector.name}</span>
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-[12px] text-violet-50">
                      {sector.count} orgs
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-violet-100/80">How to use</p>
              <h3 className="font-display text-xl text-white">Quick shortlist</h3>
              <p className="mt-2 text-sm text-violet-100/80">
                Use the search box to filter by NGO name. Open “Columns” to hide what you don&apos;t need. Sector pills hint
                at where most work is happening.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="bg-white/10 text-foreground/90 ring-1 ring-white/10">Search by name</Badge>
                <Badge className="bg-white/10 text-foreground/90 ring-1 ring-white/10">Toggle columns</Badge>
                <Badge className="bg-white/10 text-foreground/90 ring-1 ring-white/10">Sector chips</Badge>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 space-y-4">
          <div className="flex flex-col items-start gap-3 rounded-[30px] border border-white/12 bg-white/10 px-6 py-5 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-violet-100/70">Live registry</p>
              <h2 className="font-display text-2xl text-white sm:text-3xl">All NGOs in this snapshot</h2>
              <p className="text-sm text-violet-100/80">Search by name, scan sector chips, and open websites directly.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary-foreground ring-1 ring-primary/30">
                Includes Darpan IDs where present
              </Badge>
              <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                Export CSV (coming soon)
              </Button>
            </div>
          </div>
          <div className="rounded-[30px] border border-white/12 bg-card/70 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur sm:p-6">
            <DataTable
              columns={columns}
              data={records}
              filterColumnId="name"
              filterPlaceholder="Filter NGO names..."
              className="rounded-2xl border border-white/5 bg-card/60 p-4 shadow-inner"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
