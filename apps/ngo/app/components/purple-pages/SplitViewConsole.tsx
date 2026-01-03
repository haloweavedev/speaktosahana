'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Feed } from './Feed';
import { Hero } from './Hero';
import { Menu, X, Map as MapIcon, SlidersHorizontal, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export type FilterState = {
  search: string;
  sectors: string[];
  maturity: '0-3' | '3-10' | '10+' | null;
  legalEntities: string[];
};

export function SplitViewConsole() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    sectors: [],
    maturity: null,
    legalEntities: [],
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const hasActiveFilters = filters.sectors.length > 0 || filters.maturity !== null || filters.legalEntities.length > 0;

  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-sans relative">
      
      {/* Hero Section - Scrolls naturally with the page */}
      <div className="border-b border-slate-100">
        <Hero search={filters.search} setFilters={setFilters} />
      </div>

      {/* Main Content: Split View */}
      <div className="flex flex-1 items-start bg-purple-50/30 p-6 gap-6">
        
        {/* Left Console: Sidebar - Floating Sticky Card (Desktop) */}
        <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0">
          <div className="sticky top-6 bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
            <Sidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* Right Console: Feed */}
        <div className="flex-1 min-w-0 pb-24 lg:pb-12">
          <Feed 
            filters={filters} 
            setFilters={setFilters} 
            onTotalChange={setTotalResults}
          />
        </div>
      </div>

      {/* Mobile Floating Pill Console */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-40 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-xl text-white rounded-full shadow-2xl shadow-purple-900/20 border border-white/10 flex items-center justify-between p-1 w-full max-w-md mx-auto">
            
            {/* Left: Filters */}
            <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
            >
                <SlidersHorizontal className="w-4 h-4 text-purple-300" />
                <span className="text-xs font-semibold tracking-wide">Filters</span>
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-white/20" />

            {/* Center: Count */}
            <div className="flex-1 text-center min-w-0 px-1 flex flex-col justify-center">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none">Found</p>
                <p className="text-sm font-bold text-white leading-none mt-0.5 truncate">{totalResults}</p>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/20" />

            {/* Insights (Icon Only) */}
            <Link
                href="/visualize"
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors shrink-0"
                aria-label="Insights"
            >
                <BarChart2 className="w-5 h-5 text-purple-300" />
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-white/20" />

            {/* Right: Map */}
            <Link
                href="/map"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 active:bg-purple-700 transition-colors shadow-lg shadow-purple-900/50 shrink-0 ml-1"
            >
                <MapIcon className="w-4 h-4 text-white" />
                <span className="text-xs font-bold">Map</span>
            </Link>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-200">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold font-heading text-slate-900">Filters</h2>
              {hasActiveFilters && (
                <button 
                    onClick={() => setFilters(prev => ({ ...prev, sectors: [], maturity: null, legalEntities: [] }))}
                    className="text-xs font-bold uppercase tracking-wider text-purple-600 hover:text-purple-800 transition-colors px-2 py-1 bg-purple-50 hover:bg-purple-100 rounded-md"
                >
                    Reset
                </button>
              )}
            </div>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="p-2 -mr-2 text-slate-500 hover:text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content (Sidebar) */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
             <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <Sidebar filters={filters} setFilters={setFilters} hideHeader={true} />
             </div>
          </div>
          
          {/* Apply Button Footer (Optional, closes modal) */}
          <div className="p-6 border-t border-slate-100 bg-white shrink-0">
            <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-600/20 active:scale-95 transition-transform"
            >
                Show Results
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
