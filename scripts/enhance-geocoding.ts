import axios from "axios";
import prisma from "@repo/db";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaGFsb3dlYXZlbWFwYm94IiwiYSI6ImNtaXBud2NhdjBhb3AzZ3IyZWE0MWd4ejkifQ.LgRZHBpkQFNSE6sTuhUqfA"; 
const BATCH_SIZE = 1000;
const SLEEP_MS = 250; // ~4 requests per second

// Color codes for pretty logs
const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Extract a standardized 6-digit pincode from text
function extractPincode(text: string | null): string | null {
  if (!text) return null;
  const match = text.match(/\b[1-9][0-9]{5}\b/);
  return match ? match[0] : null;
}

// Clean address for search query
function cleanAddressForSearch(address: string | null): string {
  if (!address) return "";
  return address
    .replace(/IN [A-Z0-9]+/, "") // Remove internal codes like "IN 560084"
    .replace(/[^\w\s,.-]/g, "") // Remove special chars
    .replace(/\s+/g, " ")
    .trim();
}

type MapboxResult = {
  coords: [number, number]; // [lon, lat]
  address: string;
  postcode: string | null;
  relevance: number;
  matchType: string;
};

async function geocodeMapbox(query: string, intendedPincode: string | null): Promise<MapboxResult | null> {
  try {
    const url = "https://api.mapbox.com/search/geocode/v6/forward";
    const params = {
      q: query,
      country: "in",
      access_token: MAPBOX_TOKEN,
      limit: 1,
      types: "address,street,place,locality,neighborhood" // prioritization
    };

    const { data } = await axios.get(url, { params });
    const feature = data.features?.[0];

    if (!feature) return null;

    // Extract postcode from context if available
    const postcodeCtx = feature.properties.context?.postcode?.name || feature.properties.context?.postcode?.text;
    // Or sometimes it's in the address itself for v6? v6 structure is different, checking properties
    const postcode = postcodeCtx || extractPincode(feature.properties.full_address);

    return {
      coords: feature.geometry.coordinates as [number, number],
      address: feature.properties.full_address,
      postcode: postcode || null,
      relevance: feature.properties.match_code?.confidence || (feature.properties.match_code ? 0.8 : 0.5), // v6 uses match_code
      matchType: feature.geometry.type
    };
  } catch (error) {
    return null;
  }
}

async function main() {
  console.log(`${CYAN}🚀 Starting Enhanced Geocoding Process (Mapbox Hybrid Pipeline)...${RESET}\n`);

  // Fetch all NGOs
  const count = await prisma.ngo.count();
  console.log(`Found ${count} records to process.`);

  let processed = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  // Process in chunks to handle memory better
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
        district: true,
        state: true,
        pincode: true,
        geocodedPincode: true,
        latitude: true,
        longitude: true,
      },
    });

    if (ngos.length === 0) break;

    for (const ngo of ngos) {
      processed++;
      cursor = ngo.id;

      const dbPincode = ngo.pincode || extractPincode(ngo.address);
      
      // Construct a robust query
      // "{CleanAddress}, {District}, {State} {Pincode}"
      const cleanAddr = cleanAddressForSearch(ngo.address);
      const parts = [
        cleanAddr,
        ngo.district,
        ngo.state,
        dbPincode
      ].filter(Boolean);
      
      const searchQuery = parts.join(", ");

      const result = await geocodeMapbox(searchQuery, dbPincode);

      const logPrefix = `[${processed}/${count}] ${ngo.name.substring(0, 30).padEnd(30)}`;

      if (!result) {
        console.log(`${logPrefix} | ${RED}NO MATCH${RESET} | Keeping existing`);
        failed++;
        continue;
      }

      // --- HYBRID VALIDATION LOGIC ---
      let status = "APPROXIMATE";
      let confidence = "LOW";
      let shouldUpdate = false;

      // Logic 1: Exact Pincode Match (High Trust)
      if (dbPincode && result.postcode && dbPincode === result.postcode) {
        status = "PRECISE";
        confidence = "HIGH";
        shouldUpdate = true;
      } 
      // Logic 2: Pincode starts with same 3 digits (Neighborhood Match)
      else if (dbPincode && result.postcode && dbPincode.substring(0, 3) === result.postcode.substring(0, 3)) {
        status = "APPROXIMATE";
        confidence = "MEDIUM";
        shouldUpdate = true;
      }
      // Logic 3: No DB Pincode, but Mapbox gives us one (Discovery)
      else if (!dbPincode && result.postcode) {
        status = "APPROXIMATE";
        confidence = "MEDIUM (New Pin)";
        shouldUpdate = true;
      }
      // Logic 4: Pincode MISMATCH (Danger Zone)
      else if (dbPincode && result.postcode && dbPincode !== result.postcode) {
        console.log(`${logPrefix} | ${YELLOW}MISMATCH${RESET} | DB:${dbPincode} vs API:${result.postcode} | Skiping to avoid drift`);
        skipped++;
        shouldUpdate = false;
      }
      // Logic 5: No Pincode in Result (Vague result)
      else {
        // If we have nothing currently, take it. If we have a Pincode centroid, maybe keep the centroid?
        // Let's assume Mapbox address match is better than nothing.
        if (!ngo.latitude) {
            shouldUpdate = true;
            status = "APPROXIMATE";
        } else {
            // Keep existing Pincode centroid as it's safer than a vague city match
            shouldUpdate = false;
            console.log(`${logPrefix} | ${YELLOW}VAGUE${RESET}    | API returned no postcode context`);
            skipped++;
        }
      }

      if (shouldUpdate) {
        await prisma.ngo.update({
          where: { id: ngo.id },
          data: {
            latitude: result.coords[1],
            longitude: result.coords[0],
            geocodingStatus: status,
            // If we didn't have a pincode before, save the one Mapbox found
            pincode: ngo.pincode || result.postcode || undefined, 
            geocodedPincode: result.postcode || ngo.geocodedPincode // Track which pin verified this
          }
        });

        const distChange = ngo.latitude 
            ? (Math.sqrt(Math.pow(Number(ngo.latitude) - result.coords[1], 2) + Math.pow(Number(ngo.longitude) - result.coords[0], 2)) * 111).toFixed(2)
            : "NEW";

        const color = status === "PRECISE" ? GREEN : CYAN;
        console.log(`${logPrefix} | ${color}${status}${RESET}   | Δ ${distChange} km | ${result.address.substring(0, 40)}...`);
        updated++;
      }
      
      await sleep(SLEEP_MS);
    }
  }

  console.log(`\n${GREEN}✨ Processing Complete!${RESET}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Failed:  ${failed}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
