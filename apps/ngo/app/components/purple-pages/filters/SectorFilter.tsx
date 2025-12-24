'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@repo/ui/src/components/ui/input';
import { Search } from 'lucide-react';
import { getSectors } from '../../../actions/getSectors';

interface SectorFilterProps {
  selected: string[];
  intersect: boolean;
  onChange: (sectors: string[], intersect: boolean) => void;
}

export function SectorFilter({ selected, intersect, onChange }: SectorFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [allSectors, setAllSectors] = useState<string[]>([]);

  useEffect(() => {
    getSectors().then(setAllSectors);
  }, []);

  const filteredSectors = allSectors.filter(sector => 
    sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSector = (sector: string) => {
    if (selected.includes(sector)) {
      onChange(selected.filter(s => s !== sector), intersect);
    } else {
      onChange([...selected, sector], intersect);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase font-heading">
          Focus Areas
        </h3>
        
        {/* Intersection Toggle - Sleek Switch */}
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => onChange(selected, !intersect)}>
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${intersect ? 'text-purple-brand' : 'text-slate-400'}`}>Intersection</span>
            <div className={`relative w-9 h-5 rounded-full transition-all duration-300 ${intersect ? 'bg-purple-brand shadow-inner' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${intersect ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-purple-brand transition-colors" />
        <Input 
          placeholder="Search sectors..." 
          className="pl-9 h-10 text-sm bg-white border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-brand/20 focus:border-purple-brand transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="h-64 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
        {filteredSectors.map(sector => {
          const isSelected = selected.includes(sector);
          return (
            <div 
              key={sector} 
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 group ${isSelected ? 'bg-purple-50' : 'hover:bg-slate-50'}`}
              onClick={() => toggleSector(sector)}
            >
              {/* Stunning Checkbox */}
              <div className={`relative flex items-center justify-center w-5 h-5 rounded border transition-all duration-200 ${isSelected ? 'bg-purple-brand border-purple-brand shadow-sm scale-105' : 'bg-white border-slate-300 group-hover:border-purple-400'}`}>
                {isSelected && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-white">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              
              <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-purple-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {sector}
              </span>
            </div>
          );
        })}
        {filteredSectors.length === 0 && (
            <div className="py-4 text-center">
               <p className="text-xs text-slate-400 italic">No sectors found matching "{searchTerm}"</p>
            </div>
        )}
      </div>
    </div>
  );
}