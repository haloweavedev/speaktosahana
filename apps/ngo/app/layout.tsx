import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Purple Pages | Discover NGOs by need, sector, and proximity",
  description:
    "Find NGOs by sector intersections, nearby partners, and accessible services. Built for donors, NGOs, volunteers, and persons with disabilities.",
  openGraph: {
    title: "Purple Pages | Discover NGOs by need, sector, and proximity",
    description:
      "Find NGOs by sector intersections, nearby partners, and accessible services. Built for donors, NGOs, volunteers, and persons with disabilities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
