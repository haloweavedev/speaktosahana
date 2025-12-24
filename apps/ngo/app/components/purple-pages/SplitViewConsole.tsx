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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-white font-sans">
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto flex flex-col no-scrollbar">
        
        {/* Hero Section */}
        <Hero search={filters.search} setFilters={setFilters} />

        {/* Main Content: Split View */}
        <div className="flex flex-1 min-h-0">
          
          {/* Left Console: Sticky Sidebar (30%) */}
          <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0 sticky top-0 h-screen border-r border-slate-100 bg-white">
             <div className="h-full overflow-y-auto no-scrollbar pb-20">
                <Sidebar filters={filters} setFilters={setFilters} />
             </div>
          </div>

          {/* Right Console: Feed (70%) */}
          <div className="flex-1 min-w-0 bg-white">
            <Feed filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>
    </div>
  );
}
