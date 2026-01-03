import "dotenv/config";
import prisma from "@repo/db";

async function main() {
  console.log("🔍 PurplePages Intelligence Exploration\n");
  console.log("=".repeat(60));

  // Fetch all NGOs with necessary fields
  const ngos = await prisma.ngo.findMany({
    select: {
      id: true,
      name: true,
      primarySectors: true,
      secondarySectors: true,
      registrationDate: true,
      dateOfRegistration: true,
      darpanRegistrationDate: true,
      mobile: true,
      email: true,
      website: true,
      latitude: true,
      longitude: true,
      pincode: true,
      district: true,
      geocodingStatus: true,
      accuracyLevel: true,
    },
  });

  console.log(`\n📊 Total NGO Records: ${ngos.length}\n`);

  // ============================================
  // 1. SYNERGY ANALYSIS - Cross-Sector Intelligence
  // ============================================
  console.log("\n" + "=".repeat(60));
  console.log("🔗 SYNERGY ANALYSIS");
  console.log("=".repeat(60));

  const getUniqueSectors = (ngo: typeof ngos[0]) => {
    const combined = new Set([
      ...(ngo.primarySectors || []),
      ...(ngo.secondarySectors || []),
    ]);
    return Array.from(combined).map((s) => s.trim()).filter(Boolean);
  };

  // Find NGOs with "Differently Abled"
  const differentlyAbledNgos = ngos.filter((ngo) => {
    const sectors = getUniqueSectors(ngo);
    return sectors.some(
      (s) =>
        s.toLowerCase().includes("differently abled") ||
        s.toLowerCase().includes("disability")
    );
  });

  console.log(`\n📍 "Differently Abled" Sector:`);
  console.log(`   Total NGOs: ${differentlyAbledNgos.length}`);

  // What other sectors do they work in?
  const synergyMap: Record<string, number> = {};
  const synergyZoneMap: Record<string, number> = {};

  differentlyAbledNgos.forEach((ngo) => {
    const sectors = getUniqueSectors(ngo);
    sectors.forEach((sector) => {
      if (
        !sector.toLowerCase().includes("differently abled") &&
        !sector.toLowerCase().includes("disability")
      ) {
        synergyMap[sector] = (synergyMap[sector] || 0) + 1;
        if (ngo.pincode) {
          synergyZoneMap[ngo.pincode] = (synergyZoneMap[ngo.pincode] || 0) + 1;
        }
      }
    });
  });

  const sortedSynergy = Object.entries(synergyMap).sort((a, b) => b[1] - a[1]);
  console.log(`\n   Top Synergy Sectors (What else do they do?):`);
  sortedSynergy.slice(0, 10).forEach(([sector, count], i) => {
    const pct = ((count / differentlyAbledNgos.length) * 100).toFixed(1);
    console.log(`   ${i + 1}. ${sector}: ${count} NGOs (${pct}%)`);
  });

  // ============================================
  // 2. MAP DENSITY / GEOCODING ACCURACY
  // ============================================
  console.log("\n" + "=".repeat(60));
  console.log("🗺️  MAP DENSITY & ACCURACY");
  console.log("=".repeat(60));

  const geocoded = ngos.filter((n) => n.latitude && n.longitude);
  const pending = ngos.filter((n) => n.geocodingStatus === "PENDING");
  const failed = ngos.filter((n) => n.geocodingStatus === "FAILED");

  console.log(`\n   Geocoded: ${geocoded.length} (${((geocoded.length / ngos.length) * 100).toFixed(1)}%)`);
  console.log(`   Pending: ${pending.length}`);
  console.log(`   Failed: ${failed.length}`);

  // Check accuracy levels
  const accuracyLevels: Record<string, number> = {};
  geocoded.forEach((n) => {
    const level = n.accuracyLevel || "UNKNOWN";
    accuracyLevels[level] = (accuracyLevels[level] || 0) + 1;
  });

  console.log(`\n   Accuracy Level Breakdown:`);
  Object.entries(accuracyLevels)
    .sort((a, b) => b[1] - a[1])
    .forEach(([level, count]) => {
      console.log(`   - ${level}: ${count}`);
    });

  // Pincode-based density
  const pincodeDensity: Record<string, number> = {};
  ngos.forEach((n) => {
    if (n.pincode) {
      pincodeDensity[n.pincode] = (pincodeDensity[n.pincode] || 0) + 1;
    }
  });

  const topPincodes = Object.entries(pincodeDensity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log(`\n   Top 10 Pincodes by NGO Count:`);
  topPincodes.forEach(([pin, count], i) => {
    console.log(`   ${i + 1}. ${pin}: ${count} NGOs`);
  });

  // ============================================
  // 3. SECTOR DISTRIBUTION
  // ============================================
  console.log("\n" + "=".repeat(60));
  console.log("📊 SECTOR DISTRIBUTION");
  console.log("=".repeat(60));

  const sectorCounts: Record<string, number> = {};
  ngos.forEach((ngo) => {
    // Use primary sectors for main distribution
    (ngo.primarySectors || []).forEach((s) => {
      sectorCounts[s] = (sectorCounts[s] || 0) + 1;
    });
  });

  const sortedSectors = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1]);
  console.log(`\n   Total Unique Primary Sectors: ${sortedSectors.length}`);
  console.log(`\n   Top 15 Sectors:`);
  sortedSectors.slice(0, 15).forEach(([sector, count], i) => {
    const pct = ((count / ngos.length) * 100).toFixed(1);
    console.log(`   ${i + 1}. ${sector}: ${count} (${pct}%)`);
  });

  // ============================================
  // 4. EXPERIENCE DEMOGRAPHICS
  // ============================================
  console.log("\n" + "=".repeat(60));
  console.log("📈 EXPERIENCE DEMOGRAPHICS");
  console.log("=".repeat(60));

  const now = new Date();
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(now.getFullYear() - 3);
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(now.getFullYear() - 10);

  let newCount = 0;
  let establishedCount = 0;
  let veteranCount = 0;
  let noDateCount = 0;

  ngos.forEach((ngo) => {
    const regDate = ngo.registrationDate || ngo.dateOfRegistration || ngo.darpanRegistrationDate;
    if (!regDate) {
      noDateCount++;
      return;
    }
    const date = new Date(regDate);
    if (date > threeYearsAgo) {
      newCount++;
    } else if (date > tenYearsAgo) {
      establishedCount++;
    } else {
      veteranCount++;
    }
  });

  console.log(`\n   New (<3 years): ${newCount} (${((newCount / ngos.length) * 100).toFixed(1)}%)`);
  console.log(`   Established (3-10 years): ${establishedCount} (${((establishedCount / ngos.length) * 100).toFixed(1)}%)`);
  console.log(`   Veteran (>10 years): ${veteranCount} (${((veteranCount / ngos.length) * 100).toFixed(1)}%)`);
  console.log(`   No Date Available: ${noDateCount}`);

  // ============================================
  // 5. TRUST INDICATORS
  // ============================================
  console.log("\n" + "=".repeat(60));
  console.log("🛡️  TRUST INDICATORS");
  console.log("=".repeat(60));

  const withEmail = ngos.filter((n) => n.email).length;
  const withMobile = ngos.filter((n) => n.mobile).length;
  const withWebsite = ngos.filter((n) => n.website).length;
  const withContact = ngos.filter((n) => n.email || n.mobile).length;

  console.log(`\n   Has Email: ${withEmail} (${((withEmail / ngos.length) * 100).toFixed(1)}%)`);
  console.log(`   Has Mobile: ${withMobile} (${((withMobile / ngos.length) * 100).toFixed(1)}%)`);
  console.log(`   Has Website: ${withWebsite} (${((withWebsite / ngos.length) * 100).toFixed(1)}%)`);
  console.log(`   Contactable (Email OR Mobile): ${withContact} (${((withContact / ngos.length) * 100).toFixed(1)}%)`);

  // Established + Contactable = "Verified" by our Trust Pulse logic
  const verified = ngos.filter((n) => {
    const regDate = n.registrationDate || n.dateOfRegistration || n.darpanRegistrationDate;
    const hasContact = n.email || n.mobile;
    return regDate && new Date(regDate) < threeYearsAgo && hasContact;
  }).length;

  console.log(`\n   "Verified" (>3yrs + Contactable): ${verified} (${((verified / ngos.length) * 100).toFixed(1)}%)`);

  // ============================================
  // 6. POTENTIAL NEW INSIGHTS
  // ============================================
  console.log("\n" + "=".repeat(60));
  console.log("💡 POTENTIAL NEW INSIGHTS");
  console.log("=".repeat(60));

  // Multi-sector NGOs (working in 3+ sectors)
  const multiSector = ngos.filter((n) => getUniqueSectors(n).length >= 3);
  console.log(`\n   Multi-Sector NGOs (3+ sectors): ${multiSector.length}`);

  // "Full Stack" NGOs (have website + email + established)
  const fullStack = ngos.filter((n) => {
    const regDate = n.registrationDate || n.dateOfRegistration;
    return n.website && n.email && regDate && new Date(regDate) < threeYearsAgo;
  });
  console.log(`   "Full Stack" (Website + Email + Established): ${fullStack.length}`);

  // Registration year distribution for trend chart
  console.log(`\n   Registration Trend (Year Counts):`);
  const yearCounts: Record<number, number> = {};
  ngos.forEach((n) => {
    const regDate = n.registrationDate || n.dateOfRegistration;
    if (regDate) {
      const year = new Date(regDate).getFullYear();
      if (year >= 2000 && year <= now.getFullYear()) {
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      }
    }
  });

  Object.entries(yearCounts)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .forEach(([year, count]) => {
      console.log(`   ${year}: ${count}`);
    });

  console.log("\n" + "=".repeat(60));
  console.log("✅ Exploration Complete");
  console.log("=".repeat(60));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
