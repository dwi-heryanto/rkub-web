"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { autocomplete, searchProducts } from "@/lib/search";
import { trackEvent } from "@/lib/analytics";
import type { Category, Product } from "@/types/catalog";
import { Button } from "@/components/ui/button";

export function CatalogBrowser({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Product["category"] | undefined>("rental-costumes");
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

  const activeAttributes = Object.entries(attributeFilters);

  function clearFilters() {
    setQuery("");
    setCategory(undefined);
    setActiveTags([]);
    setAttributeFilters({});
  }

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
    <section id="catalog-browser" className="space-y-5">
      <Card className="border-border bg-surface p-0 shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-4 p-5 sm:p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Live Catalog</p>
            <h2 className="text-2xl font-semibold">Browse by rental style, size, and occasion</h2>
            <p className="max-w-2xl text-sm text-[var(--color-text-muted)]">
              Search by name, alias, tag, or category, then narrow the selection with the left rail.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="suggestion">{filtered.length} results</Badge>
            <Button variant="secondary" size="chip" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        </div>
        {suggestions.length ? (
          <div className="border-t border-border px-5 py-4 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <Badge key={suggestion} variant="suggestion">
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </Card>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="p-0 shadow-none">
            <Card className="border-0 bg-transparent p-5 shadow-none">
              <CardContent className="space-y-5 p-0">
                <label className="space-y-2 text-sm font-medium text-foreground">
                  Search the catalog
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
                    placeholder="e.g. kebaya, brokat, beads"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-foreground">
                  Category
                  <Select
                    value={category ?? "all"}
                    onValueChange={(nextValue) => {
                      const value = nextValue === "all" ? undefined : nextValue;
                      setCategory(value as Product["category"] | undefined);
                      setAttributeFilters({});
                      setActiveTags([]);
                      trackEvent("category_engagement", { category: value || "all" });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map((item) => (
                        <SelectItem key={item.slug} value={item.slug}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>

                {availableTags.length ? (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">Popular tags</p>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <Toggle
                          key={tag}
                          pressed={activeTags.includes(tag)}
                          onPressedChange={() => {
                            setActiveTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
                          }}
                        >
                          {tag}
                        </Toggle>
                      ))}
                    </div>
                  </div>
                ) : null}

                <Button variant="ghost" className="justify-start px-0 text-sm font-medium text-primary" onClick={clearFilters}>
                  Reset filters
                </Button>
              </CardContent>
            </Card>
          </Card>

          <Card className="p-0 shadow-none">
            <CardContent className="space-y-4 p-5">
              <div>
                <p className="text-sm font-semibold text-foreground">Refine the fit</p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {categoryDefinition ? `Filters for ${categoryDefinition.name.toLowerCase()}.` : "Pick a category to unlock size and region filters."}
                </p>
              </div>

              {attributeOptions.length ? (
                <div className="grid gap-3">
                  {attributeOptions.map(({ definition, options }) => (
                    <label key={definition.key} className="space-y-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                      {definition.label}
                      <Select
                        value={attributeFilters[definition.key] ?? "all"}
                        onValueChange={(nextValue) => {
                          const value = nextValue === "all" ? "" : nextValue;
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
                        <SelectTrigger>
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          {options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </label>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed border-border bg-muted p-4 text-sm text-[var(--color-text-muted)] shadow-none">
                  Select a category to show the rental-specific sizing filters.
                </Card>
              )}
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-4">
          <Card className="border-border bg-surface p-0 shadow-none">
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="text-sm font-semibold text-foreground">{filtered.length} styles ready</p>
                <p className="text-sm text-[var(--color-text-muted)]">Matched across the live search, active category, and any size or region constraints.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {query ? <Badge variant="suggestion">Search: {query}</Badge> : null}
                {category ? <Badge>{category.replace(/-/g, " ")}</Badge> : null}
                {activeTags.map((tag) => (
                  <Badge key={tag} variant="suggestion">
                    {tag}
                  </Badge>
                ))}
                {activeAttributes.map(([key, value]) => (
                  <Badge key={key} variant="suggestion">
                    {value}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {filtered.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-border bg-surface p-8 text-center text-sm text-[var(--color-text-muted)] shadow-none">
              No matching products yet. Try another keyword or category.
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
