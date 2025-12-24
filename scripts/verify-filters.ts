
import "dotenv/config";
import prisma from "@repo/db";

async function verifyFilters() {
  console.log("--- Starting Filter Verification ---");

  // 1. Find a valid intersection example first
  console.log("\n--- Finding valid multi-sector example ---");
  const multiSectorNgo = await prisma.ngo.findFirst({
    where: {
        primarySectors: {
            isEmpty: false
        }
    },
    select: { primarySectors: true }
  });
  
  // Find one with > 1 sector
  const candidates = await prisma.ngo.findMany({
      where: {
          // prisma doesn't have array_length > 1 easily, so we fetch a few and filter in JS
      },
      select: { primarySectors: true },
      take: 100
  });
  
  const validCandidate = candidates.find(c => c.primarySectors.length >= 2);
  
  let sectorsToTest = ['Education', 'Health']; 
  if (validCandidate) {
      sectorsToTest = validCandidate.primarySectors.slice(0, 2);
      console.log(`Found candidate with sectors: ${validCandidate.primarySectors.join(', ')}`);
  } else {
      console.log("Could not find a candidate with >= 2 sectors in first 100 records. Using default.");
  }

  console.log(`\n1. Testing Sector Intersection: ${sectorsToTest.join(' AND ')}`);
  
  const sectorQuery = {
    AND: [
      {
        primarySectors: {
          hasEvery: sectorsToTest 
        }
      }
    ]
  };

  const sectorResults = await prisma.ngo.findMany({
    where: sectorQuery,
    select: { name: true, primarySectors: true },
    take: 5
  });

  console.log(`Found ${sectorResults.length} sample records (limited to 5 shown).`);
  sectorResults.forEach(r => {
    const hasAll = sectorsToTest.every(s => r.primarySectors.includes(s));
    console.log(`   - ${r.name}: [${r.primarySectors.join(', ')}] -> ${hasAll ? 'PASS' : 'FAIL'}`);
  });
  
  const countSector = await prisma.ngo.count({ where: sectorQuery });
  console.log(`Total count for ${sectorsToTest.join(' + ')}: ${countSector}`);


  // 2. Test Legal Structure + Maturity
  // "combine them Legal Structure and Institutional Age"
  const legalType = 'Trust'; 
  const maturity = '10+'; // Older than 10 years
  
  console.log(`\n2. Testing Legal (${legalType}) + Maturity (${maturity})`);

  const now = new Date();
  const tenYearsAgo = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());

  const complexQuery = {
    AND: [
      {
        typeOfNPO: {
            equals: legalType,
            mode: 'insensitive' as const
        }
      },
      {
        registrationDate: {
          lt: tenYearsAgo
        }
      }
    ]
  };

  const complexResults = await prisma.ngo.findMany({
    where: complexQuery,
    select: { name: true, typeOfNPO: true, registrationDate: true },
    take: 5
  });

  console.log(`Found ${complexResults.length} sample records.`);
  complexResults.forEach(r => {
    const isTrust = r.typeOfNPO?.toLowerCase() === legalType.toLowerCase();
    const isOldEnough = r.registrationDate && r.registrationDate < tenYearsAgo;
    console.log(`   - ${r.name}: ${r.typeOfNPO}, ${r.registrationDate?.toISOString().split('T')[0]} -> ${isTrust && isOldEnough ? 'PASS' : 'FAIL'}`);
  });

  const countComplex = await prisma.ngo.count({ where: complexQuery });
  console.log(`Total count for ${legalType} + ${maturity}: ${countComplex}`);
  
  console.log("\n--- Verification Complete ---");
}

verifyFilters()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
