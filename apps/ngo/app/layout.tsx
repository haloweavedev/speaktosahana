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
  metadataBase: new URL("https://purplepages.speaktosahana.com"),
  title: {
    default:
      "PurplePages | NGO Directory for Disability Services in Bengaluru",
    template: "%s | PurplePages",
  },
  description:
    "PurplePages (Purple Pages) is an open NGO directory of 1,300+ disability and social sector organizations in Bengaluru, India. Search by sector, proximity, and need. Built by Sahana L at Speak to Sahana.",
  keywords: [
    "purple pages",
    "purplePages",
    "purple nav",
    "purpleNav",
    "speak to sahana",
    "sahana l",
    "NGO directory Bengaluru",
    "disability NGO India",
    "disability services Bengaluru",
    "social sector directory",
    "NGO map India",
    "find NGOs near me",
    "inclusion directory",
    "nonprofit directory India",
    "accessible services Bengaluru",
  ],
  authors: [{ name: "Sahana L" }],
  creator: "Sahana L",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://purplepages.speaktosahana.com",
    title: "PurplePages | NGO Directory for Disability Services in Bengaluru",
    description:
      "Discover 1,300+ disability and social sector NGOs in Bengaluru. Search by sector, proximity, and need.",
    siteName: "PurplePages",
  },
  twitter: {
    card: "summary_large_image",
    title: "PurplePages | NGO Directory for Disability Services in Bengaluru",
    description:
      "Discover 1,300+ disability and social sector NGOs in Bengaluru. Search by sector, proximity, and need.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
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
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PurplePages",
              url: "https://purplepages.speaktosahana.com",
              description:
                "Open NGO directory of 1,300+ disability and social sector organizations in Bengaluru, India.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://purplepages.speaktosahana.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PurplePages",
              url: "https://purplepages.speaktosahana.com",
              description:
                "An intelligence layer for the social sector — mapping 1,300+ NGOs serving persons with disabilities in Bengaluru.",
              founder: {
                "@type": "Person",
                name: "Sahana L",
              },
            }),
          }}
        />
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