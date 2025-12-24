import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import Script from "next/script";
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
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="53eb23f2-77eb-4704-8178-499e06cf026b"
        />
      </body>
    </html>
  );
}