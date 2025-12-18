"use server";

import prisma from "@repo/db";

export type NearestNgo = {
  id: string;
  name: string;
  address: string | null;
  primarySectors: string[];
  distance: number;
  latitude: number;
  longitude: number;
  exactGeocodeMatch: boolean;
  accuracyLevel: string | null;
};

export async function getNearestNgos(lat: number, lon: number, sector?: string): Promise<NearestNgo[]> {
  try {
    // If sector is provided, add a WHERE clause
    const sectorCondition = sector 
      ? `AND ${sector} = ANY(primary_sectors)` 
      : "";

    // Using Prisma.sql would be safer for parameter injection, but $queryRaw works with template literals 
    // for simple values. For dynamic AND clauses, we have to be careful.
    // Since sector comes from a controlled list ideally, but here we should probably pass it as a param.
    // However, $queryRaw accepts parameters. Let's write it carefully.

    let results;
    
    if (sector) {
      results = await prisma.$queryRaw<any[]>`
        SELECT 
          id, 
          name, 
          address, 
          primary_sectors as "primarySectors",
          latitude,
          longitude,
          exact_geocode_match as "exactGeocodeMatch",
          accuracy_level as "accuracyLevel",
          ST_DistanceSphere(
            ST_MakePoint(CAST(longitude AS DOUBLE PRECISION), CAST(latitude AS DOUBLE PRECISION)),
            ST_MakePoint(${lon}, ${lat})
          ) as distance
        FROM ngos
        WHERE latitude IS NOT NULL 
          AND longitude IS NOT NULL
          AND ${sector} = ANY(primary_sectors)
        ORDER BY distance ASC
        LIMIT 50;
      `;
    } else {
      results = await prisma.$queryRaw<any[]>`
        SELECT 
          id, 
          name, 
          address, 
          primary_sectors as "primarySectors",
          latitude,
          longitude,
          exact_geocode_match as "exactGeocodeMatch",
          accuracy_level as "accuracyLevel",
          ST_DistanceSphere(
            ST_MakePoint(CAST(longitude AS DOUBLE PRECISION), CAST(latitude AS DOUBLE PRECISION)),
            ST_MakePoint(${lon}, ${lat})
          ) as distance
        FROM ngos
        WHERE latitude IS NOT NULL 
          AND longitude IS NOT NULL
        ORDER BY distance ASC
        LIMIT 50;
      `;
    }

    return results.map((r) => ({
      id: r.id,
      name: r.name,
      address: r.address,
      primarySectors: r.primarySectors || [],
      distance: Math.round(r.distance), // Distance in meters
      latitude: Number(r.latitude),
      longitude: Number(r.longitude),
      exactGeocodeMatch: r.exactGeocodeMatch || false,
      accuracyLevel: r.accuracyLevel
    }));
  } catch (error) {
    console.error("Error fetching nearest NGOs:", error);
    return [];
  }
}