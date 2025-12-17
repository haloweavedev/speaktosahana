import prisma from "@repo/db";

async function main() {
  const names = [
    "GRACE REFORMED TRUST",
    "Prarambha",
    "THANAL CHARITABLE TRUST"
  ];

  console.log("🔍 Inspecting Coordinates for specific NGOs...\n");

  const ngos = await prisma.ngo.findMany({
    where: {
      name: { in: names, mode: 'insensitive' }
    },
    select: {
      id: true,
      name: true,
      latitude: true,
      longitude: true,
      geocodingStatus: true,
      geocodedPincode: true,
      address: true
    }
  });

  ngos.forEach(ngo => {
    console.log(`NGO: ${ngo.name}`);
    console.log(`   ID: ${ngo.id}`);
    console.log(`   Coords: ${ngo.latitude}, ${ngo.longitude}`);
    console.log(`   Status: ${ngo.geocodingStatus}`);
    console.log(`   Pincode Used: ${ngo.geocodedPincode}`);
    console.log(`   Address: ${ngo.address}`);
    console.log("-".repeat(40));
  });

  // Check for duplicates
  const coords = ngos.map(n => `${n.latitude},${n.longitude}`);
  const uniqueCoords = new Set(coords);
  
  if (uniqueCoords.size < coords.length && coords.length > 0) {
    console.log(`\n⚠️  IDENTICAL COORDINATES DETECTED!`);
    console.log(`   Found ${coords.length} NGOs but only ${uniqueCoords.size} unique locations.`);
    console.log(`   This confirms they are all mapped to the same Pincode Centroid.`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
