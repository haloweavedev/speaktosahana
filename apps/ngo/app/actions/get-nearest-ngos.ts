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

const SEARCH_LIMIT = 50;

export async function getNearestNgos(lat: number, lon: number, sectors?: string[]): Promise<NearestNgo[]> {
  try {
    let results;

    if (sectors && sectors.length > 0) {
      // Use the containment operator @> to ensure primary_sectors contains all selected sectors
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
          AND primary_sectors @> ${sectors}
        ORDER BY distance ASC
        LIMIT ${SEARCH_LIMIT};
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
        LIMIT ${SEARCH_LIMIT};
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