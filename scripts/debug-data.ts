import prisma from '../packages/db/src/index';

async function main() {
  console.log('Inspecting NGO sample...');

  const sample = await prisma.ngo.findFirst({
    where: {
        primarySectors: { isEmpty: false } // Just to get a "good" record
    }
  });

  console.log('Sample Record:', JSON.stringify(sample, null, 2));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });