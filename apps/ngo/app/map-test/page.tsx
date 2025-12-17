"use client";

import { useState } from "react";
import { getNearestNgos, type NearestNgo } from "../actions/get-nearest-ngos";
import MapView from "../components/map-view";
import { MapPin, Navigation, Search, CheckCircle2, Loader2, MapPinned, ArrowRight, X } from "lucide-react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function MapTestPage() {
  const [ngos, setNgos] = useState<NearestNgo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedNgoId, setSelectedNgoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
        setSearchQuery(""); // Clear search box if GPS is used

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

  const handleTextSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    console.log(`🔍 Searching for: "${searchQuery}"`);

    try {
      const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(searchQuery)}&country=in&limit=1&access_token=${MAPBOX_TOKEN}`;
      console.log(`📡 Requesting Mapbox API...`);

      const response = await fetch(url);
      
      if (!response.ok) {
        console.error(`❌ API Error: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.error(`   Body: ${text}`);
        setError(`Search failed: ${response.statusText}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log(`✅ Response received. Features found: ${data.features?.length || 0}`);

      if (!data.features || data.features.length === 0) {
        console.warn("⚠️ No results found for query.");
        setError("Location not found");
        setLoading(false);
        return;
      }

      const feature = data.features[0];
      console.log(`📍 Matched: ${feature.properties.full_address || feature.properties.name}`);
      console.log(`   Coords: ${feature.geometry.coordinates}`);

      const [lon, lat] = feature.geometry.coordinates; // GeoJSON is [lon, lat]

      // 2. Update state to reflect search center
      setUserLocation({ lat, lon });

      // 3. Fetch NGOs
      console.log("🔄 Fetching nearest NGOs...");
      const results = await getNearestNgos(lat, lon);
      console.log(`🏢 Found ${results.length} NGOs nearby.`);
      setNgos(results);

    } catch (err) {
      console.error("❌ Unexpected Error:", err);
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans text-gray-900">
      
      {/* LEFT PANEL: LIST & CONTROLS */}
      <div className="w-[400px] flex-shrink-0 h-full bg-white border-r shadow-xl z-20 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b bg-white z-10">
          <h1 className="text-2xl font-bold text-purple-900 flex items-center gap-2 mb-1">
            <MapPin className="fill-purple-100 text-purple-700" />
            PurplePages
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Discover verified NGOs near you.
          </p>
          
          <form onSubmit={handleTextSearch} className="relative mb-4 group">
            <div className="relative flex items-center w-full">
              {/* Search Icon */}
              <Search className="absolute left-3.5 w-5 h-5 text-gray-400 group-focus-within:text-purple-600 transition-colors pointer-events-none" />
              
              {/* Input Field */}
              <input
                type="text"
                placeholder="Search location (e.g. Indiranagar)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl shadow-sm text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />

              {/* Right Actions */}
              <div className="absolute right-2 flex items-center gap-1">
                {/* Clear Button (only show when there is text and not loading) */}
                {searchQuery && !loading && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Submit/Load Button */}
                <button 
                    type="submit"
                    disabled={loading || !searchQuery.trim()}
                    className={`
                      p-1.5 rounded-lg transition-all flex items-center justify-center
                      ${loading 
                        ? 'cursor-wait bg-transparent' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none disabled:bg-gray-200 disabled:text-gray-400'}
                    `}
                >
                    {loading ? (
                      <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                </button>
              </div>
            </div>
          </form>

          <button
            onClick={handleGetLocation}
            disabled={loading}
            className="w-full group flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600 hover:text-gray-900 rounded-xl text-xs font-bold transition-all uppercase tracking-wide shadow-sm"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
            ) : (
              <MapPinned className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
            )}
            Use My Current Location
          </button>
          
          {error && (
            <div className="mt-3 p-3 bg-red-50 text-red-600 text-xs rounded border border-red-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {error}
            </div>
          )}
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {ngos.length === 0 && !loading && (
            <div className="text-center py-20 text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Search a location to start.</p>
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