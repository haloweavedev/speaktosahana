import prisma from "@repo/db";

async function main() {
  console.log("📍 Precise Geocoding Matches (PRECISE status)\n");

  const preciseNgos = await prisma.ngo.findMany({
    where: { geocodingStatus: "PRECISE" },
    select: {
      name: true,
      address: true,
      accuracyLevel: true,
      latitude: true,
      longitude: true
    },
  });

  if (preciseNgos.length === 0) {
    console.log("No precise matches found.");
    return;
  }

  preciseNgos.forEach((ngo, index) => {
    console.log(`${index + 1}. ${ngo.name}`);
    console.log(`   🏠 Address: ${ngo.address}`);
    console.log(`   🎯 Accuracy: ${ngo.accuracyLevel}`);
    console.log(`   🌐 Coords:   ${ngo.latitude}, ${ngo.longitude}`);
    console.log("-".repeat(50));
  });

  console.log(`\nTotal: ${preciseNgos.length} precise records.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
