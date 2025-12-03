import prisma from '@repo/db';
import fs from 'node:fs';
import path from 'node:path';

// const prisma = new PrismaClient(); // Use the one from the package
const OUTPUT_DIR = path.join(process.cwd(), 'outputs');

async function main() {
  console.log('🧹 Cleaning up database and outputs...');

  try {
    // Delete in order of foreign key dependency
    await prisma.ngoSector.deleteMany({});
    await prisma.scrapeRun.deleteMany({});
    await prisma.ngo.deleteMany({});
    await prisma.sector.deleteMany({});
    
    console.log('✅ Database tables truncated.');
  } catch (e) {
    console.error('❌ Error clearing database:', e);
  }

  try {
    if (fs.existsSync(OUTPUT_DIR)) {
      const files = fs.readdirSync(OUTPUT_DIR);
      for (const file of files) {
        if (file.endsWith('.json') || file.endsWith('.png')) {
          fs.unlinkSync(path.join(OUTPUT_DIR, file));
        }
      }
    }
    console.log('✅ Local output files cleared.');
  } catch (e) {
    console.error('❌ Error clearing local files:', e);
  }

  await prisma.$disconnect();
}

main();
