'use client';

import React from 'react';
import { Badge } from '@repo/ui/src/components/ui/badge';
import { Button } from '@repo/ui/src/components/ui/button';
import { MapPin, Globe, Building2, Mail, Calendar } from 'lucide-react';

interface NgoCardProps {
  ngo: any; // Using explicit any for now as we know the shape from action
}

export function NgoCard({ ngo }: NgoCardProps) {
  const regDate = ngo.registrationDate ? new Date(ngo.registrationDate) : null;
  const age = regDate ? new Date().getFullYear() - regDate.getFullYear() : null;
  const sectors = ngo.primarySectors || [];

  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300 p-6 flex flex-col gap-5">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-heading tracking-tight mb-2 group-hover:text-purple-brand transition-colors">
            {ngo.name}
          </h3>
          
          <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {ngo.typeOfNPO || ngo.registrationType || "Organization"}
            </span>
            {age !== null && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {age} YRS
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start gap-3 text-slate-600">
        <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-sm leading-relaxed font-manrope">
          {ngo.address || `${ngo.operationalDistrict}, ${ngo.state}`}
        </p>
      </div>

      {/* Sectors */}
      <div className="flex flex-wrap gap-2">
        {sectors.slice(0, 5).map((sector: string) => (
          <span 
            key={sector} 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100/50"
          >
            {sector}
          </span>
        ))}
        {sectors.length > 5 && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-slate-500 bg-slate-50 border border-slate-100">
            +{sectors.length - 5} more
          </span>
        )}
      </div>

      {/* Footer: Contacts */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-50 mt-auto">
        {ngo.email && (
           <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mr-auto">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="truncate max-w-[200px]">{ngo.email}</span>
           </div>
        )}

        {ngo.website && (
          <Button size="sm" variant="outline" className="h-9 px-4 text-xs font-semibold gap-2 ml-auto rounded-full border-slate-200 hover:border-purple-brand hover:text-purple-brand hover:bg-purple-50 transition-all" asChild>
            <a href={ngo.website} target="_blank" rel="noopener noreferrer">
              <Globe className="w-3.5 h-3.5" />
              Visit Website
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
