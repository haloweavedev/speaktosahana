import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sahana Portfolio",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="1f516028-f9aa-44a0-baec-95f00bc07366"
        />
      </body>
    </html>
  );
}
