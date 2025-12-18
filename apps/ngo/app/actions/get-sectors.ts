"use server";

import prisma from "@repo/db";

export async function getUniqueSectors() {
  try {
    // Fetch unique sectors. Since primarySectors is an array, we need to unnest it.
    // However, Prisma doesn't support unnesting easily in distinct queries without raw SQL.
    // For simplicity, we can fetch all sectors and deduplicate in JS if the dataset isn't huge,
    // or use a raw query. Given 1300 records, raw query is efficient.
    
    const results = await prisma.$queryRaw<{ sector: string }[]>`
      SELECT DISTINCT unnest(primary_sectors) as sector
      FROM ngos
      WHERE primary_sectors IS NOT NULL
      ORDER BY sector ASC;
    `;

    return results.map(r => r.sector);
  } catch (error) {
    console.error("Error fetching sectors:", error);
    return [];
  }
}
