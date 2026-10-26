import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/scrape", "/api/"],
      },
    ],
    sitemap: "https://purplepages.speaktosahana.com/sitemap.xml",
  };
}
