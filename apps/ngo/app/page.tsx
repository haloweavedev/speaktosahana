import { MapExplore } from "@/components/map-explore";
import { type MapNgo } from "@/components/map-view";
import { loadLocalRecordSamples } from "@/lib/local-records";
import { Button } from "@repo/ui";
import prisma from "@repo/db";

export const dynamic = "force-dynamic";

const MAP_LIMIT = Number.parseInt(process.env.NGO_MAP_LIMIT || "200", 10);
const DEFAULT_RADIUS_KM = Number.parseFloat(process.env.NGO_DEFAULT_RADIUS || "7");
const FOCUS_POINT = { lat: 12.9716, lng: 77.5946 }; // Bengaluru core for the demo

async function getMapData(): Promise<{
  items: MapNgo[];
  stats: {
    total: number;
    pending: number;
    failed: number;
    approximate: number;
    success: number;
  };
}> {
  const [rows, total, pending, failed, approximate, success] = await Promise.all([
    prisma.ngo.findMany({
      where: { latitude: { not: null }, longitude: { not: null } },
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        geocodingStatus: true,
        primarySectors: true,
        cityOfRegistration: true,
        stateOfRegistration: true,
      },
      orderBy: { updatedAt: "desc" },
      take: MAP_LIMIT,
    }),
    prisma.ngo.count(),
    prisma.ngo.count({ where: { geocodingStatus: "PENDING" } }),
    prisma.ngo.count({ where: { geocodingStatus: "FAILED" } }),
    prisma.ngo.count({ where: { geocodingStatus: "APPROXIMATE" } }),
    prisma.ngo.count({ where: { geocodingStatus: "SUCCESS" } }),
  ]);

  const items: MapNgo[] = rows
    .filter((ngo) => ngo.latitude !== null && ngo.longitude !== null)
    .map((ngo) => ({
      id: ngo.id,
      name: ngo.name,
      latitude: Number(ngo.latitude),
      longitude: Number(ngo.longitude),
      geocodingStatus: ngo.geocodingStatus,
      primarySectors: ngo.primarySectors,
      city: ngo.cityOfRegistration,
      state: ngo.stateOfRegistration,
    }));

  return {
    items,
    stats: { total, pending, failed, approximate, success },
  };
}

export default async function Page() {
  const [mapData, localData] = await Promise.all([getMapData(), loadLocalRecordSamples(10)]);
  const geocodedCount = mapData.items.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1b0b3d] via-[#0f0828] to-[#09051c] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col items-center gap-6 text-center">
          <div className="text-4xl font-[700] text-white tracking-wide font-serif">
            purplePages
          </div>
          <div className="flex flex-col gap-3 text-sm text-violet-100/85 max-w-3xl">
            <p>🧩 For Donors: Identify NGOs by the intersections that matter (e.g., Disability × Livelihood).</p>
            <p>🤝 For NGOs: Find peers and partners to strengthen programs (e.g., Education → Inclusive Education expert).</p>
            <p>📍 For Volunteers: Discover organizations close to your home and heart (pincode-based search).</p>
            <p>♿ For Persons with Disabilities: Locate services and support systems that are truly accessible.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button className="bg-white/15 text-white hover:bg-white/25">Explore the map</Button>
            <Button variant="secondary" className="border border-white/25 bg-white/10 text-white hover:bg-white/20">
              Filter by distance or sector
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Map-ready NGOs"
            value={geocodedCount}
            helper={`Pulled from Postgres (limit ${MAP_LIMIT})`}
          />
          <StatCard
            label="Approx / Success"
            value={`${mapData.stats.approximate} / ${mapData.stats.success}`}
            helper="City-centroid vs. exact geocodes"
          />
          <StatCard
            label="File queue"
            value={localData.total}
            helper="records in optimized-detail-records.json"
          />
        </section>

        <MapExplore
          data={mapData.items}
          defaultRadiusKm={DEFAULT_RADIUS_KM}
          defaultCenter={{ latitude: FOCUS_POINT.lat, longitude: FOCUS_POINT.lng }}
        />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">NGO snapshots</p>
                <h3 className="text-lg font-semibold text-white/90">
                  A few examples from the current dataset
                </h3>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-violet-100/90">
                {localData.total} total
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {localData.records.map((record) => (
                <article
                  key={record.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{record.name}</p>
                      <p className="text-sm text-violet-100/80">{record.address}</p>
                      <p className="text-xs text-violet-200/70">
                        {record.city || "—"}
                        {record.state ? `, ${record.state}` : ""} · Pincode {record.pincode || "—"}
                      </p>
                    </div>
                    <div className="text-right text-[11px] uppercase tracking-wide text-violet-200/80">
                      {record.primarySectors.slice(0, 2).join(" · ") || "No sector"}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Why purplePages</p>
            <h3 className="mt-2 text-lg font-semibold text-white/90">Built for real decisions</h3>
            <ul className="mt-2 space-y-2 text-sm text-violet-100/85">
              <li>• See who is closest to a neighborhood or pin code.</li>
              <li>• Filter by sector intersections that matter to you.</li>
              <li>• Find partners who share or complement your focus areas.</li>
              <li>• Spot accessible services for persons with disabilities.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value, helper }: { label: string; value: number | string; helper: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur">
      <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <p className="text-sm text-violet-100/80">{helper}</p>
    </div>
  );
}
