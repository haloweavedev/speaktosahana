import "dotenv/config";
import axios from "axios";
import prisma from "@repo/db";

const BATCH_SIZE = 50;
const DELAY_MS = 100; // ~10 requests per second (safe limit)

// Extract pincode from Google address components
function extractPincode(components: any[]): string | null {
  const postalCode = components.find((c: any) => c.types.includes("postal_code"));
  return postalCode ? postalCode.long_name : null;
}

// Clean address for query
function prepareQuery(address: string): string {
  let cleanAddr = address || "";
  // Remove suffix starting with " ," which often contains redundant state/district info
  if (cleanAddr.includes(" , ")) {
    cleanAddr = cleanAddr.split(" , ")[0];
  }
  // Remove "IN <Pincode>" patterns
  cleanAddr = cleanAddr.replace(/IN \d{6}/, "").trim();
  return cleanAddr;
}

async function googleGeocode(query: string, apiKey: string) {
  try {
    const url = "https://maps.googleapis.com/maps/api/geocode/json";
    const response = await axios.get(url, {
      params: {
        address: query,
        key: apiKey,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error requesting Google API: ${error.message}`);
    return null;
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey) {
    console.error("❌ GOOGLE_MAPS_API environment variable is missing.");
    process.exit(1);
  }

  const totalCount = await prisma.ngo.count();
  console.log(`🚀 Starting Google Maps Geocoding for ${totalCount} records...`);

  let processed = 0;
  let updated = 0;
  let failed = 0;
  let skipped = 0;
  let cursor: string | undefined;

  while (true) {
    const ngos = await prisma.ngo.findMany({
      take: BATCH_SIZE,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: "asc" },
      select: {
        id: true,
        name: true,
        address: true,
      },
    });

    if (ngos.length === 0) break;

    for (const ngo of ngos) {
      processed++;
      cursor = ngo.id;
      const logPrefix = `[${processed}/${totalCount}]`;

      const query = prepareQuery(ngo.address || "");
      
      if (!query) {
        skipped++;
        console.log(`${logPrefix} ⏭️ Skipped (Empty Address): ${ngo.name}`);
        continue;
      }

      const data = await googleGeocode(query, apiKey);
      await sleep(DELAY_MS);

      if (data && data.status === "OK" && data.results.length > 0) {
        const result = data.results[0];
        const location = result.geometry.location;
        const locationType = result.geometry.location_type;
        const foundPincode = extractPincode(result.address_components);

        // Map Google Location Types to our Logic
        // ROOFTOP = Precise
        // RANGE_INTERPOLATED = Precise (Street level)
        // GEOMETRIC_CENTER = Approximate (Street/Neighborhood center)
        // APPROXIMATE = Approximate
        
        const isPrecise = locationType === "ROOFTOP";
        // We consider 'PRECISE' status for DB if it's ROOFTOP or RANGE_INTERPOLATED
        // But 'exactGeocodeMatch' strictly for ROOFTOP
        const status = (locationType === "ROOFTOP" || locationType === "RANGE_INTERPOLATED") 
          ? "PRECISE" 
          : "APPROXIMATE";

        await prisma.ngo.update({
          where: { id: ngo.id },
          data: {
            latitude: location.lat,
            longitude: location.lng,
            geocodingStatus: status,
            accuracyLevel: locationType, // Store raw Google type (ROOFTOP, etc.)
            exactGeocodeMatch: isPrecise,
            geocodedPincode: foundPincode || undefined,
          },
        });

        updated++;
        const icon = isPrecise ? "🎯" : "📍";
        process.stdout.write(`\r${logPrefix} ${icon} Updated: ${ngo.name.substring(0, 30)}... (${locationType})`);
      } else {
        failed++;
        const errorMsg = data ? data.status : "Network Error";
        console.log(`\n${logPrefix} ❌ Failed: ${ngo.name} [${errorMsg}]`);
        
        if (data && data.status === "OVER_QUERY_LIMIT") {
            console.error("\n⚠️ Quota exceeded! Stopping process.");
            process.exit(1);
        }
      }
    }
  }

  console.log(`\n\n✨ Google Geocoding Complete!`);
  console.log(`Total Processed: ${processed}`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
  console.log(`Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
