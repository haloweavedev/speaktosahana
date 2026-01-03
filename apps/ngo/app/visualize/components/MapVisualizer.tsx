'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, ZoomControl, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import type { DensityZone } from '../../actions/analytics';

interface MapVisualizerProps {
  densityZones: DensityZone[];
  maxDensity: number;
}

export default function MapVisualizer({ densityZones, maxDensity }: MapVisualizerProps) {
  const [hoveredZone, setHoveredZone] = useState<DensityZone | null>(null);

  // Center on Bengaluru
  const center: [number, number] = [12.9716, 77.5946];

  // Calculate radius using square root scaling for better visual distribution
  // Min radius: 8, Max radius: 35
  const getRadius = (count: number) => {
    const normalized = Math.sqrt(count) / Math.sqrt(maxDensity);
    return 8 + normalized * 27;
  };

  // Calculate opacity based on count (higher = more opaque)
  const getOpacity = (count: number) => {
    const normalized = count / maxDensity;
    return 0.3 + normalized * 0.5; // Range: 0.3 to 0.8
  };

  // Total NGOs across all zones
  const totalNGOs = densityZones.reduce((sum, z) => sum + z.count, 0);

  return (
    <Card className="h-[350px] md:h-[600px] flex flex-col overflow-hidden border-0 bg-white shadow-none relative">
      <CardHeader className="pt-4 md:pt-6 pb-2 md:pb-4">
        <CardTitle className="text-base md:text-lg font-display text-slate-900">Service Coverage Map</CardTitle>
        <p className="text-xs md:text-sm text-slate-500">
          {densityZones.length} neighborhoods with disability services
        </p>
      </CardHeader>
      <CardContent className="p-0 flex-1 relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <MapContainer
          center={center}
          zoom={11}
          scrollWheelZoom={true}
          className="h-full w-full bg-slate-50"
          style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
          {/* CartoDB Positron - Clean light basemap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {/* Density Circles - Render smaller ones first, larger ones on top */}
          {[...densityZones]
            .sort((a, b) => a.count - b.count)
            .map((zone) => (
              <CircleMarker
                key={zone.pincode}
                center={[zone.lat, zone.lng]}
                radius={getRadius(zone.count)}
                pathOptions={{
                  fillColor: '#a855f7',
                  color: '#7c3aed',
                  weight: 1.5,
                  opacity: 0.9,
                  fillOpacity: getOpacity(zone.count),
                }}
                eventHandlers={{
                  mouseover: () => setHoveredZone(zone),
                  mouseout: () => setHoveredZone(null),
                }}
              >
                {/* Show count label for zones with 10+ NGOs */}
                {zone.count >= 10 && (
                  <Tooltip
                    direction="center"
                    permanent
                    className="density-label"
                  >
                    <span className="text-[10px] font-bold text-purple-900">
                      {zone.count}
                    </span>
                  </Tooltip>
                )}
              </CircleMarker>
            ))}

          <ZoomControl position="bottomright" />
        </MapContainer>

        {/* Stats Badge */}
        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-white px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-slate-200 shadow-sm text-[10px] md:text-xs font-mono z-[400] text-slate-600">
          {totalNGOs.toLocaleString()} NGOs
        </div>

        {/* Hover Info Card */}
        {hoveredZone && (
          <div className="absolute top-2 left-2 md:top-auto md:bottom-4 md:left-4 bg-white/95 backdrop-blur-sm px-3 py-2 md:px-4 md:py-3 rounded-xl border border-slate-200 shadow-lg z-[400] min-w-[160px] md:min-w-[180px]">
            <p className="text-sm font-semibold text-slate-900">{hoveredZone.name}</p>
            <p className="text-xs text-slate-500 font-mono">{hoveredZone.pincode}</p>
            <div className="mt-1 md:mt-2 flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-bold text-purple-600">{hoveredZone.count}</span>
              <span className="text-[10px] md:text-xs text-slate-500">providers</span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-white/95 backdrop-blur-sm px-2 md:px-3 py-1.5 md:py-2 rounded-lg border border-slate-200 shadow-sm z-[400]">
          <p className="hidden md:block text-[10px] font-medium text-slate-500 uppercase tracking-wide mb-1.5">Density</p>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="flex items-center gap-0.5 md:gap-1">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-purple-500/30 border border-purple-600" />
              <span className="text-[8px] md:text-[10px] text-slate-500">Low</span>
            </div>
            <div className="flex items-center gap-0.5 md:gap-1">
              <div className="w-2.5 h-2.5 md:w-4 md:h-4 rounded-full bg-purple-500/50 border border-purple-600" />
              <span className="text-[8px] md:text-[10px] text-slate-500">Med</span>
            </div>
            <div className="flex items-center gap-0.5 md:gap-1">
              <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-purple-500/80 border border-purple-600" />
              <span className="text-[8px] md:text-[10px] text-slate-500">High</span>
            </div>
          </div>
        </div>
      </CardContent>

      <style jsx global>{`
        .density-label {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .density-label::before {
          display: none !important;
        }
      `}</style>
    </Card>
  );
}
