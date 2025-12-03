"use client";

import MapView, { type MapNgo } from "@/components/map-view";
import { Button } from "@repo/ui";
import { useMemo, useState } from "react";

type MapExploreProps = {
  data: MapNgo[];
  defaultRadiusKm: number;
  defaultCenter: { latitude: number; longitude: number };
};

function haversineMeters(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371e3;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const aCalc = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
  return R * c;
}

function formatDistance(meters: number) {
  if (!Number.isFinite(meters)) return "—";
  const km = meters / 1000;
  return km < 1 ? `${meters.toFixed(0)} m` : `${km.toFixed(1)} km`;
}

export function MapExplore({ data, defaultRadiusKm, defaultCenter }: MapExploreProps) {
  const [radiusKm, setRadiusKm] = useState(defaultRadiusKm);
  const [focus, setFocus] = useState<{ latitude: number; longitude: number }>(defaultCenter);
  const [selectedNgoId, setSelectedNgoId] = useState<string | null>(null);

  const selectedNgo = useMemo(
    () => data.find((ngo) => ngo.id === selectedNgoId) || null,
    [data, selectedNgoId]
  );

  const nearest = useMemo(() => {
    const center = selectedNgo
      ? { lat: selectedNgo.latitude, lng: selectedNgo.longitude }
      : { lat: focus.latitude, lng: focus.longitude };

    return data
      .map((ngo) => {
        const meters = haversineMeters(center, { lat: ngo.latitude, lng: ngo.longitude });
        return { ngo, meters };
      })
      .sort((a, b) => a.meters - b.meters)
      .filter((item) => item.ngo.id !== selectedNgoId)
      .filter((item) => item.meters <= radiusKm * 1000)
      .slice(0, 12);
  }, [data, focus.latitude, focus.longitude, radiusKm, selectedNgo, selectedNgoId]);

  const sameSector = useMemo(() => {
    if (!selectedNgo) return [];
    const sectors = new Set(selectedNgo.primarySectors.map((s) => s.toLowerCase()));
    return data
      .filter((ngo) => ngo.id !== selectedNgo.id)
      .map((ngo) => {
        const overlap = ngo.primarySectors.filter((s) => sectors.has(s.toLowerCase()));
        const meters = haversineMeters(
          { lat: selectedNgo.latitude, lng: selectedNgo.longitude },
          { lat: ngo.latitude, lng: ngo.longitude }
        );
        return { ngo, overlap, meters };
      })
      .filter((item) => item.overlap.length > 0)
      .sort((a, b) => a.meters - b.meters)
      .slice(0, 10);
  }, [data, selectedNgo]);

  const radiusOptions = [2, 5, 7, 10, 15];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Mapbox view</p>
            <h2 className="text-lg font-semibold text-white/90">
              Click the map to set an area, or click a pin to focus an NGO
            </h2>
            <p className="text-xs text-violet-100/70">
              Radius: {radiusKm} km · Focus:{" "}
              {selectedNgo
                ? selectedNgo.name
                : `${focus.latitude.toFixed(3)}, ${focus.longitude.toFixed(3)}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {radiusOptions.map((opt) => (
              <Button
                key={opt}
                size="sm"
                className={`border border-white/10 ${
                  radiusKm === opt ? "bg-white/20 text-white" : "bg-white/5 text-white/80"
                }`}
                onClick={() => setRadiusKm(opt)}
              >
                {opt} km
              </Button>
            ))}
            <Button
              size="sm"
              variant="secondary"
              className="border border-white/20 bg-white/10 text-white"
              onClick={() => setSelectedNgoId(null)}
            >
              Focus: {selectedNgo ? "NGO" : "Custom area"}
            </Button>
          </div>
        </div>
        <MapView
          data={data}
          selectedNgoId={selectedNgoId}
          focusPoint={selectedNgo ? { latitude: selectedNgo.latitude, longitude: selectedNgo.longitude } : focus}
          onSelectNgo={(ngo) => {
            setSelectedNgoId(ngo?.id ?? null);
            if (ngo) setFocus({ latitude: ngo.latitude, longitude: ngo.longitude });
          }}
          onSelectLocation={({ latitude, longitude }) => {
            setSelectedNgoId(null);
            setFocus({ latitude, longitude });
          }}
        />
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Nearest</p>
            <h3 className="text-lg font-semibold text-white/90">Within {radiusKm} km</h3>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-violet-100/80">
            {nearest.length} results
          </span>
        </div>
        <div className="space-y-3">
          {nearest.map(({ ngo, meters }) => (
            <article
              key={ngo.id}
              className="rounded-xl border border-white/10 bg-white/5 p-3 hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">{ngo.name}</p>
                  <p className="text-xs text-violet-100/70">
                    {ngo.primarySectors.slice(0, 2).join(" · ") || "No sector listed"}
                  </p>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold text-violet-100/90">
                  {formatDistance(meters)}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[11px] text-violet-200/80">
                <button
                  className="underline decoration-dotted underline-offset-2"
                  onClick={() => {
                    setSelectedNgoId(ngo.id);
                    setFocus({ latitude: ngo.latitude, longitude: ngo.longitude });
                  }}
                >
                  Focus here
                </button>
              </div>
            </article>
          ))}
          {!nearest.length ? (
            <p className="text-sm text-violet-100/80">No NGOs inside this radius yet.</p>
          ) : null}
        </div>

        <div className="border-t border-white/10 pt-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-violet-200/80">Same sectors</p>
              <h3 className="text-sm font-semibold text-white/90">
                NGOs sharing primary sectors with the focused NGO
              </h3>
            </div>
            <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-violet-100/80">
              {sameSector.length}
            </span>
          </div>
          {selectedNgo ? (
            <div className="mt-3 space-y-2">
              {sameSector.map(({ ngo, overlap, meters }) => (
                <article
                  key={ngo.id}
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-violet-100/85"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="font-semibold text-white">{ngo.name}</p>
                      <p className="text-xs text-violet-100/70">Overlap: {overlap.join(" · ")}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold text-violet-100/90">
                      {formatDistance(meters)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-violet-100/80">
              Select an NGO pin to see who shares its sectors.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
