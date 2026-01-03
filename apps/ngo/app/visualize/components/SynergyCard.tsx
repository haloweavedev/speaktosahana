
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { motion } from 'framer-motion';

interface SynergyCardProps {
  data: { sector: string; count: number }[];
  zones: { name: string; count: number }[];
}

export function SynergyCard({ data, zones }: SynergyCardProps) {
  const maxVal = Math.max(...data.map(d => d.count), 1);

  return (
    <Card className="h-full border-slate-200 shadow-sm bg-white">
      <CardHeader className="pb-2 md:pb-4">
        <CardTitle className="text-base md:text-lg font-display text-slate-900">Complementary Services</CardTitle>
        <p className="text-xs md:text-sm text-slate-500">What else do disability-focused NGOs offer?</p>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {/* Bar Chart */}
        <div className="space-y-3 md:space-y-4">
          {data.map((item, index) => (
            <div key={item.sector} className="space-y-1">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="font-medium truncate pr-2 text-slate-700">{item.sector}</span>
                <span className="text-slate-500 font-mono text-[10px] md:text-xs">{item.count}</span>
              </div>
              <div className="h-1 md:h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / maxVal) * 100}%` }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Zones List */}
        <div className="pt-3 md:pt-4 border-t border-slate-100">
           <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 md:mb-3">Top Synergy Zones</h4>
           <ul className="space-y-1.5 md:space-y-2">
               {zones.map((zone, i) => (
                   <li key={zone.name} className="flex justify-between text-xs md:text-sm">
                       <span className="text-slate-700 flex items-center gap-1.5 md:gap-2">
                           <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-indigo-500"/>
                           {zone.name}
                       </span>
                       <span className="font-mono text-slate-500 text-[10px] md:text-sm">{zone.count}</span>
                   </li>
               ))}
           </ul>
        </div>
      </CardContent>
    </Card>
  );
}
