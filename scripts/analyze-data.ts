
import "dotenv/config";
import prisma from "@repo/db";

async function main() {
  console.log("📊 Starting Data Analysis...");

  // Fetch all NGOs with necessary fields
  const ngos = await prisma.ngo.findMany({
    select: {
      id: true,
      name: true,
      primarySectors: true,
      secondarySectors: true,
      darpanRegistrationDate: true,
      mobile: true,
      email: true,
      latitude: true,
      longitude: true,
      geocodingStatus: true,
      registrationDate: true,
    },
  });

  console.log(`\n✅ Analyzed ${ngos.length} NGO records.\n`);

  // --- Insight 1: Sector Analysis ---
  const sectorCounts: Record<string, number> = {};
  
  // Helper to get unique sectors for an NGO
  const getUniqueSectors = (ngo: typeof ngos[0]) => {
    const combined = new Set([
      ...(ngo.primarySectors || []), 
      ...(ngo.secondarySectors || [])
    ]);
    return Array.from(combined).map(s => s.trim()).filter(Boolean);
  };

  ngos.forEach((ngo) => {
    const sectors = getUniqueSectors(ngo);
    sectors.forEach((sector) => {
      sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
    });
  });

  const sortedSectors = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1]);
  const uniqueSectorsCount = sortedSectors.length;

  console.log(`🔹 Total Unique Sectors: ${uniqueSectorsCount}`);
  console.log(`🔹 Top 5 Sectors:`);
  sortedSectors.slice(0, 5).forEach(([sector, count]) => {
    console.log(`   - ${sector}: ${count} (${((count / ngos.length) * 100).toFixed(1)}%)`);
  });

  // --- Insight 2: "Differently Abled" Intersections ---
  const TARGET_SECTOR = "Differently Abled";
  const differentlyAbledNgos = ngos.filter((ngo) => 
    getUniqueSectors(ngo).includes(TARGET_SECTOR)
  );
  
  const intersectionCounts: Record<string, number> = {};
  
  differentlyAbledNgos.forEach(ngo => {
    const sectors = getUniqueSectors(ngo);
    sectors.forEach(sector => {
        if (sector !== TARGET_SECTOR) {
            intersectionCounts[sector] = (intersectionCounts[sector] || 0) + 1;
        }
    });
  });

  const sortedIntersections = Object.entries(intersectionCounts).sort((a, b) => b[1] - a[1]);

  console.log(`\n🔹 "Differently Abled" Sector Analysis:`);
  console.log(`   - Total NGOs in this sector: ${differentlyAbledNgos.length}`);
  console.log(`   - Most Common Intersections (What else do they do?):`);
  sortedIntersections.slice(0, 5).forEach(([sector, count]) => {
    const percentage = ((count / differentlyAbledNgos.length) * 100).toFixed(1);
    console.log(`     * ${sector}: ${percentage}%`);
  });


  // --- Insight 3: Trust Pulse (Credibility) ---
  // Criteria from Vision:
  // Verified: Darpan ID present (implicit as we have records) + Reg Date > 3 years + Valid Mobile/Email.
  // New Entrant: Reg Date < 1 year.
  
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
  
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  let verifiedCount = 0;
  let newEntrantCount = 0;
  let contactableCount = 0;

  ngos.forEach(ngo => {
    const regDate = ngo.registrationDate || ngo.darpanRegistrationDate; // Fallback
    const hasContact = Boolean(ngo.mobile || ngo.email);
    
    if (hasContact) contactableCount++;

    if (regDate) {
      if (regDate < threeYearsAgo && hasContact) {
        verifiedCount++;
      } else if (regDate > oneYearAgo) {
        newEntrantCount++;
      }
    }
  });

  console.log(`\n🔹 Trust Pulse Indicators:`);
  console.log(`   - potentially "Verified" (Active > 3yrs + Contactable): ${verifiedCount} (${((verifiedCount / ngos.length) * 100).toFixed(1)}%)`);
  console.log(`   - "New Entrants" (< 1yr old): ${newEntrantCount}`);
  console.log(`   - Contactable (Email/Mobile present): ${contactableCount} (${((contactableCount / ngos.length) * 100).toFixed(1)}%)`);

  // --- Insight 4: Hyper-Local Access Radius (Geocoding) ---
  const geocodedCount = ngos.filter(ngo => ngo.latitude && ngo.longitude).length;
  const pendingGeocoding = ngos.filter(ngo => ngo.geocodingStatus === 'PENDING').length;
  const failedGeocoding = ngos.filter(ngo => ngo.geocodingStatus === 'FAILED').length;

  console.log(`\n🔹 Hyper-Local Readiness:`);
  console.log(`   - Geocoded (Lat/Long available): ${geocodedCount} (${((geocodedCount / ngos.length) * 100).toFixed(1)}%)`);
  console.log(`   - Pending Geocoding: ${pendingGeocoding}`);
  console.log(`   - Failed Geocoding: ${failedGeocoding}`);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
