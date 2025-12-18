import axios from "axios";
import prisma from "@repo/db";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA";
const BATCH_SIZE = 50;
const DELAY_MS = 100; // Small delay to be polite to the API

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// Extract pincode from text
function extractPincode(text: string | null): string | null {
  if (!text) return null;
  const match = text.match(/\b[1-9][0-9]{5}\b/);
  return match ? match[0] : null;
}

// Clean and truncate address for Mapbox query (limit ~200 chars safe)
function prepareQuery(address: string, district: string | null, state: string | null, pincode: string | null): string {
  let cleanAddr = address || "";
  
  // Remove suffix starting with " ,"
  if (cleanAddr.includes(" , ")) {
    cleanAddr = cleanAddr.split(" , ")[0];
  }

  // Remove "IN <Pincode>" patterns or similar noise
  cleanAddr = cleanAddr.replace(/IN \d{6}/, "").trim();

  // Construct parts
  const parts = [cleanAddr, district, state, pincode].filter(Boolean);
  let query = parts.join(", ");

  // Truncate if too long (Mapbox limit is strict around 256, keep it safe at 200)
  if (query.length > 190) {
    const suffix = `, ${district || ""}, ${state || ""}, ${pincode || ""}`;
    const allowedAddrLen = 190 - suffix.length;
    if (allowedAddrLen > 10) {
       query = cleanAddr.substring(0, allowedAddrLen) + suffix;
    } else {
       query = `${district || ""}, ${state || ""}, ${pincode || ""}`;
    }
  }
  
  return query;
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
    if (error.response?.status === 422) {
      return "422_ERROR";
    }
    console.error(`Error geocoding:`, error.message);
    return null;
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const totalCount = await prisma.ngo.count();
  console.log(`🚀 Starting Full Geocoding Process for ${totalCount} records...`);

  let processed = 0;
  let updated = 0;
  let failed = 0;
  let cursor: string | undefined;

  while (true) {
    const ngos = await prisma.ngo.findMany({
      take: BATCH_SIZE,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        address: true,
        district: true,
        state: true,
        pincode: true,
      },
    });

    if (ngos.length === 0) break;

    for (const ngo of ngos) {
      processed++;
      cursor = ngo.id;
      
      const logPrefix = `[${processed}/${totalCount}]`;
      
      // Strategy 1: Full Query (Prepared)
      let query = prepareQuery(ngo.address || "", ngo.district, ngo.state, ngo.pincode);
      let result = await geocodeAddress(query);

      // Fallback Strategy
      if (!result || result === "422_ERROR") {
          // Fallback 1: Remove specific address, use District/City + State + Pincode
          query = [ngo.district, ngo.state, ngo.pincode].filter(Boolean).join(", ");
          result = await geocodeAddress(query);
      }

      if (result && result !== "422_ERROR") {
        const newLat = result.geometry.coordinates[1];
        const newLon = result.geometry.coordinates[0];
        const foundAddress = result.properties.full_address;
        
        // Metrics Extraction
        const accuracy = result.properties.coordinates?.accuracy || "unknown"; 
        const confidence = result.properties.match_code?.confidence || "unknown"; 
        const foundPostcode = result.properties.context?.postcode?.name || extractPincode(foundAddress);
        const dbPincode = ngo.pincode || extractPincode(ngo.address);

        let exactMatch = false;
        if (confidence === 'exact') exactMatch = true;
        if (confidence === 'high' && dbPincode && foundPostcode && dbPincode === foundPostcode) exactMatch = true;

        // DB Update
        await prisma.ngo.update({
          where: { id: ngo.id },
          data: {
            latitude: newLat,
            longitude: newLon,
            geocodingStatus: exactMatch ? "PRECISE" : "APPROXIMATE",
            geocodedPincode: foundPostcode || null,
            accuracyLevel: accuracy,
            exactGeocodeMatch: exactMatch,
          }
        });
        updated++;
        process.stdout.write(`\r${logPrefix} ✅ Updated: ${ngo.name.substring(0, 30)}...`);
      } else {
        failed++;
        console.log(`\n${logPrefix} ❌ Failed to geocode: ${ngo.name}`);
      }
      
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n\n✨ Process Complete!`);
  console.log(`Total Processed: ${processed}`);
  console.log(`Successfully Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
