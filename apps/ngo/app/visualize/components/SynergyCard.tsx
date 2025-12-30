
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
    <Card className="h-full border-border/60 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-display">Cross-Sector Synergy</CardTitle>
        <p className="text-sm text-muted-foreground">Intersections with "Differently Abled"</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bar Chart */}
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.sector} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium truncate pr-2 text-foreground/80">{item.sector}</span>
                <span className="text-muted-foreground font-mono text-xs">{item.count}</span>
              </div>
              <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-indigo-500" // Different color for Synergy
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / maxVal) * 100}%` }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Zones List */}
        <div className="pt-4 border-t border-border/40">
           <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Top Synergy Zones</h4>
           <ul className="space-y-2">
               {zones.map((zone, i) => (
                   <li key={zone.name} className="flex justify-between text-sm">
                       <span className="text-slate-700 flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"/>
                           {zone.name}
                       </span>
                       <span className="font-mono text-muted-foreground">{zone.count}</span>
                   </li>
               ))}
           </ul>
        </div>
      </CardContent>
    </Card>
  );
}
