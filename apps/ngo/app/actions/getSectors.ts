'use server';

import prisma from '@repo/db';

export async function getSectors() {
  try {
    // Since primarySectors is an array, we fetch all and deduplicate in memory
    // For 1300 records this is negligible. For 100k+, we would use a raw query or separate table.
    const ngos = await prisma.ngo.findMany({
      select: {
        primarySectors: true,
      },
    });

    const sectorSet = new Set<string>();
    ngos.forEach(ngo => {
      ngo.primarySectors.forEach(sector => sectorSet.add(sector));
    });

    return Array.from(sectorSet).sort();
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return [];
  }
}
