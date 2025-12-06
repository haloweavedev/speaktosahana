"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Ngo } from "../../lib/types";
import { Search, MapPin, Building2, Heart, User, ArrowUpRight, Filter, X, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge, Button } from "@repo/ui"; // Assuming these exist from previous page.tsx
import { cn } from "../../lib/utils"; // Need to ensure this exists or create it

type Persona = "donor" | "ngo" | "volunteer" | "pwd" | "all";

interface DashboardProps {
  initialRecords: Ngo[];
  capturedAt?: string;
}

const ITEMS_PER_PAGE = 25;

export default function Dashboard({ initialRecords, capturedAt }: DashboardProps) {
  const [persona, setPersona] = useState<Persona>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const resultsTopRef = useRef<HTMLDivElement>(null);

  // Derived data for filters
  const allSectors = useMemo(() => {
    const sectors = new Set<string>();
    initialRecords.forEach((r) => {
      r.primarySectors.forEach((s) => s && sectors.add(s));
      r.secondarySectors.forEach((s) => s && sectors.add(s));
    });
    return Array.from(sectors).sort();
  }, [initialRecords]);

  const allDistricts = useMemo(() => {
    const districts = new Set<string>();
    initialRecords.forEach((r) => {
      if (r.operationalDistrict && r.operationalDistrict.toLowerCase() !== "all") {
        r.operationalDistrict.split(/[,;]/).forEach((d) => districts.add(d.trim()));
      }
    });
    return Array.from(districts).sort();
  }, [initialRecords]);

  // Persona-based presets
  useEffect(() => {
    setCurrentPage(1); // Reset page on persona change
    if (persona === "pwd") {
      setSelectedSectors(["Differently Abled"]);
    } else if (persona === "all") {
       // Reset logic if needed when switching back to all, 
       // but keeping user selection might be better UX. 
       // Let's clear specific presets though.
       if (selectedSectors.length === 1 && selectedSectors[0] === "Differently Abled") {
           setSelectedSectors([]);
       }
    }
  }, [persona]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSectors, selectedDistricts]);

  const filteredRecords = useMemo(() => {
    return initialRecords.filter((ngo) => {
      // Text Search
      const matchesSearch =
        !searchQuery ||
        ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Sector Filter
      if (selectedSectors.length > 0) {
        const ngoSectors = new Set([...ngo.primarySectors, ...ngo.secondarySectors]);
        // AND logic for donors (intersection), OR logic generally?
        // The prompt asked for "Intersection" for Donors.
        // Let's use AND if multiple are selected, or provide a toggle.
        // For now, let's stick to "Matches ANY" for general use, but "Matches ALL" for Donor persona could be cool.
        // Actually, "Matches ALL" is safer for "Intersection".
        
        const hasAllSectors = selectedSectors.every((s) => ngoSectors.has(s));
        if (!hasAllSectors) return false;
      }

      // District Filter
      if (selectedDistricts.length > 0) {
        // Check if operational district matches or is "ALL" (if we consider ALL as matching everything)
        // For specific filtering, we usually want exact matches.
        const dists = ngo.operationalDistrict.toLowerCase();
        const matchesDistrict =
          dists === "all" ||
          selectedDistricts.some((d) => dists.includes(d.toLowerCase()));
        
        if (!matchesDistrict) return false;
      }

      return true;
    });
  }, [initialRecords, searchQuery, selectedSectors, selectedDistricts]);

  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRecords, currentPage]);

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]
    );
  };

  const toggleDistrict = (district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district]
    );
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top of results
    if (resultsTopRef.current) {
        resultsTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
        {/* Header / Persona Selector */}
        <div className="bg-slate-950 pt-8 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-950 to-slate-950" />
             <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading">
                        <span className="text-purple-400">purple</span>Pages
                    </h1>
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <PersonaButton active={persona === 'all'} onClick={() => setPersona('all')} icon={<Search size={16}/>}>Explore</PersonaButton>
                        <PersonaButton active={persona === 'donor'} onClick={() => setPersona('donor')} icon={<Heart size={16}/>}>Donors</PersonaButton>
                        <PersonaButton active={persona === 'ngo'} onClick={() => setPersona('ngo')} icon={<Building2 size={16}/>}>NGOs</PersonaButton>
                        <PersonaButton active={persona === 'volunteer'} onClick={() => setPersona('volunteer')} icon={<User size={16}/>}>Volunteers</PersonaButton>
                        <PersonaButton active={persona === 'pwd'} onClick={() => setPersona('pwd')} icon={<Check size={16}/>}>Access</PersonaButton>
                    </div>
                </div>

                <div className="max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                        {persona === 'all' && "Discover Impact."}
                        {persona === 'donor' && "Find Strategic Intersections."}
                        {persona === 'ngo' && "Connect with Peers."}
                        {persona === 'volunteer' && "Volunteer Locally."}
                        {persona === 'pwd' && "Accessible Services."}
                    </h2>
                    <p className="text-lg text-slate-400 mb-8 max-w-2xl">
                        {persona === 'all' && "Browse the comprehensive directory of NGOs to find the right partners, services, and opportunities."}
                        {persona === 'donor' && "Identify organizations working at the intersection of causes you care about to maximize your philanthropic impact."}
                        {persona === 'ngo' && "Find partners for cross-pollination and knowledge sharing in your sector."}
                        {persona === 'volunteer' && "Find organizations close to your home and heart."}
                        {persona === 'pwd' && "Locate NGOs delivering accessible services and support systems."}
                    </p>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none backdrop-blur-sm transition-all shadow-2xl"
                            placeholder={persona === 'volunteer' ? "Search by pin code or area name..." : "Search by name, address, or keywords..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                           <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white">
                               <X size={16} />
                           </button>
                        )}
                    </div>
                </div>
             </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-20" ref={resultsTopRef}>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className={cn("lg:block", showFilters ? "block" : "hidden")}>
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sticky top-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-slate-900">Filters</h3>
                            {(selectedSectors.length > 0 || selectedDistricts.length > 0) && (
                                <button 
                                    onClick={() => {setSelectedSectors([]); setSelectedDistricts([])}}
                                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>

                        <div className="space-y-6">
                             {/* Sectors */}
                             <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">
                                    Sectors {selectedSectors.length > 0 && <span className="text-purple-600">({selectedSectors.length})</span>}
                                </label>
                                <div className="max-h-60 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                                    {allSectors.map(sector => (
                                        <label key={sector} className="flex items-start gap-2 cursor-pointer group p-1 hover:bg-slate-50 rounded">
                                            <div className="relative flex items-center mt-0.5">
                                                <input 
                                                    type="checkbox" 
                                                    className="peer h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                                                    checked={selectedSectors.includes(sector)}
                                                    onChange={() => toggleSector(sector)}
                                                />
                                            </div>
                                            <span className="text-sm text-slate-600 peer-checked:text-purple-900 peer-checked:font-medium group-hover:text-slate-900">
                                                {sector}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                             </div>

                             {/* Districts */}
                             <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">
                                    Districts {selectedDistricts.length > 0 && <span className="text-purple-600">({selectedDistricts.length})</span>}
                                </label>
                                <div className="max-h-40 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                                    {allDistricts.map(district => (
                                        <label key={district} className="flex items-center gap-2 cursor-pointer group p-1 hover:bg-slate-50 rounded">
                                            <input 
                                                type="checkbox" 
                                                className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                                                checked={selectedDistricts.includes(district)}
                                                onChange={() => toggleDistrict(district)}
                                            />
                                            <span className="text-sm text-slate-600 group-hover:text-slate-900 capitalize">
                                                {district.toLowerCase()}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Results Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <p className="text-slate-600 font-medium">
                            Showing <span className="text-slate-900 font-bold">{filteredRecords.length}</span> NGOs
                        </p>
                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                className="lg:hidden"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-4 w-4 mr-2" /> Filters
                            </Button>
                            {/* Could add sort dropdown here */}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {paginatedRecords.map(ngo => (
                            <NgoCard key={ngo.id} ngo={ngo} />
                        ))}
                        {paginatedRecords.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                                <div className="bg-slate-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="h-8 w-8 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900">No NGOs found</h3>
                                <p className="text-slate-500">Try adjusting your search or filters.</p>
                                <button 
                                    onClick={() => {setSearchQuery(''); setSelectedSectors([]); setSelectedDistricts([])}}
                                    className="mt-4 text-purple-600 font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-2"
                            >
                                <ChevronLeft className="h-4 w-4" /> Previous
                            </Button>
                            <span className="text-sm font-medium text-slate-600">
                                Page <span className="text-slate-900">{currentPage}</span> of <span className="text-slate-900">{totalPages}</span>
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2"
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}

function PersonaButton({ active, onClick, children, icon }: { active: boolean, onClick: () => void, children: React.ReactNode, icon: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                active 
                    ? "bg-white text-purple-900 shadow-lg scale-105" 
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            )}
        >
            {icon}
            {children}
        </button>
    )
}

function NgoCard({ ngo }: { ngo: Ngo }) {
    return (
        <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col md:flex-row gap-6">
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-purple-700 transition-colors line-clamp-2">
                        {ngo.name}
                    </h3>
                    {ngo.contactWebsite && (
                        <a 
                            href={ngo.contactWebsite} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-shrink-0 p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                            title="Visit Website"
                        >
                            <ArrowUpRight size={20} />
                        </a>
                    )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {ngo.primarySectors.slice(0, 4).map(sector => (
                        <span key={sector} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                            {sector}
                        </span>
                    ))}
                    {ngo.primarySectors.length > 4 && (
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-100">
                            +{ngo.primarySectors.length - 4}
                        </span>
                    )}
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{ngo.address}</span>
                    </div>
                     {ngo.darpanId && (
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="h-5 text-[10px] font-normal bg-slate-100 text-slate-500">
                                Darpan: {ngo.darpanId}
                            </Badge>
                             <Badge variant="secondary" className="h-5 text-[10px] font-normal bg-slate-100 text-slate-500">
                                {ngo.registrationType}
                            </Badge>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="md:w-48 flex-shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                 <div className="space-y-2">
                     <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Key Contact</p>
                     {ngo.officeBearers[0] ? (
                         <div>
                             <p className="font-medium text-slate-900 text-sm">{ngo.officeBearers[0].name}</p>
                             <p className="text-xs text-slate-500">{ngo.officeBearers[0].designation}</p>
                         </div>
                     ) : <span className="text-xs text-slate-400">Not available</span>}
                 </div>

                 <div className="mt-4 pt-4 border-t border-slate-50">
                     {/* Action buttons could go here */}
                     {ngo.contactEmail && ngo.contactEmail !== "—" ? (
                         <a 
                            href={`mailto:${ngo.contactEmail}`}
                            className="block w-full text-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-purple-600 transition-colors"
                        >
                             Contact
                         </a>
                     ) : (
                         <button disabled className="block w-full px-4 py-2 bg-slate-100 text-slate-400 text-sm font-medium rounded-lg cursor-not-allowed">
                             No Email
                         </button>
                     )}
                 </div>
            </div>
        </div>
    )
}
