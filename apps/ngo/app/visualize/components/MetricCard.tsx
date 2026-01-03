
'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { cn } from '@repo/ui';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricCard({ title, value, description, icon: Icon, className }: MetricCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-white border-slate-200 shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        <Icon className="h-4 w-4 text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {description && (
          <p className="text-xs text-slate-500 mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
