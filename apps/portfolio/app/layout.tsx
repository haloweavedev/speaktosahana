import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import SmoothScrolling from "./components/SmoothScrolling";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://speaktosahana.com"), // Replace with actual domain
  title: {
    default: "Sahana L | Strategic Initiatives Lead & Disability Advocate",
    template: "%s | Sahana L",
  },
  description:
    "Portfolio of Sahana L, a Strategic Initiatives Lead at APD and Disability Advocate. Specializing in inclusion strategy, NGO ecosystem building, and CSR impact analysis.",
  keywords: [
    "Sahana L",
    "Sahana",
    "Disability Advocate",
    "Strategic Initiatives Lead",
    "APD",
    "Association of People with Disability",
    "Inclusion Strategy",
    "CSR Strategy",
    "Social Impact",
    "NGO Ecosystem",
    "Accessibility Consultant",
    "Bengaluru",
    "India",
  ],
  authors: [{ name: "Sahana L", url: "https://linkedin.com/in/sahanal" }],
  creator: "Sahana L",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://speaktosahana.com",
    title: "Sahana L | Strategic Initiatives Lead & Disability Advocate",
    description:
      "Architecting ecosystems where accessibility is an instinct. Explore the portfolio of Sahana L, bridging the gap between charity and strategy.",
    siteName: "Sahana L Portfolio",
    images: [
      {
        url: "/opengraph-image.png", // Add this image to /public (1200x630px)
        width: 1200,
        height: 630,
        alt: "Sahana L - Strategic Initiatives Lead",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahana L | Strategic Initiatives Lead",
    description: "Inclusion isn't charity. It is strategy. View the professional portfolio of Sahana L.",
    images: ["/opengraph-image.png"], // Reusing OG image is standard
    creator: "@sahanal", // Update if a Twitter handle exists, otherwise remove
  },
  icons: {
    icon: "/icon.png", // Add to /public (32x32px or 192x192px)
    shortcut: "/favicon.ico", // Add to /public (32x32px)
    apple: "/apple-icon.png", // Add to /public (180x180px)
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sahana L",
              givenName: "Sahana",
              familyName: "L",
              jobTitle: "Lead - Strategic Initiatives",
              worksFor: {
                "@type": "Organization",
                name: "The Association of People with Disability (APD)",
              },
              alumniOf: [
                {
                  "@type": "CollegeOrUniversity",
                  name: "Tata Institute of Social Sciences",
                },
                {
                  "@type": "CollegeOrUniversity",
                  name: "Lady Shri Ram College for Women",
                },
              ],
              url: "https://speaktosahana.com",
              sameAs: ["https://linkedin.com/in/sahanal"],
              description:
                "Strategic Initiatives Lead at APD and Disability Advocate specializing in inclusion strategy and NGO ecosystem building.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressCountry: "IN",
              },
            }),
          }}
        />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="1f516028-f9aa-44a0-baec-95f00bc07366"
        />
      </body>
    </html>
  );
}
