import type { Metadata } from "next";
import { FALLBACK_PHONE_NUMBER } from "@/lib/whatsapp";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkub-web.example.com";

export function createMetadata(title: string, description: string, path = "/"): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    keywords: [
      "tailoring store",
      "fabric store",
      "rental costumes",
      "traditional clothing rental",
      "sewing tools",
    ],
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export function createLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "RKUB Family Tailoring Store",
    description: "Tailoring equipment, fabrics, accessories, rentals, and custom tailoring services.",
    areaServed: "Indonesia",
    telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || `+${FALLBACK_PHONE_NUMBER}`,
    url: siteUrl,
  };
}
