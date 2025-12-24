'use server';

import prisma from '@repo/db';

export async function getLegalTypes() {
  try {
    const types = await prisma.ngo.findMany({
      select: {
        typeOfNPO: true,
      },
      distinct: ['typeOfNPO'],
      where: {
        typeOfNPO: {
          not: null,
        },
      },
    });
    
    return types
      .map(t => t.typeOfNPO as string)
      .filter(Boolean)
      .sort();
  } catch (error) {
    console.error('Error fetching legal types:', error);
    return [];
  }
}
