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
  // Fetching the 1190th NGO (index 1189) based on deterministic order used in geocode-full.ts
  const ngos = await prisma.ngo.findMany({
    take: 1,
    skip: 1189,
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
      address: true,
      latitude: true,
      longitude: true,
      accuracyLevel: true,
      geocodingStatus: true,
      exactGeocodeMatch: true
    },
  });

  if (ngos.length === 0) {
    console.log("NGO at index 1189 not found.");
    return;
  }

  const ngo = ngos[0];
  const targetLat = 13.0210362;
  const targetLon = 77.6332207;

  console.log(`📊 Details for NGO at index 1189:`);
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
    console.log(`\n📏 Distance Calculation:`);
    console.log(`   To Target:      ${targetLat}, ${targetLon}`);
    console.log(`   Distance:       ${dist.toFixed(2)} meters (${(dist/1000).toFixed(3)} km)`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
