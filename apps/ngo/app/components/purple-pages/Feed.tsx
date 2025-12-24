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
}

export function Feed({ filters }: FeedProps) {
  const [ngos, setNgos] = useState<SerializedNgo[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
         setTotalPages(res.meta.totalPages);
         setLoading(false);
         // Scroll to top of feed on page change
         // window.scrollTo({ top: 0, behavior: 'smooth' }); // This might scroll the wrong container
         // Ideally, scroll the parent container of Feed.
     }).catch(err => {
         console.error(err);
         setLoading(false);
     });
  }, [filters, page]);

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto relative">
      {loading ? (
        <div className="space-y-4">
             {[1, 2, 3].map(i => (
                 <div key={i} className="h-48 rounded-xl bg-gray-100 animate-pulse" />
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

      {/* Floating Counter */}
      <div className="fixed bottom-8 right-8 z-50 bg-slate-900/90 text-white px-5 py-3 rounded-full shadow-2xl backdrop-blur-sm border border-slate-700 animate-in fade-in slide-in-from-bottom-8 flex items-center gap-2 pointer-events-none">
         <span className="font-bold text-purple-400">{total}</span>
         <span className="text-sm font-medium">NGOs found</span>
      </div>
    </div>
  );
}