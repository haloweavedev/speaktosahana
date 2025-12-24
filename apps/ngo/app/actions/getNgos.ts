'use server';

import prisma, { Prisma } from '@repo/db';

export type GetNgosParams = {
  page?: number;
  limit?: number;
  search?: string;
  sectors?: string[];
  maturity?: '0-3' | '3-10' | '10+' | null;
  legalEntities?: string[];
};

export async function getNgos({
  page = 1,
  limit = 20,
  search,
  sectors = [],
  maturity,
  legalEntities = [],
}: GetNgosParams) {
  const skip = (page - 1) * limit;

  const where: Prisma.NgoWhereInput = {
    AND: [],
  };

  const andConditions = where.AND as Prisma.NgoWhereInput[];

  // Search (Name or Darpan ID)
  if (search) {
    andConditions.push({
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { darpanId: { contains: search, mode: 'insensitive' } },
      ],
    });
  }

  // Sectors
  if (sectors.length > 0) {
    // User Requirement: "when i select two different sectors, npo that have both of them only should show up"
    // Switching to AND logic (hasEvery)
    andConditions.push({
      primarySectors: {
        hasEvery: sectors,
      },
    });
  }

  // Legal Entities
  if (legalEntities.length > 0) {
    andConditions.push({
        typeOfNPO: {
            in: legalEntities,
            mode: 'insensitive', // Handle potential casing mismatches
        }
    });
  }

  // Maturity (Date Math)
  if (maturity) {
    const now = new Date();
    const threeYearsAgo = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate());
    const tenYearsAgo = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());

    if (maturity === '0-3') {
      andConditions.push({
        registrationDate: {
          gte: threeYearsAgo,
        },
      });
    } else if (maturity === '3-10') {
      andConditions.push({
        registrationDate: {
          lt: threeYearsAgo,
          gte: tenYearsAgo,
        },
      });
    } else if (maturity === '10+') {
      andConditions.push({
        registrationDate: {
          lt: tenYearsAgo,
        },
      });
    }
  }

  try {
    const [ngos, total] = await Promise.all([
      prisma.ngo.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            createdAt: 'desc' // Default sort
        }
      }),
      prisma.ngo.count({ where }),
    ]);

    const serializedNgos = ngos.map(ngo => ({
      ...ngo,
      latitude: ngo.latitude ? ngo.latitude.toNumber() : null,
      longitude: ngo.longitude ? ngo.longitude.toNumber() : null,
    }));

    return {
      data: serializedNgos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error('Error fetching NGOs:', error);
    throw new Error('Failed to fetch NGOs');
  }
}