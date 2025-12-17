"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { NearestNgo } from "../actions/get-nearest-ngos";

// Fix Leaflet's default icon issue in React
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to handle map movement
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
        duration: 1.5
    });
  }, [center, zoom, map]);
  return null;
}

interface MapViewProps {
  ngos: NearestNgo[];
  userLocation: { lat: number; lon: number } | null;
  selectedNgoId: string | null;
  onSelectNgo: (id: string | null) => void;
}

export default function MapViewCore({ ngos, userLocation, selectedNgoId, onSelectNgo }: MapViewProps) {
  // Default center (Bangalore)
  const defaultCenter: [number, number] = [12.9716, 77.5946];
  const center = userLocation ? [userLocation.lat, userLocation.lon] as [number, number] : defaultCenter;
  const zoom = userLocation ? 13 : 11;

  // Selected NGO override
  const activeNgo = ngos.find(n => n.id === selectedNgoId);
  const mapCenter = activeNgo ? [activeNgo.latitude, activeNgo.longitude] as [number, number] : center;
  const mapZoom = activeNgo ? 15 : zoom;

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-inner border border-purple-100 z-0">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <MapUpdater center={mapCenter} zoom={mapZoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lon]} icon={icon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* NGO Markers */}
        {ngos.map((ngo) => (
          <Marker
            key={ngo.id}
            position={[ngo.latitude, ngo.longitude]}
            icon={icon}
            eventHandlers={{
              click: () => onSelectNgo(ngo.id),
            }}
          >
            <Popup>
              <div className="p-1 max-w-[200px]">
                <h3 className="font-bold text-sm text-purple-900">{ngo.name}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ngo.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
