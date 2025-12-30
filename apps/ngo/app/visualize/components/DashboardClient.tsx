
'use client';

import dynamic from 'next/dynamic';
import { MetricCard } from './MetricCard';
import { SectorChart } from './SectorChart';
import { SynergyCard } from './SynergyCard';
import { TrustTrendChart } from './TrustTrendChart';
import { Globe, ShieldCheck, Database, MapPin } from 'lucide-react';
import type { AnalyticsData } from '../../actions/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';

const MapVisualizer = dynamic(() => import('./MapVisualizer'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-muted/20 rounded-xl animate-pulse border border-border/50">
      <p className="text-muted-foreground font-medium">Loading Geospatial Intelligence...</p>
    </div>
  ),
});

interface DashboardClientProps {
  data: AnalyticsData;
}

export function DashboardClient({ data }: DashboardClientProps) {
  return (
    <div className="container mx-auto py-10 space-y-10 px-4 md:px-6">
      <div className="flex flex-col space-y-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-foreground">
          PurplePages <span className="text-primary">Intelligence</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The operating system for the social sector. visualizing the <span className="text-foreground font-semibold">Synergy Graph</span> connecting 
          capital, volunteers, and services across the region.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Verified Partners"
          value={data.totalCount.toLocaleString()}
          icon={Database}
          description="Legally verified entities"
          className="border-primary/20 bg-primary/5"
        />
        <MetricCard
          title="Active Neighborhoods"
          value={data.districtsCount}
          icon={MapPin}
          description="Hyper-local presence"
        />
        <MetricCard
          title="Established Partners"
          value={`${data.trustIndex.toFixed(0)}%`}
          icon={ShieldCheck}
          description="Operational > 3 Years"
        />
        <MetricCard
          title="Cause Areas"
          value={data.sectorDistribution.length + "+"} 
          icon={Globe}
          description="Diverse impact sectors"
        />
      </div>

      {/* Map & Top Areas Row */}
      <div className="grid gap-6 lg:grid-cols-3 h-full">
        <div className="lg:col-span-2 min-h-[500px] rounded-2xl overflow-hidden border border-border shadow-sm">
          <MapVisualizer points={data.mapPoints} topAreas={data.topAreas} />
        </div>
        
        {/* Top 10 Areas List */}
        <div className="lg:col-span-1 h-full">
            <Card className="h-full border-border/60 shadow-none flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-display">High Density Zones</CardTitle>
                <p className="text-sm text-muted-foreground">Top 10 NGO Hubs in Bengaluru</p>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pr-2">
                 <div className="space-y-3">
                   {data.topAreas.map((area, i) => (
                       <div key={area.pincode} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-secondary hover:bg-secondary/50 transition-colors">
                           <div className="flex items-center gap-3">
                               <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-primary text-xs font-bold shadow-sm">
                                   {i + 1}
                               </div>
                               <div>
                                   <p className="font-medium text-sm text-foreground">{area.name}</p>
                                   <p className="text-xs text-muted-foreground font-mono">{area.pincode}</p>
                               </div>
                           </div>
                           <span className="font-bold text-lg text-primary/80">{area.count}</span>
                       </div>
                   ))}
                 </div>
              </CardContent>
            </Card>
        </div>
      </div>

      {/* Deep Dive Row: Sectors, Synergy, Trends */}
      <div className="grid gap-6 lg:grid-cols-3">
         <SectorChart data={data.sectorDistribution} />
         <SynergyCard data={data.synergy.pairs} zones={data.synergy.topZones} />
         <TrustTrendChart data={data.registrationTrend} />
      </div>
    </div>
  );
}
