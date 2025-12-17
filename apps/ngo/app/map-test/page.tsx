"use client";

import { useState } from "react";
import { getNearestNgos, type NearestNgo } from "../actions/get-nearest-ngos";
import MapView from "../components/map-view";
import { MapPin, Navigation, Search, CheckCircle2 } from "lucide-react";

export default function MapTestPage() {
  const [ngos, setNgos] = useState<NearestNgo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedNgoId, setSelectedNgoId] = useState<string | null>(null);

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });

        try {
          const results = await getNearestNgos(latitude, longitude);
          setNgos(results);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch NGOs");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve your location. Please allow access.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans text-gray-900">
      
      {/* LEFT PANEL: LIST & CONTROLS */}
      <div className="w-[400px] flex-shrink-0 h-full bg-white border-r shadow-xl z-20 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b bg-white z-10">
          <h1 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
            <MapPin className="fill-purple-100 text-purple-700" />
            PurplePages
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Discover verified NGOs near you.
          </p>
          
          <button
            onClick={handleGetLocation}
            disabled={loading}
            className={`
              mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all
              ${loading 
                ? 'bg-purple-100 text-purple-400 cursor-wait' 
                : 'bg-purple-700 hover:bg-purple-800 text-white shadow-lg hover:shadow-purple-200'}
            `}
          >
            {loading ? (
              <span>Locating...</span>
            ) : (
              <>
                <Navigation className="w-4 h-4" />
                Find NGOs Near Me
              </>
            )}
          </button>
          
          {error && (
            <div className="mt-3 p-3 bg-red-50 text-red-600 text-xs rounded border border-red-100">
              {error}
            </div>
          )}
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {ngos.length === 0 && !loading && (
            <div className="text-center py-20 text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Click "Find NGOs" to start.</p>
            </div>
          )}

          {ngos.map((ngo) => (
            <div
              key={ngo.id}
              onClick={() => setSelectedNgoId(ngo.id)}
              className={`
                p-4 rounded-xl border cursor-pointer transition-all duration-200 relative group
                ${selectedNgoId === ngo.id 
                  ? 'bg-purple-50 border-purple-300 shadow-md ring-1 ring-purple-200' 
                  : 'bg-white border-gray-100 hover:border-purple-200 hover:shadow-sm'}
              `}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-semibold text-lg leading-tight ${selectedNgoId === ngo.id ? 'text-purple-900' : 'text-gray-800'}`}>
                  {ngo.name}
                </h3>
                <span className={`
                    text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap flex items-center gap-1
                    ${selectedNgoId === ngo.id ? 'bg-purple-200 text-purple-800' : 'bg-gray-100 text-gray-600'}
                `}>
                  <Navigation className="w-3 h-3" />
                  {(ngo.distance / 1000).toFixed(1)} km
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {ngo.address || "Address unavailable"}
              </p>

              <div className="flex flex-wrap gap-2">
                {ngo.primarySectors.slice(0, 3).map((sector) => (
                  <span 
                    key={sector} 
                    className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-white border border-gray-200 rounded text-gray-500 group-hover:border-purple-100 group-hover:text-purple-600 transition-colors"
                  >
                    {sector}
                  </span>
                ))}
                {ngo.primarySectors.length > 3 && (
                    <span className="text-[10px] px-2 py-1 text-gray-400">+ more</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: MAP */}
      <div className="flex-1 h-full relative bg-gray-100">
        <MapView 
            ngos={ngos} 
            userLocation={userLocation} 
            selectedNgoId={selectedNgoId}
            onSelectNgo={setSelectedNgoId}
        />
        
        {/* Floating Attribution/Info if needed */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] text-gray-500 shadow-sm border border-gray-200 pointer-events-none">
            {ngos.length > 0 ? `${ngos.length} NGOs found nearby` : "Map View"}
        </div>
      </div>
    </div>
  );
}