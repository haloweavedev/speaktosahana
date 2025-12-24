'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Heart, Building2, User, Check, Map as MapIcon } from 'lucide-react';
import { FilterState } from './SplitViewConsole';

interface HeroProps {
  search: string;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export function Hero({ search, setFilters }: HeroProps) {
  return (
    <div className="relative pt-8 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden shrink-0 min-h-[500px] flex items-center">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/purplePages-hero-bg.webp")' }}
      />
      
      {/* Glassy Overlay (No Blur) */}
      <div className="absolute inset-0 z-10 bg-[#020618]/60" />
      
      {/* Subtle Purple Gradient Glow */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#c27aff]/20 via-transparent to-transparent" />

      <div className="relative z-30 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading">
            <span className="text-[#c27aff]">purple</span>Pages
          </h1>
          <div className="flex gap-2 mt-4 md:mt-0 flex-wrap justify-center">
            <Link 
              href="/map"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 bg-white text-purple-900 shadow-[0_0_20px_rgba(194,122,255,0.4)] hover:shadow-[0_0_30px_rgba(194,122,255,0.6)] hover:scale-105"
            >
              <MapIcon className="w-4 h-4" />
              purpleNav ✨
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-white text-purple-900 shadow-lg scale-105">
              <Search className="w-4 h-4" />
              Explore
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-white/10 text-white hover:bg-white/20 border border-white/10">
              <Heart className="w-4 h-4" />
              Donors
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-white/10 text-white hover:bg-white/20 border border-white/10">
              <Building2 className="w-4 h-4" />
              NGOs
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-white/10 text-white hover:bg-white/20 border border-white/10">
              <User className="w-4 h-4" />
              Volunteers
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-white/10 text-white hover:bg-white/20 border border-white/10">
              <Check className="w-4 h-4" />
              Access
            </button>
          </div>
        </div>
        
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight font-heading">
            Discover Impact.
          </h2>
          <p className="text-lg text-slate-200 mb-10 max-w-2xl font-manrope font-light leading-relaxed">
            Browse the comprehensive directory of NGOs to find the right partners, services, and opportunities. 
            Connecting <span className="text-[#c27aff] font-semibold">1,300+</span> grassroots organizations.
          </p>
          
          <div className="relative group max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#c27aff] transition-colors" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-12 pr-4 py-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-[#c27aff]/50 focus:border-[#c27aff]/50 focus:outline-none transition-all shadow-2xl text-lg font-light" 
              placeholder="Search by name, address, or keywords..." 
              value={search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}