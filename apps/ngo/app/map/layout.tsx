import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PurpleNav | Interactive NGO Map - Find Services Near You",
  description:
    "PurpleNav (Purple Nav) — an interactive map to find disability services and NGOs near you in Bengaluru. Use geolocation to discover nearby organizations by sector.",
  keywords: [
    "purple nav",
    "purpleNav",
    "NGO map",
    "find NGOs near me",
    "disability services map Bengaluru",
    "interactive NGO map India",
    "geolocation NGO finder",
  ],
};

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
