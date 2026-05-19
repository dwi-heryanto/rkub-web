import type { MetadataRoute } from "next";

import { getProducts } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkub-web.example.com";

  return [
    "",
    "/catalog",
    ...products.map((product) => `/products/${product.slug}`),
  ].map((path) => ({
    url: `${settings ? baseUrl : baseUrl}${path}`,
    priority: path === "" ? 1 : 0.7,
  }));
}
