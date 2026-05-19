import type { Metadata } from "next";

import { AnalyticsScripts } from "@/components/analytics-scripts";
import { Navbar } from "@/components/navbar";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { createMetadata } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = createMetadata(
  "RKUB Family Tailoring Store",
  "Minimalist mobile-first catalog for tailoring tools, fabrics, accessories, rentals, and custom tailoring services.",
);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[--color-bg] text-[--color-text]">
        <AnalyticsScripts />
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        <WhatsAppFab />
      </body>
    </html>
  );
}
