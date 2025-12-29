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
  ChevronUp,
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
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Mobile Sheet State
  const [isExpanded, setIsExpanded] = useState(false);

  // Initial Load
  useEffect(() => {
    getUniqueSectors().then(setSectors);
  }, []);

  // Scroll active item into view & Expand Sheet
  useEffect(() => {
    if (selectedNgoId) {
      // Auto-expand sheet on mobile when a pin is clicked
      if (window.innerWidth < 768) {
        setIsExpanded(true);
      }

      const element = document.getElementById(`ngo-card-${selectedNgoId}`);
      if (element) {
        // Small delay to allow sheet expansion animation to start
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }
  }, [selectedNgoId]);

  const fetchNgos = async (lat: number, lon: number, sectorsList: string[]) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const results = await getNearestNgos(lat, lon, sectorsList);
      setNgos(results);
      
      // Auto-expand if results found on mobile
      if (results.length > 0 && window.innerWidth < 768) {
        setIsExpanded(true);
      }
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
        fetchNgos(latitude, longitude, selectedSectors);
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
      fetchNgos(location.lat, location.lng, selectedSectors);

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
    if (!sector) {
        // Clear all
        setSelectedSectors([]);
        if (userLocation) {
            fetchNgos(userLocation.lat, userLocation.lon, []);
        }
        return;
    }

    let newSectors: string[];
    if (selectedSectors.includes(sector)) {
        newSectors = selectedSectors.filter(s => s !== sector);
    } else {
        newSectors = [...selectedSectors, sector];
    }
    
    setSelectedSectors(newSectors);
    
    // Live update map if user has a location
    if (userLocation) {
      fetchNgos(userLocation.lat, userLocation.lon, newSectors);
    }
  };

  return (
    <div className="relative h-screen w-full bg-gray-50 overflow-hidden font-sans text-gray-900 md:flex md:flex-row">
      
      {/* MAP LAYER (Bottom on mobile, Right on desktop) */}
      <div className="absolute inset-0 z-0 md:static md:flex-1 md:h-full md:order-2">
        <MapView 
            ngos={ngos} 
            userLocation={userLocation} 
            selectedNgoId={selectedNgoId}
            onSelectNgo={setSelectedNgoId}
        />
        {/* Simple count overlay for desktop map, mobile uses sheet */}
        <div className="hidden md:flex absolute top-6 right-6 bg-white/95 backdrop-blur px-4 py-2 rounded-xl text-xs font-medium text-gray-600 shadow-lg border border-gray-100 z-[1000] pointer-events-none items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            {ngos.length > 0 ? `Showing ${ngos.length} nearest NGOs` : "Map Ready"}
        </div>
      </div>

      {/* SHEET LAYER (Top on mobile, Left on desktop) */}
      <div 
        className={`
            absolute bottom-0 left-0 right-0 z-30 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.15)] 
            flex flex-col rounded-t-3xl transition-[height] duration-500 cubic-bezier(0.32, 0.72, 0, 1)
            md:static md:w-[420px] md:h-full md:rounded-none md:shadow-xl md:z-20 md:order-1
            ${isExpanded ? 'h-[85vh]' : 'h-[200px]'}
            md:h-full
        `}
      >
        
        {/* Mobile Drag Handle & Toggle */}
        <div 
            className="md:hidden flex flex-col items-center justify-center pt-3 pb-1 cursor-pointer shrink-0"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-2" />
        </div>

        {/* Mobile Up/Down Toggle Button */}
        <button 
            className={`
                md:hidden absolute top-4 right-6 p-2 rounded-full transition-all duration-300 z-40 border shadow-sm
                ${isExpanded 
                    ? 'bg-purple-50 text-purple-700 border-purple-200 ring-2 ring-purple-100' 
                    : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-purple-50 hover:text-purple-700'}
            `}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
        
        {/* Header Section (Search & Controls) */}
        <div className="px-6 pb-4 md:pt-5 md:pb-5 border-b bg-white z-30 shrink-0">
          <h1 className="text-2xl font-bold text-purple-900 flex items-center gap-2 mb-1 tracking-tight">
            <div className="p-1.5 bg-purple-100 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-700" />
            </div>
            PurplePages
          </h1>
          <p className="text-sm text-gray-500 mb-5 ml-1 hidden md:block">
            Intelligence Layer for the Social Sector
          </p>
          
          <form onSubmit={onSearchSubmit} className="relative mb-3 group mt-4 md:mt-0">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3.5 w-4 h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors pointer-events-none" />
              
              <input
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if(window.innerWidth < 768) setIsExpanded(true); }}
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
                className="flex-1 group flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 text-gray-600 rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
                {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                <MapPinned className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                )}
                Near Me
            </button>

            {/* Filter Button (Triggers Modal) */}
            <button
                onClick={() => setIsSectorOpen(true)}
                className={`
                    flex-1 flex items-center justify-between px-4 py-2.5 border rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95
                    ${selectedSectors.length > 0 
                        ? 'bg-purple-50 border-purple-200 text-purple-700' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                `}
            >
                <span className="truncate max-w-[100px]">
                    {selectedSectors.length > 0 ? `${selectedSectors.length} Sectors` : "Filter Sector"}
                </span>
                <Filter className="w-3.5 h-3.5" />
            </button>
          </div>
          
          {error && (
            <div className="mt-3 p-2.5 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                {error}
            </div>
          )}
        </div>

        {/* Scrollable List Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {!hasSearched && !loading && (
            <div className="flex flex-col items-center justify-center h-48 md:h-64 text-gray-400 text-center px-6">
              <div className="p-4 bg-purple-50 rounded-full mb-3">
                <Search className="w-6 h-6 text-purple-300" />
              </div>
              <p className="text-sm font-medium text-gray-600">Find Organizations</p>
              <p className="text-xs mt-1 leading-relaxed max-w-[200px] mx-auto">Search for a location or use your current position to discover NGOs nearby.</p>
            </div>
          )}

          {hasSearched && ngos.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-48 md:h-64 text-gray-400 text-center px-6">
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
              id={`ngo-card-${ngo.id}`}
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
          
          {/* Footer Spacer for Mobile safety */}
          <div className="h-8 md:h-4"></div>
        </div>
      </div>

      {/* FILTER MODAL OVERLAY */}
      {isSectorOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div 
             className="bg-white rounded-2xl w-full max-w-sm max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
                  <h3 className="font-bold text-lg text-gray-900">Filter by Sector</h3>
                  <button 
                      onClick={() => setIsSectorOpen(false)}
                      className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                      <X size={20} />
                  </button>
              </div>
              
              <div className="overflow-y-auto p-2">
                  <button
                      onClick={() => toggleSector("")}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 text-gray-600 mb-1 border border-transparent hover:border-gray-200 transition-all"
                  >
                      Clear Selection
                  </button>
                  {sectors.map((sector) => {
                      const isSelected = selectedSectors.includes(sector);
                      return (
                        <button
                            key={sector}
                            onClick={() => toggleSector(sector)}
                            className={`
                                w-full text-left px-4 py-3 rounded-xl text-sm flex items-center justify-between mb-1 border transition-all
                                ${isSelected 
                                    ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold shadow-sm' 
                                    : 'text-gray-700 border-transparent hover:bg-gray-50 hover:border-gray-200'}
                            `}
                        >
                            {sector}
                            {isSelected && <Check className="w-4 h-4" />}
                        </button>
                      );
                  })}
              </div>
              {/* Footer with Apply button */}
              <div className="p-4 border-t border-gray-100 shrink-0">
                  <button
                     onClick={() => setIsSectorOpen(false)}
                     className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-600/20 active:scale-95 transition-transform"
                  >
                     Apply Filters {selectedSectors.length > 0 && `(${selectedSectors.length})`}
                  </button>
              </div>
           </div>
           {/* Backdrop click to close */}
           <div className="absolute inset-0 -z-10" onClick={() => setIsSectorOpen(false)} />
        </div>
      )}

    </div>
  );
}