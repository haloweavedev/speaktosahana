import prisma from "@repo/db";

async function main() {
  console.log("📊 Analyzing Geocoding Quality Metrics...\n");

  const total = await prisma.ngo.count();
  
  // 1. Exact Match Metrics
  const exactMatches = await prisma.ngo.count({ where: { exactGeocodeMatch: true } });
  const nonExactMatches = await prisma.ngo.count({ where: { exactGeocodeMatch: false } });
  const pendingOrNull = await prisma.ngo.count({ where: { exactGeocodeMatch: null } });

  // 2. Accuracy Level Breakdown
  const accuracyLevels = await prisma.ngo.groupBy({
    by: ['accuracyLevel'],
    _count: { _all: true },
  });

  // 3. Geocoding Status Breakdown
  const statuses = await prisma.ngo.groupBy({
    by: ['geocodingStatus'],
    _count: { _all: true },
  });

  console.log(`📈 Overall Stats:`);
  console.log(`   Total Records:      ${total}`);
  console.log(`   Exact Matches:      ${exactMatches} (${((exactMatches/total)*100).toFixed(1)}%)`);
  console.log(`   Approximate:        ${nonExactMatches} (${((nonExactMatches/total)*100).toFixed(1)}%)`);
  console.log(`   Pending/Failed:     ${pendingOrNull}\n`);

  console.log(`🎯 Accuracy Level Breakdown:`);
  accuracyLevels.forEach(level => {
    console.log(`   - ${level.accuracyLevel || 'null'}:`.padEnd(20), `${level._count._all}`);
  });

  console.log(`\n🚦 Geocoding Status Breakdown:`);
  statuses.forEach(status => {
    console.log(`   - ${status.geocodingStatus}:`.padEnd(20), `${status._count._all}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
