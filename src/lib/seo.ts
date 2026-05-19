import type { Metadata } from "next";
import type { SiteSettings } from "@/types/content";
import { FALLBACK_PHONE_NUMBER } from "@/lib/whatsapp";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkub-web.example.com";

export function createMetadata(title: string, description: string, path = "/", image?: string): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image ? (image.startsWith("http") ? image : `${siteUrl}${image}`) : undefined;

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
      images: ogImage ? [{ url: ogImage }] : undefined,
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

export function createLocalBusinessJsonLd(settings?: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: settings?.siteName || "RKUB Family Tailoring Store",
    description: settings?.description || "Tailoring equipment, fabrics, accessories, rentals, and custom tailoring services.",
    areaServed: settings?.address || "Indonesia",
    telephone: settings?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || `+${FALLBACK_PHONE_NUMBER}`,
    url: siteUrl,
  };
}
