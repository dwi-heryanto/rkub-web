"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product-card";
import { categories } from "@/data/products";
import { autocomplete, searchProducts } from "@/lib/search";
import { trackEvent } from "@/lib/analytics";
import type { Product } from "@/types/catalog";

export function CatalogBrowser({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Product["category"] | "">("");

  const suggestions = useMemo(() => autocomplete(products, query), [products, query]);
  const filtered = useMemo(() => searchProducts(products, query, category || undefined), [products, query, category]);

  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="space-y-2 text-sm font-medium text-[--color-text]">
            Search by name, alias, tags, or category
            <input
              className="w-full rounded-2xl border border-black/10 bg-[--color-bg] px-4 py-3 text-sm focus:border-[--color-deep-teal] focus:outline-none"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setQuery(value);
                if (value.trim()) {
                  trackEvent("catalog_search", { search_term: value.trim() });
                }
              }}
              placeholder="e.g. brokat, kebaya, beads"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-[--color-text]">
            Category
            <select
              className="w-full rounded-2xl border border-black/10 bg-[--color-bg] px-4 py-3 text-sm focus:border-[--color-deep-teal] focus:outline-none"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value as Product["category"] | "");
                trackEvent("category_engagement", { category: event.target.value || "all" });
              }}
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {suggestions.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <li key={suggestion} className="rounded-full bg-[--color-sky-haze] px-3 py-1 text-xs text-[--color-forest-canopy]">
                {suggestion}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/15 bg-white p-8 text-center text-sm text-[--color-text-muted]">
          No matching products yet. Try another keyword or category.
        </div>
      )}
    </section>
  );
}
