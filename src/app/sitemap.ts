import type { MetadataRoute } from "next";

import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkub-web.example.com";

  return [
    "",
    "/catalog",
    ...products.map((product) => `/products/${product.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
