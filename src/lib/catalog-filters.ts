import type { CatalogTab, CatalogTabConfig, FilterDef } from "@/lib/catalog-config";
import type { Product } from "@/types/catalog";

export type CatalogParams = Partial<Record<"region" | "gender" | "ageGroup" | "color" | "width" | "toolKind", string>>;

export function getAttribute(product: Product, key: string): string | undefined {
  return product.attributes.find((item) => item.key === key)?.value;
}

/** Resolve chip/select options. Attribute-sourced options are distinct values from the given products, deduped case-insensitively, sorted A-Z. */
export function resolveFilterOptions(filter: FilterDef, products: Product[]): string[] {
  if (filter.options.source === "static") return filter.options.values;
  const seen = new Map<string, string>();
  for (const product of products) {
    const value = getAttribute(product, filter.options.attributeKey);
    if (value && !seen.has(value.toLowerCase())) seen.set(value.toLowerCase(), value);
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b));
}

function matchesFilter(product: Product, filter: FilterDef, value: string): boolean {
  const target = value.toLowerCase();
  if (filter.match === "tag") return product.tags.some((tag) => tag.toLowerCase() === target);
  if (filter.kind === "select") return getAttribute(product, "age-group")?.toLowerCase() === target;
  if (filter.options.source === "attribute") return getAttribute(product, filter.options.attributeKey)?.toLowerCase() === target;
  return false;
}

/** Apply base category filter, then every active param filter. Unknown values simply match nothing. */
export function applyCatalogFilters(products: Product[], config: CatalogTabConfig, params: CatalogParams): Product[] {
  let result = products.filter(config.baseFilter);
  for (const filter of config.filters) {
    const value = params[filter.paramKey]?.trim();
    if (value) result = result.filter((product) => matchesFilter(product, filter, value));
  }
  return result;
}

/** Active filters for the chips row. Only values present in the resolved options are returned. */
export function getActiveFilters(
  config: CatalogTabConfig,
  params: CatalogParams,
  products: Product[],
): Array<{ paramKey: string; label: string; value: string }> {
  const active: Array<{ paramKey: string; label: string; value: string }> = [];
  for (const filter of config.filters) {
    const value = params[filter.paramKey]?.trim();
    if (!value) continue;
    const options = resolveFilterOptions(filter, products);
    const recognized = options.find((option) => option.toLowerCase() === value.toLowerCase());
    if (recognized) active.push({ paramKey: filter.paramKey, label: filter.label, value: recognized });
  }
  return active;
}

/** Build a /catalog href. Omits empty values; always includes tab. */
export function buildCatalogHref(tab: CatalogTab, params: CatalogParams): string {
  const query = new URLSearchParams();
  query.set("tab", tab);
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  return `/catalog?${query.toString()}`;
}
