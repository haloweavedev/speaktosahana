import axios from "axios";
import prisma from "@repo/db";

// Use the public token from the docs for testing, or your own if available
const MAPBOX_TOKEN = "pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"; 

async function getMapboxCoordinates(address: string, pincode: string) {
  try {
    const url = "https://api.mapbox.com/search/geocode/v6/forward";
    const params = {
      q: `${address} ${pincode}`,
      country: "in",
      access_token: MAPBOX_TOKEN,
      limit: 1,
      proximity: "ip", // Bias towards IP location
    };

    const response = await axios.get(url, { params });
    const feature = response.data.features[0];

    if (feature) {
      return {
        name: feature.properties.name,
        full_address: feature.properties.full_address,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        match_code: feature.properties.match_code // Smart Address Match score
      };
    }
    return null;
  } catch (error) {
    console.error("Mapbox API Error:", error.response?.data || error.message);
    return null;
  }
}

async function main() {
  const names = [
    "GRACE REFORMED TRUST",
    "Prarambha",
    "THANAL CHARITABLE TRUST"
  ];

  console.log("🚀 Starting Geocode Comparison: DB (Nominatim) vs Mapbox v6\n");

  const ngos = await prisma.ngo.findMany({
    where: { name: { in: names, mode: 'insensitive' } },
    select: { id: true, name: true, address: true, pincode: true, latitude: true, longitude: true }
  });

  for (const ngo of ngos) {
    console.log(`
🏢 NGO: ${ngo.name}`);
    console.log(`   📍 DB Address: ${ngo.address}`);
    
    // 1. Current DB Coords
    const dbLat = Number(ngo.latitude);
    const dbLon = Number(ngo.longitude);
    console.log(`   [DB] Coords: ${dbLat}, ${dbLon}`);

    // 2. Mapbox Coords
    // Cleaning address slightly for better match probability
    const cleanAddress = ngo.address
        ?.replace(/IN [A-Z0-9]+/, "") // Remove "IN XXXXX" codes
        .replace(/\s+/g, " ")
        .trim() || "";

    const mapboxResult = await getMapboxCoordinates(cleanAddress, ngo.pincode || "");

    if (mapboxResult) {
      console.log(`   [Mapbox] Found: ${mapboxResult.full_address}`);
      console.log(`   [Mapbox] Coords: ${mapboxResult.latitude}, ${mapboxResult.longitude}`);
      
      // Calculate Difference
      const diff = Math.sqrt(
          Math.pow(mapboxResult.latitude - dbLat, 2) + 
          Math.pow(mapboxResult.longitude - dbLon, 2)
      ) * 111000; // Approx meters

      console.log(`   📏 Difference: ${diff.toFixed(2)} meters`);
      
      if (diff < 100) console.log("   ✅ Result: MATCH (High Confidence)");
      else console.log("   ⚠️ Result: SIGNIFICANT DRIFT (Likely Pincode vs Rooftop)");
      
    } else {
      console.log("   ❌ Mapbox found no results.");
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
