
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
    { label: 'New (<3 Years)', value: data.new, color: 'var(--color-primary)', desc: 'Emerging initiatives & startups' },
    { label: 'Established (3-10 Years)', value: data.established, color: 'hsl(var(--primary) / 0.6)', desc: 'Stable operations' },
    { label: 'Veteran (>10 Years)', value: data.veteran, color: 'hsl(var(--primary) / 0.3)', desc: 'Deep roots & legacy' },
  ];

  const maxVal = Math.max(data.new, data.established, data.veteran);

  return (
    <Card className="h-full border-border/60 shadow-none bg-gradient-to-b from-transparent to-primary/5">
      <CardHeader>
        <CardTitle className="text-lg font-display">Experience Demographics</CardTitle>
        <CardDescription>Breakdown by Operational Age</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
            {categories.map((cat, i) => {
                const pct = ((cat.value / total) * 100).toFixed(1);
                return (
                    <div key={cat.label} className="space-y-1">
                        <div className="flex justify-between items-end text-sm">
                            <span className="font-medium text-foreground">{cat.label}</span>
                            <span className="font-mono text-muted-foreground text-xs">{cat.value} ({pct}%)</span>
                        </div>
                        <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full"
                                style={{ backgroundColor: cat.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                            />
                        </div>
                        <p className="text-[10px] text-muted-foreground">{cat.desc}</p>
                    </div>
                )
            })}
            
            <div className="pt-4 border-t border-border/40 mt-4">
                 <p className="text-xs text-muted-foreground italic">
                    <span className="font-bold text-primary">Insight:</span> The recent surge in new registrations means {((data.new/total)*100).toFixed(0)}% of the ecosystem is in the startup phase.
                 </p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
