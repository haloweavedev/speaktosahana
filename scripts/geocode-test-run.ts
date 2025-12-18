import axios from "axios";
import prisma from "@repo/db";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA";
const TEST_LIMIT = 33;

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

// Extract pincode from text
function extractPincode(text: string | null): string | null {
  if (!text) return null;
  const match = text.match(/\b[1-9][0-9]{5}\b/);
  return match ? match[0] : null;
}

async function geocodeAddress(query: string) {
  try {
    const url = "https://api.mapbox.com/search/geocode/v6/forward";
    const params = {
      q: query,
      country: "in",
      access_token: MAPBOX_TOKEN,
      limit: 1,
    };
    const response = await axios.get(url, { params });
    return response.data.features?.[0] || null;
  } catch (error: any) {
    console.error(`Error geocoding "${query}":`, error.message);
    return null;
  }
}

async function main() {
  console.log(`Starting Geocoding Test Run for first ${TEST_LIMIT} records...`);

  const ngos = await prisma.ngo.findMany({
    take: TEST_LIMIT,
    orderBy: { id: 'asc' }, // Ensure deterministic order
    select: {
      id: true,
      name: true,
      address: true,
      district: true,
      state: true,
      pincode: true,
      latitude: true,
      longitude: true,
    },
  });

  let processed = 0;
  let improved = 0;

  for (const ngo of ngos) {
    processed++;
    console.log(`
--------------------------------------------------`);
    console.log(`[${processed}/${TEST_LIMIT}] Processing: ${ngo.name}`);
    console.log(`Original Address: ${ngo.address}`);

    // Clean address logic
    // Removing the suffix that starts with " ," often containing district/state duplication
    // Example: "... - 560043 , Bengaluru North, BENGALURU URBAN (Karnataka) - 560043"
    let cleanAddr = ngo.address || "";
    if (cleanAddr.includes(" ,")) {
      cleanAddr = cleanAddr.split(" ,")[0];
    }
    
    // Construct Search Query
    // We prefer the DB columns if available
    const searchParts = [
      cleanAddr,
      ngo.district,
      ngo.state,
      ngo.pincode
    ].filter(Boolean);
    
    // Remove duplicates from search string roughly (e.g. if address ends with 560043 and pincode is 560043)
    const searchQuery = searchParts.join(", ");
    console.log(`Search Query:     ${searchQuery}`);

    const result = await geocodeAddress(searchQuery);

    if (result) {
      const newLat = result.geometry.coordinates[1];
      const newLon = result.geometry.coordinates[0];
      const foundAddress = result.properties.full_address;
      const foundPostcode = result.properties.context?.postcode?.name || extractPincode(foundAddress);
      
      console.log(`Found Mapbox:     ${foundAddress}`);
      console.log(`Coords:           ${newLat}, ${newLon}`);
      
      // Validation Check
      const dbPincode = ngo.pincode || extractPincode(ngo.address);
      let status = "APPROXIMATE";
      
      if (dbPincode && foundPostcode && dbPincode === foundPostcode) {
        status = "PRECISE";
        console.log(`✅ Pincode Match: ${dbPincode}`);
      } else if (dbPincode && foundPostcode) {
        console.log(`⚠️ Pincode Mismatch: DB(${dbPincode}) vs Found(${foundPostcode})`);
      } else {
        console.log(`ℹ️ No Pincode comparison possible`);
      }

      // Comparison with existing DB coords
      if (ngo.latitude && ngo.longitude) {
        const oldLat = Number(ngo.latitude);
        const oldLon = Number(ngo.longitude);
        const dist = getDistanceFromLatLonInM(oldLat, oldLon, newLat, newLon);
        console.log(`Old Coords:       ${oldLat}, ${oldLon}`);
        console.log(`Shift Distance:   ${dist.toFixed(2)} meters`);
        
        if (dist > 1000) {
           console.log(`⚠️ SIGNIFICANT CHANGE (>1km)`);
        }
      } else {
        console.log(`Old Coords:       (none)`);
      }

      // Update DB
      await prisma.ngo.update({
        where: { id: ngo.id },
        data: {
          latitude: newLat,
          longitude: newLon,
          geocodingStatus: status,
          geocodedPincode: foundPostcode || null,
        }
      });
      console.log(`✅ DB Updated`);
      improved++;

    } else {
      console.log(`❌ No result found for query.`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
