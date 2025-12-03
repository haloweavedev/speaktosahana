import MapView, { type MapNgo } from "@/components/map-view";
import { loadLocalRecordSamples } from "@/lib/local-records";
import { Button } from "@repo/ui";
import prisma from "@repo/db";
import { getNGOsInRadius } from "./actions/get-ngos";

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

function formatDistance(meters: number) {
  if (!meters && meters !== 0) return "—";
  const km = meters / 1000;
  return km < 1 ? `${meters.toFixed(0)} m` : `${km.toFixed(1)} km`;
}

export default async function Page() {
  const [mapData, localData, nearby] = await Promise.all([
    getMapData(),
    loadLocalRecordSamples(10),
    getNGOsInRadius(FOCUS_POINT.lat, FOCUS_POINT.lng, DEFAULT_RADIUS_KM),
  ]);

  const geocodedCount = mapData.items.length;
  const topNearby = nearby.slice(0, 10);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1b0b3d] via-[#0f0828] to-[#09051c] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-200">
              Purple Pages · GIS Signal
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              33 Bengaluru NGOs on the map
            </h1>
            <p className="max-w-2xl text-sm text-violet-100/80">
              Seeded, geocoded, and rendered live. This is the working prototype of the “Radar”
              described in the vision doc: map-first, sector-aware, and PostGIS-backed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-white/10 text-white hover:bg-white/20">
                Radius search · {DEFAULT_RADIUS_KM} km around MG Road
              </Button>
              <Button variant="secondary" className="border border-white/20 bg-white/5 text-white hover:bg-white/15">
                Uses Mapbox + PostGIS
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-violet-100/90 shadow-lg">
            <p className="font-semibold">Live inputs</p>
            <p className="text-xs text-violet-100/70">
              DB: Supabase Postgres · Dataset: optimized-detail-records.json · Tokens: Mapbox + .env
            </p>
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

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Mapbox view</p>
                <h2 className="text-lg font-semibold text-white/90">Live pins from Postgres</h2>
              </div>
              <p className="text-xs text-violet-100/70">
                Token: <code className="rounded bg-white/10 px-1 py-0.5">NEXT_PUBLIC_MAPBOX_TOKEN</code>
              </p>
            </div>
            <MapView data={mapData.items} />
            {!geocodedCount ? (
              <p className="text-sm text-violet-100/80">
                No pins yet. Run <code className="rounded bg-white/10 px-1 py-0.5">pnpm geo-seed</code> after setting{" "}
                <code className="rounded bg-white/10 px-1 py-0.5">DATABASE_URL</code>.
              </p>
            ) : null}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Synergy shortlist</p>
                <h3 className="text-lg font-semibold text-white/90">
                  Within {DEFAULT_RADIUS_KM} km of MG Road
                </h3>
              </div>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-violet-100/80">
                PostGIS radius
              </span>
            </div>
            <div className="space-y-3">
              {topNearby.map((ngo) => (
                <article
                  key={ngo.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{ngo.name}</p>
                      <p className="text-xs text-violet-100/70">
                        {ngo.primary_sectors.slice(0, 2).join(" · ") || "No sector listed"}
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-violet-100/90">
                      {formatDistance(ngo.distance_meters)}
                    </span>
                  </div>
                </article>
              ))}
              {!topNearby.length ? (
                <p className="text-sm text-violet-100/80">
                  No hits in this radius yet. Seed data or widen the search.
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Incoming queue</p>
                <h3 className="text-lg font-semibold text-white/90">
                  First {localData.records.length} rows from the file
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

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Pipeline</p>
            <h3 className="mt-2 text-lg font-semibold text-white/90">How this demo is wired</h3>
            <ol className="mt-4 space-y-3 text-sm text-violet-100/80">
              <li>
                <span className="font-semibold text-white">Data</span> — 33 rows from
                <code className="mx-1 rounded bg-white/10 px-2 py-1 text-xs">outputs/optimized-detail-records.json</code>{" "}
                landed in Postgres.
              </li>
              <li>
                <span className="font-semibold text-white">Geocode</span> —{" "}
                <code className="rounded bg-white/10 px-2 py-1 text-xs">pnpm geo-seed</code> hit Nominatim (pincode → city
                fallback), tagged APPROXIMATE where needed.
              </li>
              <li>
                <span className="font-semibold text-white">Spatial</span> — PostGIS powers{" "}
                <code className="rounded bg-white/10 px-2 py-1 text-xs">getNGOsInRadius</code> for “near me” slices.
              </li>
              <li>
                <span className="font-semibold text-white">UI</span> — Mapbox + shadcn button from{" "}
                <code className="rounded bg-white/10 px-2 py-1 text-xs">@repo/ui</code>, purple command-center skin.
              </li>
            </ol>
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
