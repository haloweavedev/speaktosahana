import prisma from "@repo/db";

// Helper to calculate distance in meters
function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 1000; // Distance in meters
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

async function main() {
  const targetLat = 13.0210362;
  const targetLon = 77.6332207;
  const darpanId = "KA/2015/0087359";

  console.log(`🔍 Searching for NGO with Darpan ID: ${darpanId}...
`);

  const ngo = await prisma.ngo.findUnique({
    where: { darpanId: darpanId },
    select: {
      name: true,
      address: true,
      latitude: true,
      longitude: true,
      accuracyLevel: true,
      geocodingStatus: true,
      exactGeocodeMatch: true
    },
  });

  if (!ngo) {
    console.log("❌ NGO not found.");
    return;
  }

  console.log(`📊 Details:`);
  console.log(`   Name:           ${ngo.name}`);
  console.log(`   Address:        ${ngo.address}`);
  console.log(`   Latitude:       ${ngo.latitude}`);
  console.log(`   Longitude:      ${ngo.longitude}`);
  console.log(`   Accuracy Level: ${ngo.accuracyLevel}`);
  console.log(`   Status:         ${ngo.geocodingStatus}`);
  console.log(`   Exact Match:    ${ngo.exactGeocodeMatch}`);

  if (ngo.latitude && ngo.longitude) {
    const dist = getDistanceFromLatLonInM(
        Number(ngo.latitude), 
        Number(ngo.longitude), 
        targetLat, 
        targetLon
    );
    console.log(`
📏 Distance Calculation:`);
    console.log(`   To Target:      ${targetLat}, ${targetLon}`);
    console.log(`   Distance:       ${dist.toFixed(2)} meters (${(dist/1000).toFixed(3)} km)`);
  } else {
    console.log(`
⚠️ Cannot calculate distance: Coordinates missing.`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
