"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { NearestNgo } from "../actions/get-nearest-ngos";

// Fix Leaflet's default icon issue in React
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom Icon for Selected or Precise
const preciseIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const selectedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [30, 48], // Slightly bigger
  iconAnchor: [15, 48],
  popupAnchor: [1, -40],
  shadowSize: [41, 41]
});


// Component to handle map movement
function MapUpdater({ center, zoom, selectedId }: { center: [number, number]; zoom: number, selectedId: string | null }) {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(center, zoom, {
        duration: 1.2,
        easeLinearity: 0.25
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
  
  const activeNgo = ngos.find(n => n.id === selectedNgoId);
  
  // Logic to determine center
  // 1. If active NGO, center on it
  // 2. If userLocation, center on it
  // 3. Default
  
  let center: [number, number] = defaultCenter;
  let zoom = 12;

  if (activeNgo) {
      center = [activeNgo.latitude, activeNgo.longitude];
      zoom = 16;
  } else if (userLocation) {
      center = [userLocation.lat, userLocation.lon];
      zoom = 14;
  }

  // Ref to store markers to open popups programmatically
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({});

  useEffect(() => {
    if (selectedNgoId && markerRefs.current[selectedNgoId]) {
      markerRefs.current[selectedNgoId]?.openPopup();
    }
  }, [selectedNgoId]);

  return (
    <div className="w-full h-full z-0 outline-none">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ width: "100%", height: "100%", background: "#f3f4f6" }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <MapUpdater center={center} zoom={zoom} selectedId={selectedNgoId} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"
          tileSize={512}
          zoomOffset={-1}
        />

        {/* User Location */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lon]} icon={defaultIcon} opacity={0.8}>
            <Popup className="custom-popup">
               <div className="text-center">
                 <span className="font-bold text-gray-700">Your Location</span>
               </div>
            </Popup>
          </Marker>
        )}

        {/* NGO Markers */}
        {ngos.map((ngo) => {
           const isSelected = selectedNgoId === ngo.id;
           const iconToUse = isSelected ? selectedIcon : (ngo.exactGeocodeMatch ? preciseIcon : defaultIcon);
           
           return (
            <Marker
                key={ngo.id}
                position={[ngo.latitude, ngo.longitude]}
                icon={iconToUse}
                zIndexOffset={isSelected ? 1000 : 0}
                ref={(ref) => { markerRefs.current[ngo.id] = ref; }}
                eventHandlers={{
                click: () => onSelectNgo(ngo.id),
                }}
            >
                <Popup className="custom-popup" closeButton={false}>
                <div className="px-1 py-1 min-w-[180px]">
                    <h3 className="font-bold text-sm text-purple-900 mb-1">{ngo.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                            {(ngo.distance / 1000).toFixed(1)} km
                        </span>
                        {ngo.exactGeocodeMatch && (
                             <span className="text-[10px] text-green-600 font-medium">Verified</span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 leading-snug line-clamp-3 border-t pt-2 border-gray-100">
                        {ngo.address}
                    </p>
                </div>
                </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Custom Zoom Control could go here */}
    </div>
  );
}