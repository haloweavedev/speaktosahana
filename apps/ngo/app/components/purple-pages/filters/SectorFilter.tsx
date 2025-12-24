'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@repo/ui/src/components/ui/input';
import { Search, Check } from 'lucide-react';
import { getSectors } from '../../../actions/getSectors';

interface SectorFilterProps {
  selected: string[];
  onChange: (sectors: string[]) => void;
}

export function SectorFilter({ selected, onChange }: SectorFilterProps) {
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
      onChange(selected.filter(s => s !== sector));
    } else {
      onChange([...selected, sector]);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase font-heading">
          Focus Areas
        </h3>
      </div>

      <div className="relative group">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
        <Input 
          placeholder="Search sectors..." 
          className="pl-9 h-10 text-sm bg-white border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="h-64 overflow-y-auto space-y-1 pr-2 no-scrollbar">
        {filteredSectors.map(sector => {
          const isSelected = selected.includes(sector);
          return (
            <div 
              key={sector} 
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 group ${isSelected ? 'bg-purple-50' : 'hover:bg-slate-50'}`}
              onClick={() => toggleSector(sector)}
            >
              {/* Stunning Checkbox */}
              <div className={`relative flex items-center justify-center w-5 h-5 rounded border transition-all duration-200 ${isSelected ? 'bg-purple-600 border-purple-600 shadow-sm scale-105' : 'bg-white border-slate-300 group-hover:border-purple-400'}`}>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
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
