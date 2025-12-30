
import prisma from '@repo/db';

async function main() {
  const pincodeCounts = await prisma.ngo.groupBy({
    by: ['pincode'],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
    take: 20,
  });

  console.log('--- Top 20 Pincodes ---');
  pincodeCounts.forEach(p => {
    console.log(`${p.pincode}: ${p._count.id} NGOs`);
  });
}

main();
