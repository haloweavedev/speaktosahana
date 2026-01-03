
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';

interface SectorChartProps {
  data: { name: string; value: number }[];
}

export function SectorChart({ data }: SectorChartProps) {
  const maxVal = Math.max(...data.map(d => d.value));

  return (
    <Card className="h-full border-slate-200 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-display text-slate-900">Primary Focus Areas</CardTitle>
        <p className="text-sm text-slate-500">Core sectors alongside disability services</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {data.map((item, index) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium truncate pr-2 text-slate-700">{item.name}</span>
                <span className="text-slate-500 font-mono text-xs">{item.value}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / maxVal) * 100}%` }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
