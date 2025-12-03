'use server';

import prisma from "@repo/db";

export type NearbyNgo = {
  id: string;
  name: string;
  primary_sectors: string[];
  latitude: number;
  longitude: number;
  distance_meters: number;
};

export async function getNGOsInRadius(lat: number, lng: number, radiusKm: number) {
  const radiusMeters = radiusKm * 1000;

  const ngos = await prisma.$queryRaw<NearbyNgo[]>`
      SELECT
        id,
        name,
        "primary_sectors",
        latitude,
        longitude,
        ST_Distance(
          ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography
        ) as distance_meters
      FROM ngos
      WHERE
        latitude IS NOT NULL
        AND longitude IS NOT NULL
        AND ST_DWithin(
          ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
          ${radiusMeters}
        )
      ORDER BY distance_meters ASC
      LIMIT 50;
    `;

  return ngos.map((ngo) => ({
    ...ngo,
    latitude: typeof ngo.latitude === "string" ? Number(ngo.latitude) : (ngo.latitude as number),
    longitude: typeof ngo.longitude === "string" ? Number(ngo.longitude) : (ngo.longitude as number),
    distance_meters: Number(ngo.distance_meters),
  }));
}
