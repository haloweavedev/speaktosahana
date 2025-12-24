import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const playfair = localFont({
  src: [
    {
      path: "./fonts/GeistVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = localFont({
  src: [
    {
      path: "./fonts/GeistVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
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
      </body>
    </html>
  );
}
