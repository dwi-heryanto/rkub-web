import type { Metadata } from "next";

import { CatalogBrowser } from "@/components/catalog-browser";
import { getCategories, getProducts } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "Catalog | RKUB Family Tailoring Store",
  "Browse tailoring tools, fabrics, beads, accessories, and rental costumes.",
  "/catalog",
);

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <p className="mt-2 text-sm text-[--color-text-muted]">Search by product name, aliases, tags, and categories with typo-aware matching.</p>
      </header>
      <CatalogBrowser products={products} categories={categories} />
    </div>
  );
}
