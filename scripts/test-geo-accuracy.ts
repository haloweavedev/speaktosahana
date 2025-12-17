import axios from "axios";
import prisma from "@repo/db";

const USER_LAT = 13.0210852;
const USER_LON = 77.6331716;
const NGO_NAME = "Diya Foundation"; // Search term for DB
const SEARCH_QUERY = "Diya Foundation Bangalore"; // Search term for API

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

// Haversine formula to calculate distance in meters
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ1) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

async function getCoordinatesFromAPI(query: string) {
  try {
    const { data } = await axios.get(NOMINATIM_URL, {
      params: { q: query, format: "json", limit: 1, countrycodes: "in" },
      headers: { "User-Agent": "PurplePages-Tester/1.0" },
    });
    if (Array.isArray(data) && data.length > 0) {
      return { 
        lat: parseFloat(data[0].lat), 
        lon: parseFloat(data[0].lon),
        display_name: data[0].display_name
      };
    }
    return null;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

async function main() {
  console.log(`\n🔍 Locating NGO: "${NGO_NAME}"...\n`);

  // 1. Get from DB
  const dbNgo = await prisma.ngo.findFirst({
    where: { 
      name: { contains: NGO_NAME, mode: 'insensitive' } 
    },
    select: { id: true, name: true, latitude: true, longitude: true, address: true }
  });

  if (!dbNgo) {
    console.error("❌ NGO not found in Database.");
    return;
  }

  console.log(`✅ Found in DB: ${dbNgo.name}`);
  console.log(`   ID: ${dbNgo.id}`);
  console.log(`   Address: ${dbNgo.address}`);

  let dbLat = dbNgo.latitude ? Number(dbNgo.latitude) : null;
  let dbLon = dbNgo.longitude ? Number(dbNgo.longitude) : null;

  if (dbLat && dbLon) {
    console.log(`   📍 DB Coordinates: ${dbLat}, ${dbLon}`);
    const dist = getDistance(USER_LAT, USER_LON, dbLat, dbLon);
    console.log(`   📏 Distance from You: ${(dist / 1000).toFixed(2)} km`);
  } else {
    console.log(`   ⚠️ No Coordinates in DB.`);
  }

  // 2. Get from API (Name Search)
  console.log(`\n🌍 Querying Search API for Name: "${SEARCH_QUERY}"...`);
  const apiResultName = await getCoordinatesFromAPI(SEARCH_QUERY);
  if (apiResultName) {
    console.log(`   ✅ Found: ${apiResultName.display_name}`);
    console.log(`   📍 Coords: ${apiResultName.lat}, ${apiResultName.lon}`);
  } else {
    console.log(`   ❌ No results for name.`);
  }

  // 3. Get from API (Address Search - simulating DB logic)
  const cleanAddress = dbNgo.address?.replace(/IN [A-Z0-9]+/, "").replace(/\s+/g, " ").trim() || "";
  console.log(`\n🌍 Querying Search API for Address: "${cleanAddress}"...`);
  const apiResultAddress = await getCoordinatesFromAPI(cleanAddress);
  
  if (apiResultAddress) {
    console.log(`   ✅ Found: ${apiResultAddress.display_name}`);
    console.log(`   📍 Coords: ${apiResultAddress.lat}, ${apiResultAddress.lon}`);
    if (dbLat && dbLon) {
        const diff = getDistance(dbLat, dbLon, apiResultAddress.lat, apiResultAddress.lon);
        console.log(`   📊 Diff from DB: ${diff.toFixed(2)}m`);
    }
  } else {
    console.log(`   ❌ No results for address.`);
  }

   // 4. Get from API (Pincode Search - simulating DB logic)
   const pincode = dbNgo.address?.match(/\b5\d{5}\b/)?.[0];
   if (pincode) {
    console.log(`\n🌍 Querying Search API for Pincode: "${pincode}"...`);
    const apiResultPin = await getCoordinatesFromAPI(`${pincode}, India`);
    if (apiResultPin) {
        console.log(`   ✅ Found: ${apiResultPin.display_name}`);
        console.log(`   📍 Coords: ${apiResultPin.lat}, ${apiResultPin.lon}`);
        if (dbLat && dbLon) {
            const diff = getDistance(dbLat, dbLon, apiResultPin.lat, apiResultPin.lon);
            console.log(`   📊 Diff from DB: ${diff.toFixed(2)}m`);
            if (diff < 10) console.log("   👉 DB likely used this Pincode match.");
        }
    }
   }

  // Final Distance Report
  if (dbLat && dbLon) {
     const dist = getDistance(USER_LAT, USER_LON, dbLat, dbLon);
     console.log(`\n🏁 Final Verdict: NGO is ${(dist / 1000).toFixed(2)} km from you (based on DB).`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
