import "dotenv/config";
import axios from "axios";
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
  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey) {
    console.error("❌ GOOGLE_MAPS_API environment variable is missing.");
    return;
  }

  const targetLat = 13.0210362;
  const targetLon = 77.6332207;
  const darpanId = "KA/2015/0087359";

  console.log(`🔍 Fetching NGO: ${darpanId}...`);
  const ngo = await prisma.ngo.findUnique({
    where: { darpanId: darpanId },
    select: { name: true, address: true }
  });

  if (!ngo) {
    console.error("❌ NGO not found in DB.");
    return;
  }

  console.log(`   Name:    ${ngo.name}`);
  console.log(`   Address: ${ngo.address}`);

  // Clean address slightly for Google (remove "IN <Pincode>" patterns if any, keep it mostly raw)
  // Google is usually good with raw strings, but let's strip the repetitive suffix we saw earlier
  let query = ngo.address || "";
  if (query.includes(" , ")) {
    query = query.split(" , ")[0];
  }
  
  console.log(`\n🌏 Querying Google Maps API with: "${query}"...`);

  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: query,
        key: apiKey
      }
    });

    const data = response.data;

    if (data.status !== "OK") {
      console.error(`❌ Google API Error: ${data.status}`);
      if (data.error_message) console.error(`   ${data.error_message}`);
      return;
    }

    const result = data.results[0];
    const location = result.geometry.location;
    const locationType = result.geometry.location_type;
    const formattedAddress = result.formatted_address;

    console.log(`\n✅ Google Maps Result:`);
    console.log(`   Formatted:     ${formattedAddress}`);
    console.log(`   Location Type: ${locationType} (ROOFTOP is best)`);
    console.log(`   Coords:        ${location.lat}, ${location.lng}`);

    const dist = getDistanceFromLatLonInM(location.lat, location.lng, targetLat, targetLon);
    console.log(`\n📏 Distance Calculation:`);
    console.log(`   To Target:     ${targetLat}, ${targetLon}`);
    console.log(`   Distance:      ${dist.toFixed(2)} meters (${(dist/1000).toFixed(3)} km)`);

  } catch (error: any) {
    console.error("❌ Request Failed:", error.message);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
