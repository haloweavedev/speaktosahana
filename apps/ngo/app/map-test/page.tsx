"use client";

import { useState, useEffect } from "react";
import { getNearestNgos, type NearestNgo } from "../actions/get-nearest-ngos";
import { geocodeLocation } from "../actions/geocode";
import { getUniqueSectors } from "../actions/get-sectors";
import MapView from "../components/map-view";
import { 
  MapPin, 
  Search, 
  Loader2, 
  MapPinned, 
  ArrowRight, 
  X,
  Filter,
  Check,
  ChevronDown,
  Navigation
} from "lucide-react";

export default function MapTestPage() {
  const [ngos, setNgos] = useState<NearestNgo[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedNgoId, setSelectedNgoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [isSectorOpen, setIsSectorOpen] = useState(false);

  // Initial Load
  useEffect(() => {
    getUniqueSectors().then(setSectors);
    // Default to Bangalore Center
    handleSearch("Bangalore");
  }, []);

  const fetchNgos = async (lat: number, lon: number, sector?: string) => {
    setLoading(true);
    try {
      const results = await getNearestNgos(lat, lon, sector || undefined);
      setNgos(results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch NGOs");
    } finally {
      setLoading(false);
    }
  };

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
        setSearchQuery(""); 
        fetchNgos(latitude, longitude, selectedSector);
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve your location. Please allow access.");
        setLoading(false);
      }
    );
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const location = await geocodeLocation(query);
      
      if (!location) {
        setError("Location not found");
        setLoading(false);
        return;
      }

      setUserLocation({ lat: location.lat, lon: location.lng });
      fetchNgos(location.lat, location.lng, selectedSector);

    } catch (err) {
      console.error(err);
      setError("Search failed");
      setLoading(false);
    }
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const toggleSector = (sector: string) => {
    const newSector = selectedSector === sector ? "" : sector;
    setSelectedSector(newSector);
    setIsSectorOpen(false);
    
    if (userLocation) {
      fetchNgos(userLocation.lat, userLocation.lon, newSector);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans text-gray-900">
      
      {/* LEFT PANEL: LIST & CONTROLS */}
      <div className="w-[420px] flex-shrink-0 h-full bg-white border-r shadow-xl z-20 flex flex-col relative">
        
        {/* Header */}
        <div className="px-6 py-5 border-b bg-white z-10 shadow-sm">
          <h1 className="text-2xl font-bold text-purple-900 flex items-center gap-2 mb-1 tracking-tight">
            <div className="p-1.5 bg-purple-100 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-700" />
            </div>
            PurplePages
          </h1>
          <p className="text-sm text-gray-500 mb-5 ml-1">
            Intelligence Layer for the Social Sector
          </p>
          
          <form onSubmit={onSearchSubmit} className="relative mb-3 group">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3.5 w-4 h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors pointer-events-none" />
              
              <input
                type="text"
                placeholder="Search location (e.g. Indiranagar)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all"
              />

              <div className="absolute right-2 flex items-center gap-1">
                {searchQuery && !loading && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                <button 
                    type="submit"
                    disabled={loading || !searchQuery.trim()}
                    className={`
                      p-1.5 rounded-lg transition-all flex items-center justify-center
                      ${loading 
                        ? 'cursor-wait bg-transparent' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow disabled:opacity-50 disabled:shadow-none disabled:bg-gray-200 disabled:text-gray-400'}
                    `}
                >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                </button>
              </div>
            </div>
          </form>

          <div className="flex gap-2 mb-1">
             {/* Use Location Button */}
            <button
                onClick={handleGetLocation}
                disabled={loading}
                className="flex-1 group flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 text-gray-600 rounded-xl text-xs font-semibold transition-all shadow-sm"
            >
                {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                <MapPinned className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                )}
                Near Me
            </button>

            {/* Filter Dropdown */}
            <div className="relative flex-1">
                <button
                    onClick={() => setIsSectorOpen(!isSectorOpen)}
                    className={`
                        w-full flex items-center justify-between px-4 py-2.5 border rounded-xl text-xs font-semibold transition-all shadow-sm
                        ${selectedSector 
                            ? 'bg-purple-50 border-purple-200 text-purple-700' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                    `}
                >
                    <span className="truncate max-w-[120px]">
                        {selectedSector || "Filter Sector"}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSectorOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSectorOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1">
                        <button
                            onClick={() => toggleSector("")}
                            className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 text-gray-600 font-medium border-b border-gray-50"
                        >
                            All Sectors
                        </button>
                        {sectors.map((sector) => (
                            <button
                                key={sector}
                                onClick={() => toggleSector(sector)}
                                className={`
                                    w-full text-left px-4 py-2 text-xs hover:bg-purple-50 flex items-center justify-between
                                    ${selectedSector === sector ? 'text-purple-700 font-bold bg-purple-50/50' : 'text-gray-700'}
                                `}
                            >
                                {sector}
                                {selectedSector === sector && <Check className="w-3 h-3" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
          </div>
          
          {error && (
            <div className="mt-3 p-2.5 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                {error}
            </div>
          )}
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {ngos.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-center px-6">
              <div className="p-4 bg-gray-100 rounded-full mb-3">
                <Filter className="w-6 h-6 opacity-30" />
              </div>
              <p className="text-sm font-medium text-gray-500">No NGOs found here.</p>
              <p className="text-xs mt-1">Try changing location or filters.</p>
            </div>
          )}

          {ngos.map((ngo) => (
            <div
              key={ngo.id}
              onClick={() => setSelectedNgoId(ngo.id)}
              className={`
                p-4 rounded-xl border cursor-pointer transition-all duration-200 relative group
                ${selectedNgoId === ngo.id 
                  ? 'bg-white border-purple-500 shadow-lg ring-1 ring-purple-500 z-10' 
                  : 'bg-white border-gray-200/60 hover:border-purple-300 hover:shadow-md'}
              `}
            >
              <div className="flex justify-between items-start mb-1.5 gap-3">
                <h3 className={`font-bold text-[15px] leading-tight ${selectedNgoId === ngo.id ? 'text-purple-900' : 'text-gray-900'}`}>
                  {ngo.name}
                </h3>
                {ngo.exactGeocodeMatch && (
                    <span className="shrink-0" title="Verified Location">
                         <div className="w-2 h-2 rounded-full bg-green-500 ring-2 ring-green-100"></div>
                    </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3 text-xs">
                 <span className={`
                    font-bold px-2 py-0.5 rounded-md flex items-center gap-1
                    ${selectedNgoId === ngo.id ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}
                `}>
                   <Navigation className="w-3 h-3" />
                   {(ngo.distance / 1000).toFixed(2)} km
                </span>
                
                {ngo.accuracyLevel && (
                    <span className="text-gray-400 text-[10px] uppercase">{ngo.accuracyLevel.replace('_', ' ')}</span>
                )}
              </div>

              <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                {ngo.address || "Address details unavailable"}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {ngo.primarySectors.slice(0, 4).map((sector) => (
                  <span 
                    key={sector} 
                    className="text-[10px] font-medium px-2 py-1 bg-gray-50 border border-gray-100 rounded-md text-gray-600 group-hover:border-purple-100 group-hover:text-purple-700 transition-colors"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          ))}
          
          {/* Footer Spacer */}
          <div className="h-4"></div>
        </div>
      </div>

      {/* RIGHT PANEL: MAP */}
      <div className="flex-1 h-full relative bg-gray-200/50">
        <MapView 
            ngos={ngos} 
            userLocation={userLocation} 
            selectedNgoId={selectedNgoId}
            onSelectNgo={setSelectedNgoId}
        />
        
        {/* Floating Info */}
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-xs font-medium text-gray-600 shadow-lg border border-gray-100 z-[1000] pointer-events-none flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            {ngos.length > 0 ? `${ngos.length} Organizations` : "Map Ready"}
        </div>
      </div>
    </div>
  );
}
