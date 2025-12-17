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
};

export async function getNearestNgos(lat: number, lon: number): Promise<NearestNgo[]> {
  try {
    // raw query to calculate distance using PostGIS or Haversine
    // Assuming PostGIS is enabled as per schema
    const results = await prisma.$queryRaw<any[]>`
      SELECT 
        id, 
        name, 
        address, 
        primary_sectors as "primarySectors",
        latitude,
        longitude,
        ST_DistanceSphere(
          ST_MakePoint(CAST(longitude AS DOUBLE PRECISION), CAST(latitude AS DOUBLE PRECISION)),
          ST_MakePoint(${lon}, ${lat})
        ) as distance
      FROM ngos
      WHERE latitude IS NOT NULL AND longitude IS NOT NULL
      ORDER BY distance ASC
      LIMIT 20;
    `;

    // Map raw results to the type
    return results.map((r) => ({
      id: r.id,
      name: r.name,
      address: r.address,
      primarySectors: r.primarySectors || [],
      distance: Math.round(r.distance), // Distance in meters
      latitude: Number(r.latitude),
      longitude: Number(r.longitude)
    }));
  } catch (error) {
    console.error("Error fetching nearest NGOs:", error);
    return [];
  }
}
