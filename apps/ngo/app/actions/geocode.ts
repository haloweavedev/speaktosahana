"use server";

import axios from "axios";

export type GeocodeResult = {
  lat: number;
  lng: number;
  address: string;
};

export async function geocodeLocation(query: string): Promise<GeocodeResult | null> {
  const apiKey = process.env.GOOGLE_MAPS_API;
  
  if (!apiKey) {
    console.error("Missing GOOGLE_MAPS_API key");
    throw new Error("Server configuration error");
  }

  try {
    const url = "https://maps.googleapis.com/maps/api/geocode/json";
    const response = await axios.get(url, {
      params: {
        address: query,
        key: apiKey,
        region: "in", // Bias towards India
      },
    });

    if (response.data.status === "OK" && response.data.results.length > 0) {
      const result = response.data.results[0];
      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        address: result.formatted_address,
      };
    }
    
    console.warn("Geocoding failed:", response.data.status);
    return null;

  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
