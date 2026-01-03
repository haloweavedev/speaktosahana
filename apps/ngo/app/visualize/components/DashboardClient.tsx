
'use client';

import dynamic from 'next/dynamic';
import { MetricCard } from './MetricCard';
import { PwDFactsCard } from './PwDFactsCard';
import { SynergyCard } from './SynergyCard';
import { TrustTrendChart } from './TrustTrendChart';
import { ExperienceLevelChart } from './ExperienceLevelChart';
import { ShieldCheck, MapPin, Users } from 'lucide-react';
import type { AnalyticsData } from '../../actions/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';

const MapVisualizer = dynamic(() => import('./MapVisualizer'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-slate-50 rounded-xl animate-pulse border border-slate-200">
      <p className="text-slate-500 font-medium">Loading Geospatial Intelligence...</p>
    </div>
  ),
});

interface DashboardClientProps {
  data: AnalyticsData;
}

export function DashboardClient({ data }: DashboardClientProps) {
  return (
    <div className="container mx-auto py-6 md:py-10 space-y-6 md:space-y-10 px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-col space-y-3 md:space-y-4 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-900">
          <span className="text-[#c27aff]">purple</span>Pages Intelligence
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">
          Bengaluru&apos;s comprehensive directory of <span className="text-purple-600 font-semibold">Differently Abled</span> service providers.
          Mapping the ecosystem of care, education, and empowerment.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Disability Service Providers"
          value={data.totalCount.toLocaleString()}
          icon={Users}
          description="NGOs serving the Differently Abled"
          className="border-purple-200 bg-purple-50"
        />
        <MetricCard
          title="Neighborhoods Covered"
          value={data.districtsCount}
          icon={MapPin}
          description="Pincodes with active services"
        />
        <MetricCard
          title="Established Organizations"
          value={`${data.trustIndex.toFixed(0)}%`}
          icon={ShieldCheck}
          description="Operational > 3 Years"
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>

      {/* Map & Top Areas Row */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 min-h-[350px] md:min-h-[500px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
          <MapVisualizer densityZones={data.densityZones} maxDensity={data.maxDensity} />
        </div>

        {/* Top 10 Areas List */}
        <div className="lg:col-span-1">
            <Card className="h-full max-h-[400px] lg:max-h-[500px] border-slate-200 shadow-none flex flex-col bg-white">
              <CardHeader className="pb-2 md:pb-4">
                <CardTitle className="text-base md:text-lg font-display text-slate-900">Service Hotspots</CardTitle>
                <p className="text-xs md:text-sm text-slate-500">Top 10 areas for disability services</p>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pr-2">
                 <div className="space-y-2 md:space-y-3">
                   {data.topAreas.map((area, i) => (
                       <div key={area.pincode} className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                           <div className="flex items-center gap-2 md:gap-3">
                               <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-purple-100 text-purple-700 text-[10px] md:text-xs font-bold">
                                   {i + 1}
                               </div>
                               <div>
                                   <p className="font-medium text-xs md:text-sm text-slate-900">{area.name}</p>
                                   <p className="text-[10px] md:text-xs text-slate-500 font-mono">{area.pincode}</p>
                               </div>
                           </div>
                           <span className="font-bold text-base md:text-lg text-purple-600">{area.count}</span>
                       </div>
                   ))}
                 </div>
              </CardContent>
            </Card>
        </div>
      </div>

      {/* Demographics & Trends Row */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
         <ExperienceLevelChart data={data.ageDemographics} total={data.totalCount} />
         <TrustTrendChart data={data.registrationTrend} />
      </div>

      {/* Insights Row: PwD Facts & Synergy */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
         <PwDFactsCard />
         <SynergyCard data={data.synergy.pairs} zones={data.synergy.topZones} />
      </div>
    </div>
  );
}
