
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';

interface SectorChartProps {
  data: { name: string; value: number }[];
}

export function SectorChart({ data }: SectorChartProps) {
  const maxVal = Math.max(...data.map(d => d.value));

  return (
    <Card className="h-full border-border/60 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-display">Impact Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">Primary sectors of intervention</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {data.map((item, index) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium truncate pr-2 text-foreground/80">{item.name}</span>
                <span className="text-muted-foreground font-mono text-xs">{item.value}</span>
              </div>
              <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
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
