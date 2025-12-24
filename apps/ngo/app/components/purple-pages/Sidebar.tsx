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
    <div className="flex flex-col h-full p-6 space-y-8">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 font-heading">
              Filters
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Refine your search results.
            </p>
        </div>
        
        {hasActiveFilters && (
            <button 
                onClick={() => setFilters(prev => ({ ...prev, sectors: [], maturity: null, legalEntities: [] }))}
                className="text-[10px] font-bold uppercase tracking-wider text-purple-600 hover:text-purple-800 transition-colors px-2 py-1 bg-purple-50 hover:bg-purple-100 rounded-md"
            >
                Reset
            </button>
        )}
      </div>

      <div className="space-y-8">
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
    </div>
  );
}
