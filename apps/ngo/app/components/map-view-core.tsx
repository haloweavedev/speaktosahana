"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { NearestNgo } from "../actions/get-nearest-ngos";
import { defaultIcon, preciseIcon, selectedIcon, userIcon } from "./map-icons";
import { Info, X } from "lucide-react";


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
  const [showLegend, setShowLegend] = useState(false);
  const legendRef = useRef<HTMLDivElement>(null);
  
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

  // Click outside listener for legend
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (legendRef.current && !legendRef.current.contains(event.target as Node)) {
        setShowLegend(false);
      }
    }
    if (showLegend) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLegend]);

  return (
    <div className="w-full h-full z-0 outline-none relative group">
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
          <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon} opacity={1.0} zIndexOffset={500}>
            <Popup className="custom-popup">
               <div className="text-center">
                 <span className="font-bold text-red-600">You are Here</span>
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
      
      {/* Legend Container */}
      <div className="absolute bottom-32 left-4 md:bottom-6 md:left-6 z-[400]" ref={legendRef}>
        {/* Toggle Button */}
        <button 
          onClick={() => setShowLegend(!showLegend)}
          className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border border-purple-100 text-purple-600 hover:bg-white transition-all active:scale-95"
          aria-label="Map Legend"
        >
          {showLegend ? <X size={20} /> : <Info size={20} />}
        </button>

        {/* Popover Content */}
        {showLegend && (
          <div className="absolute bottom-full left-0 mb-3 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-purple-100 min-w-[180px] animate-in slide-in-from-bottom-2 fade-in duration-200">
            <h4 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Map Legend</h4>
            <div className="flex flex-col gap-3 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 ring-2 ring-green-100 shadow-sm"></div>
                <span>Verified Location</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-100 shadow-sm"></div>
                <span>Approximate</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 ring-2 ring-red-100 shadow-sm"></div>
                <span>You / Search</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}