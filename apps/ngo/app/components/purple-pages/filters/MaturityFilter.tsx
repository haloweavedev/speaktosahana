'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface MaturityFilterProps {
  selected: '0-3' | '3-10' | '10+' | null;
  onChange: (value: '0-3' | '3-10' | '10+' | null) => void;
}

const OPTIONS = [
  { value: '0-3', label: 'Early-Tenure (0-3 yrs)' },
  { value: '3-10', label: 'Established (3-10 yrs)' },
  { value: '10+', label: 'Legacy (10+ yrs)' },
];

export function MaturityFilter({ selected, onChange }: MaturityFilterProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase font-heading">
        Institutional Age
      </h3>
      <div className="space-y-1">
        {OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <div 
              key={option.value} 
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 group ${isSelected ? 'bg-purple-50' : 'hover:bg-slate-50'}`}
              onClick={() => onChange(option.value as any)}
            >
               {/* Checkbox-style Radio */}
               <div className={`relative flex items-center justify-center w-5 h-5 rounded border transition-all duration-200 ${isSelected ? 'bg-purple-600 border-purple-600 shadow-sm scale-105' : 'bg-white border-slate-300 group-hover:border-purple-400'}`}>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-purple-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {option.label}
              </span>
            </div>
          );
        })}
         {selected !== null && (
            <button 
                onClick={() => onChange(null)}
                className="text-xs text-purple-600 hover:text-purple-800 underline mt-2 px-2"
            >
                Clear Selection
            </button>
        )}
      </div>
    </div>
  );
}
