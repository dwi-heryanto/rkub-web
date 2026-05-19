"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product-card";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { autocomplete, searchProducts } from "@/lib/search";
import { trackEvent } from "@/lib/analytics";
import type { Category, Product } from "@/types/catalog";

export function CatalogBrowser({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Product["category"] | undefined>(undefined);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [attributeFilters, setAttributeFilters] = useState<Record<string, string>>({});

  const suggestions = useMemo(() => autocomplete(products, query), [products, query]);
  const filtered = useMemo(() => {
    const searched = searchProducts(products, query, category);
    const tagFiltered = activeTags.length ? searched.filter((product) => activeTags.every((tag) => product.tags.includes(tag))) : searched;
    const attributeFiltered = Object.keys(attributeFilters).length
      ? tagFiltered.filter((product) =>
          Object.entries(attributeFilters).every(([key, value]) =>
            product.attributes.some((attribute) => attribute.key === key && attribute.value === value),
          ),
        )
      : tagFiltered;
    return attributeFiltered;
  }, [products, query, category, activeTags, attributeFilters]);

  const categoryDefinition = categories.find((item) => item.slug === category);
  const availableTags = useMemo(() => {
    const pool = category ? products.filter((product) => product.category === category) : products;
    return Array.from(new Set(pool.flatMap((product) => product.tags))).slice(0, 8);
  }, [products, category]);

  const attributeOptions = useMemo(() => {
    if (!categoryDefinition) return [];
    const pool = products.filter((product) => product.category === categoryDefinition.slug);
    return categoryDefinition.attributes.map((definition) => ({
      definition,
      options: Array.from(
        new Set(
          pool
            .flatMap((product) => product.attributes)
            .filter((attribute) => attribute.key === definition.key)
            .map((attribute) => attribute.value),
        ),
      ),
    }));
  }, [products, categoryDefinition]);

  return (
    <section className="space-y-5">
      <div className="rounded-[var(--radius-card)] border border-[--color-border] bg-[--color-surface] p-4 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="space-y-2 text-sm font-medium text-[--color-text]">
            Search by name, alias, tags, or category
            <Input
              type="search"
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
            <Select
              value={category ?? ""}
              onChange={(event) => {
                const value = event.target.value || undefined;
                setCategory(value as Product["category"] | undefined);
                setAttributeFilters({});
                setActiveTags([]);
                trackEvent("category_engagement", { category: value || "all" });
              }}
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </Select>
          </label>
        </div>
        {availableTags.length ? (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[--color-text-muted]">Popular tags</p>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Chip
                  key={tag}
                  isActive={activeTags.includes(tag)}
                  onClick={() => {
                    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
                  }}
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
        ) : null}
        {attributeOptions.length ? (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {attributeOptions.map(({ definition, options }) => (
              <label key={definition.key} className="space-y-2 text-xs font-semibold uppercase tracking-wide text-[--color-text-muted]">
                {definition.label}
                <Select
                  value={attributeFilters[definition.key] ?? ""}
                  onChange={(event) => {
                    const value = event.target.value;
                    setAttributeFilters((prev) => {
                      if (!value) {
                        const rest = { ...prev };
                        delete rest[definition.key];
                        return rest;
                      }
                      return { ...prev, [definition.key]: value };
                    });
                  }}
                >
                  <option value="">All</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </label>
            ))}
          </div>
        ) : null}
        {suggestions.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <li key={suggestion} className="rounded-[var(--radius-pill)] bg-[--color-sky-haze] px-3 py-1 text-xs text-[--color-forest-canopy]">
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
        <div className="rounded-[var(--radius-card)] border border-dashed border-[--color-border-strong] bg-[--color-surface] p-8 text-center text-sm text-[--color-text-muted]">
          No matching products yet. Try another keyword or category.
        </div>
      )}
    </section>
  );
}
