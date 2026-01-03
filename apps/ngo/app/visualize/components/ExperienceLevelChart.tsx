
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@repo/ui';
import { motion } from 'framer-motion';

interface ExperienceLevelChartProps {
  data: {
    new: number;       // < 3 years
    established: number; // 3-10 years
    veteran: number;   // > 10 years
  };
  total: number;
}

export function ExperienceLevelChart({ data, total }: ExperienceLevelChartProps) {
  const categories = [
    { label: 'New (<3 Years)', value: data.new, color: '#a855f7', desc: 'Emerging initiatives & startups' },
    { label: 'Established (3-10 Years)', value: data.established, color: '#c084fc', desc: 'Stable operations' },
    { label: 'Veteran (>10 Years)', value: data.veteran, color: '#e9d5ff', desc: 'Deep roots & legacy' },
  ];

  const maxVal = Math.max(data.new, data.established, data.veteran);

  return (
    <Card className="h-full border-slate-200 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-display text-slate-900">Experience Demographics</CardTitle>
        <CardDescription className="text-slate-500">Breakdown by Operational Age</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
            {categories.map((cat, i) => {
                const pct = ((cat.value / total) * 100).toFixed(1);
                return (
                    <div key={cat.label} className="space-y-1">
                        <div className="flex justify-between items-end text-sm">
                            <span className="font-medium text-slate-700">{cat.label}</span>
                            <span className="font-mono text-slate-500 text-xs">{cat.value} ({pct}%)</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full"
                                style={{ backgroundColor: cat.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                            />
                        </div>
                        <p className="text-[10px] text-slate-400">{cat.desc}</p>
                    </div>
                )
            })}

            <div className="pt-4 border-t border-slate-100 mt-4">
                 <p className="text-xs text-slate-500 italic">
                    <span className="font-bold text-purple-600">Insight:</span> {((data.veteran/total)*100).toFixed(0)}% of disability service providers have 10+ years of experience in the community.
                 </p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
