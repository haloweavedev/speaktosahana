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
      <div className="flex flex-1 items-start bg-purple-50/30">
        
        {/* Left Console: Sidebar - Floating Sticky Card */}
        <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0 pl-4 pr-2 py-6">
          <div className="sticky top-6 bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
            <Sidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* Right Console: Feed */}
        <div className="flex-1 min-w-0 py-6">
          <div className="pb-12">
            <Feed filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>
    </div>
  );
}
