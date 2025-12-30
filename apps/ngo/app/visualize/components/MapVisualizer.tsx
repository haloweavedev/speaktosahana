'use client';

import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';

interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  name: string;
  sector: string;
}

interface TopArea {
    name: string; 
    count: number; 
    pincode: string;
    lat?: number;
    lng?: number;
}

interface MapVisualizerProps {
  points: MapPoint[];
  topAreas?: TopArea[];
}

export default function MapVisualizer({ points, topAreas }: MapVisualizerProps) {
  // Center roughly on Karnataka/Bangalore as per data
  const center: [number, number] = [12.9716, 77.5946];

  return (
    <Card className="h-[600px] flex flex-col overflow-hidden border-0 bg-transparent shadow-none relative">
      <CardHeader className="pt-6 pb-4">
        <CardTitle className="text-lg font-display">Geospatial Density</CardTitle>
        <p className="text-sm text-muted-foreground">Mapping service providers across Bengaluru's neighborhoods</p>
      </CardHeader>
      <CardContent className="p-0 flex-1 relative rounded-2xl overflow-hidden border border-border/50 shadow-sm">
        <MapContainer 
            center={center} 
            zoom={11} 
            scrollWheelZoom={false} 
            className="h-full w-full bg-slate-50"
            style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
          {/* CartoDB Positron (Light, Clean) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          {/* Individual Points */}
          {points.map((point) => (
            <CircleMarker
              key={point.id}
              center={[point.lat, point.lng]}
              radius={3}
              pathOptions={{ 
                  fillColor: '#7c3aed', // Purple-600
                  color: '#fff', 
                  weight: 0.5, 
                  opacity: 0.5, 
                  fillOpacity: 0.6
              }}
            >
              <Popup className="custom-popup">
                <div className="text-sm p-1">
                  <p className="font-bold text-slate-900">{point.name}</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{point.sector}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Top Area Centroids (Optional Visualization) */}
          {topAreas?.map((area) => (
              area.lat && area.lng ? (
                <CircleMarker
                    key={area.pincode}
                    center={[area.lat, area.lng]}
                    radius={20} // Larger
                    pathOptions={{
                        fillColor: '#d8b4fe', // Light Purple
                        color: '#7c3aed',     // Dark Purple Stroke
                        weight: 2,
                        opacity: 0.8,
                        fillOpacity: 0.2
                    }}
                >
                    <Tooltip direction="center" permanent className="bg-transparent border-0 shadow-none text-purple-900 font-bold text-xs">
                        {area.count}
                    </Tooltip>
                </CircleMarker>
              ) : null
          ))}

          <ZoomControl position="bottomright" />
        </MapContainer>
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-sm text-xs font-mono z-[400] text-slate-600">
           {points.length} Verified Locations
        </div>
      </CardContent>
    </Card>
  );
}