"use client";

import Map, { Marker, NavigationControl, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo, useState } from "react";

export type MapNgo = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  primarySectors: string[];
  geocodingStatus: string;
  city?: string | null;
  state?: string | null;
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function colorForSectors(sectors: string[]) {
  const sector = sectors[0]?.toLowerCase() || "";
  if (sector.includes("education")) return "#38bdf8";
  if (sector.includes("health")) return "#22c55e";
  if (sector.includes("environment")) return "#84cc16";
  if (sector.includes("women")) return "#e11d48";
  if (sector.includes("rural")) return "#f59e0b";
  if (sector.includes("youth")) return "#a855f7";
  return "#f97316";
}

export default function MapView({ data }: { data: MapNgo[] }) {
  const [selected, setSelected] = useState<MapNgo | null>(null);

  const center = useMemo(() => {
    if (!data.length) {
      return { longitude: 77.5946, latitude: 20.5937, zoom: 4.8 };
    }
    const lon = data.reduce((sum, ngo) => sum + ngo.longitude, 0) / data.length;
    const lat = data.reduce((sum, ngo) => sum + ngo.latitude, 0) / data.length;
    const zoom = Math.max(4.5, Math.min(9.5, 9 - Math.log10(data.length + 5)));
    return { longitude: lon, latitude: lat, zoom };
  }, [data]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-[70vh] w-full flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#201040] via-[#130a2c] to-[#0a071c] p-10 text-white">
        <p className="text-xl font-semibold text-white">Add a Mapbox token to view the map</p>
        <p className="mt-2 text-sm text-violet-100/80">
          Set <code className="rounded bg-white/10 px-2 py-1">NEXT_PUBLIC_MAPBOX_TOKEN</code> in your
          environment and reload.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1b0b3d] via-[#0f0828] to-[#09051c] shadow-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(76,29,149,0.15),transparent_40%),radial-gradient(circle_at_80%_0,rgba(14,165,233,0.1),transparent_35%)]" />
      <Map
        initialViewState={center}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        projection="globe"
        scrollZoom
        dragRotate={false}
        onClick={() => setSelected(null)}
      >
        <NavigationControl position="bottom-right" />

        {data.map((ngo) => (
          <Marker
            key={ngo.id}
            longitude={ngo.longitude}
            latitude={ngo.latitude}
            color={colorForSectors(ngo.primarySectors)}
            anchor="bottom"
            onClick={(event) => {
              event.originalEvent.stopPropagation();
              setSelected(ngo);
            }}
          />
        ))}

        {selected ? (
          <Popup
            longitude={selected.longitude}
            latitude={selected.latitude}
            closeButton
            closeOnClick={false}
            onClose={() => setSelected(null)}
            anchor="top"
            className="text-slate-900"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold">{selected.name}</p>
              <p className="text-xs text-slate-500">
                {selected.city || "Unknown city"}
                {selected.state ? `, ${selected.state}` : ""}
              </p>
              <p className="text-xs text-slate-500">
                {selected.primarySectors.slice(0, 3).join(" · ") || "No sectors listed"}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-amber-600">
                {selected.geocodingStatus}
              </p>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}
