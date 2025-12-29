'use client';

import React, { useEffect, useState } from 'react';
import { FilterState } from './SplitViewConsole';
import { NgoCard } from './cards/NgoCard';
import { Pagination } from './Pagination';
import { getNgos } from '../../actions/getNgos';

type SerializedNgo = Awaited<ReturnType<typeof getNgos>>['data'][0];

interface FeedProps {
  filters: FilterState;
  setFilters?: React.Dispatch<React.SetStateAction<FilterState>>; // Optional for now
  onTotalChange?: (total: number) => void;
}

function NgoCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 animate-pulse">
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-7 bg-slate-200 rounded-md w-3/4" />
          <div className="h-8 w-8 bg-slate-200 rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-slate-100 rounded-full" />
          <div className="h-6 w-32 bg-slate-100 rounded-full" />
          <div className="h-6 w-20 bg-slate-100 rounded-full" />
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-4 w-1/2 bg-slate-100 rounded" />
          <div className="flex gap-2">
            <div className="h-5 w-24 bg-slate-100 rounded" />
            <div className="h-5 w-16 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
      <div className="md:w-48 border-l border-slate-100 pl-6 flex flex-col justify-between">
        <div className="space-y-2">
           <div className="h-3 w-20 bg-slate-100 rounded" />
           <div className="h-4 w-32 bg-slate-200 rounded" />
           <div className="h-3 w-24 bg-slate-100 rounded" />
        </div>
        <div className="mt-4 pt-4 border-t border-slate-50">
           <div className="h-9 w-full bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function Feed({ filters, onTotalChange }: FeedProps) {
  const [ngos, setNgos] = useState<SerializedNgo[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // ... rest of logic

  useEffect(() => {
     setPage(1); // Reset to first page when filters change
  }, [filters]);

  useEffect(() => {
     setLoading(true);
     getNgos({
         page: page,
         limit: 20,
         search: filters.search,
         sectors: filters.sectors,
         maturity: filters.maturity,
         legalEntities: filters.legalEntities
     }).then(res => {
         setNgos(res.data);
         setTotal(res.meta.total);
         if (onTotalChange) onTotalChange(res.meta.total);
         setTotalPages(res.meta.totalPages);
         setLoading(false);
     }).catch(err => {
         console.error(err);
         setLoading(false);
     });
  }, [filters, page]);

  return (
    <div className="max-w-5xl mx-auto relative">
      {loading ? (
        <div className="space-y-4">
             {[1, 2, 3, 4, 5].map(i => (
                 <NgoCardSkeleton key={i} />
             ))}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {ngos.map((ngo) => (
              <NgoCard key={ngo.id} ngo={ngo} />
            ))}
            {ngos.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-2xl">
                <p className="text-gray-500 italic">No NGOs found matching your criteria.</p>
                <p className="text-xs text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
          
          <Pagination 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Floating Counter - Desktop Only */}
      <div className="hidden lg:flex fixed bottom-8 right-8 z-50 bg-slate-900/90 text-white px-5 py-3 rounded-full shadow-2xl backdrop-blur-sm border border-slate-700 animate-in fade-in slide-in-from-bottom-8 items-center gap-2 pointer-events-none">
         <span className="font-bold text-purple-400">{total}</span>
         <span className="text-sm font-medium">NGOs found</span>
      </div>
    </div>
  );
}