'use server';

import prisma from '@repo/db';
import { getAreaName } from '../../lib/bengaluru-pincodes';

export type AnalyticsData = {
  totalCount: number;
  geocodedCount: number;
  districtsCount: number;
  topAreas: { 
      name: string; 
      count: number; 
      pincode: string;
      lat?: number;
      lng?: number;
  }[];
  synergy: {
      pairs: { sector: string; count: number }[];
      topZones: { name: string; count: number }[];
  };
  trustIndex: number; 
  sectorDistribution: { name: string; value: number }[];
  registrationTrend: { year: number; count: number }[];
  mapPoints: {
    id: string;
    lat: number;
    lng: number;
    name: string;
    sector: string;
    pincode?: string;
  }[];
  digitalStats: {
      emailCount: number;
      mobileCount: number;
      websiteCount: number;
  };
  ageDemographics: {
      new: number; // < 3 years
      established: number; // 3-10 years
      veteran: number; // > 10 years
  };
};

export async function getAnalyticsData(): Promise<AnalyticsData> {
  const [totalCount, geocodedCount, allNgos] = await Promise.all([
    prisma.ngo.count(),
    prisma.ngo.count({
      where: {
        latitude: { not: null },
        longitude: { not: null },
      },
    }),
    prisma.ngo.findMany({
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        district: true,
        pincode: true,
        primarySectors: true,
        secondarySectors: true,
        registrationDate: true,
        dateOfRegistration: true,
        email: true,
        mobile: true,
        website: true,
      },
    }),
  ]);

  const sectorCounts: Record<string, number> = {};
  const yearCounts: Record<number, number> = {};
  const pincodeCounts: Record<string, number> = {};
  const pincodeCoords: Record<string, { latSum: number; lngSum: number; count: number }> = {};
  const districts = new Set<string>();
  
  // Synergy Tracking
  const synergyCounts: Record<string, number> = {};
  const synergyZoneCounts: Record<string, number> = {}; // Pincode -> Synergy Count

  let oldNgos = 0;
  const now = new Date();
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(now.getFullYear() - 3);
  
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(now.getFullYear() - 10);

  const digitalStats = { emailCount: 0, mobileCount: 0, websiteCount: 0 };
  const ageDemographics = { new: 0, established: 0, veteran: 0 };

  const mapPoints: AnalyticsData['mapPoints'] = [];

  allNgos.forEach((ngo) => {
    // Digital Stats
    if (ngo.email) digitalStats.emailCount++;
    if (ngo.mobile) digitalStats.mobileCount++;
    if (ngo.website) digitalStats.websiteCount++;

    const sectors = [...(ngo.primarySectors || []), ...(ngo.secondarySectors || [])];
    const uniqueSectors = Array.from(new Set(sectors));
    const pincode = ngo.pincode ? ngo.pincode.trim() : null;

    // 0. Pincode Clustering
    if (pincode) {
        pincodeCounts[pincode] = (pincodeCounts[pincode] || 0) + 1;
        districts.add(pincode);
        
        // Accumulate coords
        if (ngo.latitude && ngo.longitude) {
           const lat = Number(ngo.latitude);
           const lng = Number(ngo.longitude);
           if (!isNaN(lat) && !isNaN(lng)) {
               if (!pincodeCoords[pincode]) {
                   pincodeCoords[pincode] = { latSum: 0, lngSum: 0, count: 0 };
               }
               pincodeCoords[pincode].latSum += lat;
               pincodeCoords[pincode].lngSum += lng;
               pincodeCoords[pincode].count += 1;
           }
        }
    }

    // 1. Sectors & Synergy
    const hasDiffAbled = uniqueSectors.some(s => s.toLowerCase().includes('differently abled') || s.toLowerCase().includes('disability'));
    
    uniqueSectors.forEach((sector) => {
        // General Sector Dist (Use primary only or all? Usually primary for "Sector Distribution" chart to avoid double counting per NGO too much, but user wants "Impact Distribution". Let's use Primary for the main chart as before.)
    });
    
    // Use Primary for the Main Chart
    if (ngo.primarySectors) {
        ngo.primarySectors.forEach(s => {
             sectorCounts[s] = (sectorCounts[s] || 0) + 1;
        });
    }

    // Synergy Logic: If has "Differently Abled", what else does it have?
    if (hasDiffAbled) {
        uniqueSectors.forEach(other => {
            if (!other.toLowerCase().includes('differently abled') && !other.toLowerCase().includes('disability')) {
                synergyCounts[other] = (synergyCounts[other] || 0) + 1;
                
                // Track where this synergy happens
                if (pincode) {
                    synergyZoneCounts[pincode] = (synergyZoneCounts[pincode] || 0) + 1;
                }
            }
        });
    }

    // 2. Dates & Demographics
    const regDate = ngo.registrationDate || ngo.dateOfRegistration;
    if (regDate) {
      const date = new Date(regDate);
      if (date < threeYearsAgo) {
        oldNgos++;
      }
      
      // Age Demographics
      if (date > threeYearsAgo) {
          ageDemographics.new++;
      } else if (date > tenYearsAgo) {
          ageDemographics.established++;
      } else {
          ageDemographics.veteran++;
      }

      const year = date.getFullYear();
      if (year > 1900 && year <= new Date().getFullYear()) {
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      }
    }

    // 3. Map Points
    if (ngo.latitude && ngo.longitude) {
       const lat = Number(ngo.latitude);
       const lng = Number(ngo.longitude);
       if (!isNaN(lat) && !isNaN(lng)) {
          mapPoints.push({
            id: ngo.id,
            lat,
            lng,
            name: ngo.name,
            sector: ngo.primarySectors?.[0] || 'General',
            pincode: pincode || undefined
          });
       }
    }
  });

  // Top Areas (Increased to 10)
  const topAreas = Object.entries(pincodeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([pincode, count]) => {
        const coords = pincodeCoords[pincode];
        return {
            name: getAreaName(pincode),
            count,
            pincode,
            lat: coords && coords.count > 0 ? coords.latSum / coords.count : undefined,
            lng: coords && coords.count > 0 ? coords.lngSum / coords.count : undefined,
        };
    });

  // Top Sectors
  const sortedSectors = Object.entries(sectorCounts)
    .sort(([, a], [, b]) => b - a);
  
  const topSectors = sortedSectors.slice(0, 7).map(([name, value]) => ({ name, value }));
  const otherCount = sortedSectors.slice(7).reduce((acc, [, val]) => acc + val, 0);
  if (otherCount > 0) {
    topSectors.push({ name: 'Others', value: otherCount });
  }

  // Synergy Data
  const synergyPairs = Object.entries(synergyCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([sector, count]) => ({ sector, count }));

  const synergyZones = Object.entries(synergyZoneCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([pincode, count]) => ({ name: getAreaName(pincode), count }));

  // Registration Trend
  const registrationTrend = Object.entries(yearCounts)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year);

  return {
    totalCount,
    geocodedCount,
    districtsCount: districts.size,
    topAreas,
    synergy: {
        pairs: synergyPairs,
        topZones: synergyZones
    },
    trustIndex: totalCount > 0 ? (oldNgos / totalCount) * 100 : 0,
    sectorDistribution: topSectors,
    registrationTrend,
    mapPoints,
    digitalStats,
    ageDemographics,
  };
}