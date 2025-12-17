"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { NearestNgo } from "../actions/get-nearest-ngos";

// Define the props interface here as well to export it or just reuse
interface MapViewProps {
  ngos: NearestNgo[];
  userLocation: { lat: number; lon: number } | null;
  selectedNgoId: string | null;
  onSelectNgo: (id: string | null) => void;
}

const MapViewCore = dynamic(() => import("./map-view-core"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
      <Loader2 className="w-8 h-8 animate-spin mb-2" />
      <span className="text-sm">Loading Map...</span>
    </div>
  ),
});

export default function MapView(props: MapViewProps) {
  return <MapViewCore {...props} />;
}
