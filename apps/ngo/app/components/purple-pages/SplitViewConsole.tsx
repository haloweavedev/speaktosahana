'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Feed } from './Feed';
import { Hero } from './Hero';

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

  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-sans">
      
      {/* Hero Section - Scrolls naturally with the page */}
      <div className="border-b border-slate-100">
        <Hero search={filters.search} setFilters={setFilters} />
      </div>

      {/* Main Content: Split View */}
      <div className="flex flex-1 items-start">
        
        {/* Left Console: Sidebar - Sticks to top when Hero is scrolled past */}
        <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0 border-r border-slate-200 bg-white">
          <div className="sticky top-0 pb-12">
            <Sidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* Right Console: Feed - Scrolls with the page */}
        <div className="flex-1 min-w-0 bg-slate-50/50">
          <div className="pb-12">
            <Feed filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>
    </div>
  );
}
