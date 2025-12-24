'use client';

import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { getLegalTypes } from '../../../actions/getLegalTypes';

interface LegalFilterProps {
  selected: string[];
  onChange: (values: string[]) => void;
}

export function LegalFilter({ selected, onChange }: LegalFilterProps) {
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        getLegalTypes().then(setOptions);
    }, []);

    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
            onChange(selected.filter(s => s !== option));
        } else {
            onChange([...selected, option]);
        }
    };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase font-heading">
        Legal Structure
      </h3>
      <div className="space-y-1 max-h-56 overflow-y-auto pr-2 no-scrollbar">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <div 
              key={option} 
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 group ${isSelected ? 'bg-purple-50' : 'hover:bg-slate-50'}`}
              onClick={() => toggleOption(option)}
            >
               {/* Stunning Checkbox */}
               <div className={`relative flex items-center justify-center w-5 h-5 rounded border transition-all duration-200 ${isSelected ? 'bg-purple-600 border-purple-600 shadow-sm scale-105' : 'bg-white border-slate-300 group-hover:border-purple-400'}`}>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-purple-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {option}
              </span>
            </div>
          );
        })}
        {options.length === 0 && (
             <div className="py-2">
                <p className="text-xs text-slate-400 italic">No types available.</p>
             </div>
        )}
      </div>
    </div>
  );
}