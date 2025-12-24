'use client';

import React, { useState, useEffect } from 'react';
import { FilterState } from './SplitViewConsole';
import { SectorFilter } from './filters/SectorFilter';
import { MaturityFilter } from './filters/MaturityFilter';
import { LegalFilter } from './filters/LegalFilter';

interface SidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export function Sidebar({ filters, setFilters }: SidebarProps) {
  const hasActiveFilters = filters.sectors.length > 0 || filters.maturity !== null || filters.legalEntities.length > 0;

  return (
    <div className="flex flex-col h-full p-8 space-y-10">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 font-heading">
            Filter Results
            </h2>
            <p className="text-sm text-slate-500 font-medium">
            Refine by sector, maturity, and structure.
            </p>
        </div>
        
        {hasActiveFilters && (
            <button 
                onClick={() => setFilters(prev => ({ ...prev, sectors: [], maturity: null, legalEntities: [] }))}
                className="text-xs font-medium text-slate-400 hover:text-purple-600 transition-colors px-2 py-1 hover:bg-purple-50 rounded"
            >
                Reset
            </button>
        )}
      </div>

      {/* Filter 1: Sector Intersections */}
      <section>
        <SectorFilter 
          selected={filters.sectors}
          onChange={(sectors) => 
            setFilters(prev => ({ ...prev, sectors }))
          }
        />
      </section>

      {/* Filter 2: Maturity Index */}
      <section>
        <MaturityFilter 
          selected={filters.maturity}
          onChange={(maturity) => 
            setFilters(prev => ({ ...prev, maturity }))
          }
        />
      </section>

      {/* Filter 3: Legal Entity */}
      <section>
        <LegalFilter 
          selected={filters.legalEntities}
          onChange={(legalEntities) => 
            setFilters(prev => ({ ...prev, legalEntities }))
          }
        />
      </section>
    </div>
  );
}
