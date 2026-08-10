# Phase 2: Unified Catalog Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the ~700-line monolithic catalog page with a config-driven unified layout: compact header, generic filters (sidebar on desktop, bottom sheet on mobile), active-filter chips, and one product grid for all 5 tabs.

**Architecture:** Per-tab config in `src/lib/catalog-config.ts` declares header copy, filter definitions, card variant, inquiry message, and base category filter. A thin server `page.tsx` resolves the tab, applies generic filter logic, and composes new components under `src/components/catalog/`. Filtering stays server-side via `searchParams`; the only new client component is `FilterSheet`.

**Tech Stack:** Next.js 16 App Router (server components), TypeScript, Tailwind CSS v4, existing shadcn/ui primitives, lucide-react icons. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-08-10-rkub-redesign-phase2-catalog-design.md`

**Worktree:** `/Users/dwihp2/Documents/dwihp2/rkub-web-redesign` on branch `redesign/phase1-homepage`. All commands run from the worktree root, prefixed with `rtk`.

## Global Constraints

- Design tokens from Phase 1: `--color-paper #f7f5f0`, `--color-paper-2 #ffffff`, `--color-ink #1a1814`, `--color-ink-2 #5a5650`, `--color-rule #e3dfd6`, `--color-accent #2f4f3f`, `--color-accent-ink #f7f5f0`, `--color-focus #4a7c6f`.
- Tailwind v4 shorthand preferred: `text-(--color-ink-2)` over `text-[var(--color-ink-2)]`; `rounded-card` over `rounded-[var(--radius-card)]`.
- URL contract preserved: `/catalog?tab=rental|fabric|tools|traditional|materials` + params `region`, `gender`, `ageGroup`, `color`, `width`, `toolKind`.
- Invalid `tab` falls back to `rental`. Unknown filter values are ignored.
- WhatsApp URLs via `createWhatsAppUrl(message, settings.whatsappNumber)` from `@/lib/whatsapp`.
- `ProductCard` variants used: `rental` (rental + traditional tabs), `default` (fabric), `compact` (tools), `materials` (materials).
- No new npm dependencies. `FilterSheet` is hand-rolled with `useState` + CSS transitions.
- Motion: `--ease-out` cubic-bezier(0.22, 1, 0.36, 1), 300ms; `prefers-reduced-motion` → opacity-only ≤150ms.
- Verify each task with `rtk npm run lint` and commit with `git add <files> && git commit -m "..."`.

---

### Task 1: Catalog tab config module

**Files:**
- Create: `src/lib/catalog-config.ts`
- Test: manual type-check via lint/build (no unit test runner in repo)

**Interfaces:**
- Consumes: `Product`, `ProductCategory` from `@/types/catalog`.
- Produces (used by every later task):

```ts
export type CatalogTab = "rental" | "fabric" | "tools" | "traditional" | "materials";

export type ChipFilterDef = {
  kind: "chips";
  paramKey: "region" | "gender" | "color" | "width" | "toolKind";
  label: string;
  options: { source: "static"; values: string[] } | { source: "attribute"; attributeKey: string };
  match: "tag" | "attribute";
};

export type SelectFilterDef = {
  kind: "select";
  paramKey: "ageGroup";
  label: string;
  options: { source: "static"; values: string[] };
  match: "attribute";
  allLabel: string; // e.g. "All Ages"
};

export type FilterDef = ChipFilterDef | SelectFilterDef;

export interface CatalogTabConfig {
  tab: CatalogTab;
  header: { eyebrow: string; title: string; description: string };
  cardVariant: "rental" | "default" | "compact" | "materials";
  inquiryMessage: string;
  filters: FilterDef[];
  baseFilter: (product: Product) => boolean;
  emptyState: { title: string; body: string };
}

export const CATALOG_TABS: Record<CatalogTab, CatalogTabConfig>;
export const CATALOG_TAB_ORDER: CatalogTab[]; // ["rental", "fabric", "tools", "traditional", "materials"]
export const CATALOG_TAB_LABELS: Record<CatalogTab, string>; // Rental, Fabrics, Tools, Traditional, Materials
export function resolveCatalogTab(input?: string): CatalogTab; // invalid → "rental"
```

- [ ] **Step 1: Create the config module**

Create `src/lib/catalog-config.ts` with the types above plus this config content:

```ts
import type { Product } from "@/types/catalog";

// ...type declarations as above...

const inCategories =
  (...categories: Product["category"][]) =>
  (product: Product) =>
    categories.includes(product.category);

export const CATALOG_TAB_ORDER: CatalogTab[] = ["rental", "fabric", "tools", "traditional", "materials"];

export const CATALOG_TAB_LABELS: Record<CatalogTab, string> = {
  rental: "Rental",
  fabric: "Fabrics",
  tools: "Tools",
  traditional: "Traditional",
  materials: "Materials",
};

const REGION_OPTIONS = ["Java", "Bali", "Sumatra", "Sulawesi"];
const GENDER_OPTIONS = ["Male", "Female"];

export const CATALOG_TABS: Record<CatalogTab, CatalogTabConfig> = {
  rental: {
    tab: "rental",
    header: {
      eyebrow: "Rental Collection",
      title: "Dress for the Occasion",
      description:
        "Traditional costume rentals for ceremonies, performances, and cultural events — with sizing support and fast WhatsApp assistance.",
    },
    cardVariant: "rental",
    inquiryMessage: "Hello, I want to check the rental catalog and available sizes.",
    filters: [
      { kind: "chips", paramKey: "region", label: "Region", options: { source: "static", values: REGION_OPTIONS }, match: "tag" },
      { kind: "chips", paramKey: "gender", label: "Gender", options: { source: "static", values: GENDER_OPTIONS }, match: "tag" },
      {
        kind: "select",
        paramKey: "ageGroup",
        label: "Age Group",
        options: { source: "static", values: ["Adult", "Teen", "Child (5-12)", "Toddler"] },
        match: "attribute",
        allLabel: "All Ages",
      },
    ],
    baseFilter: inCategories("rental-costumes"),
    emptyState: {
      title: "No rental costumes found",
      body: "Try adjusting your filters or inquire about availability via WhatsApp.",
    },
  },
  fabric: {
    tab: "fabric",
    header: {
      eyebrow: "Fabric Collection",
      title: "Explore Fabrics",
      description: "Brocade, cotton, and decorative textiles selected for bespoke tailoring and event-ready garments.",
    },
    cardVariant: "default",
    inquiryMessage: "Hello, I want to ask about fabric availability and pricing.",
    filters: [
      { kind: "chips", paramKey: "color", label: "Color", options: { source: "attribute", attributeKey: "color" }, match: "attribute" },
      { kind: "chips", paramKey: "width", label: "Width", options: { source: "attribute", attributeKey: "width" }, match: "attribute" },
    ],
    baseFilter: inCategories("fabrics"),
    emptyState: {
      title: "No fabrics match these filters",
      body: "Try a different color or width, or ask us on WhatsApp — new stock arrives regularly.",
    },
  },
  tools: {
    tab: "tools",
    header: {
      eyebrow: "Tools Collection",
      title: "Precision for Every Stitch",
      description: "Reliable tailoring tools — cutting, measuring, hand-sewing, and pressing essentials.",
    },
    cardVariant: "compact",
    inquiryMessage: "Hello, I want to ask about tailoring tools availability.",
    filters: [
      {
        kind: "chips",
        paramKey: "toolKind",
        label: "Tool Type",
        options: { source: "static", values: ["cutting", "measuring", "hand-sewing", "pressing"] },
        match: "tag",
      },
    ],
    baseFilter: inCategories("tailoring-tools"),
    emptyState: {
      title: "No tools found",
      body: "Try selecting a different tool type or inquire via WhatsApp.",
    },
  },
  traditional: {
    tab: "traditional",
    header: {
      eyebrow: "Traditional Collection",
      title: "Traditional Attire Catalog",
      description: "Traditional attire curated for ceremonies, formal occasions, and cultural events.",
    },
    cardVariant: "rental",
    inquiryMessage: "Hello, I want to check traditional clothing options and available sizes.",
    filters: [
      { kind: "chips", paramKey: "region", label: "Region", options: { source: "static", values: REGION_OPTIONS }, match: "tag" },
      { kind: "chips", paramKey: "gender", label: "Gender", options: { source: "static", values: GENDER_OPTIONS }, match: "tag" },
    ],
    baseFilter: inCategories("traditional-clothing"),
    emptyState: {
      title: "No traditional attire found",
      body: "Try adjusting your filters or ask us on WhatsApp about regional styles.",
    },
  },
  materials: {
    tab: "materials",
    header: {
      eyebrow: "Materials Collection",
      title: "Explore Materials",
      description: "Fabrics, beads, and decorative materials for tailoring, embellishment, and custom garment work.",
    },
    cardVariant: "materials",
    inquiryMessage: "Hello, I want to ask about materials and decorative supplies.",
    filters: [
      { kind: "chips", paramKey: "color", label: "Color", options: { source: "attribute", attributeKey: "color" }, match: "attribute" },
      { kind: "chips", paramKey: "width", label: "Width", options: { source: "attribute", attributeKey: "width" }, match: "attribute" },
    ],
    baseFilter: inCategories("fabrics", "beads-accessories", "decorative-materials"),
    emptyState: {
      title: "No materials match these filters",
      body: "Try different filters or ask us on WhatsApp — we can source specific materials.",
    },
  },
};

export function resolveCatalogTab(input?: string): CatalogTab {
  if (input === "fabric" || input === "tools" || input === "traditional" || input === "materials") return input;
  return "rental";
}
```

- [ ] **Step 2: Verify types compile**

Run: `rtk npx tsc --noEmit`
Expected: PASS (no errors referencing `catalog-config.ts`)

- [ ] **Step 3: Commit**

```bash
git add src/lib/catalog-config.ts
git commit -m "feat: add catalog tab config module"
```

---

### Task 2: Generic filter helpers

**Files:**
- Create: `src/lib/catalog-filters.ts`

**Interfaces:**
- Consumes: `FilterDef`, `CatalogTabConfig` from `@/lib/catalog-config`; `Product` from `@/types/catalog`.
- Produces:

```ts
export type CatalogParams = Partial<Record<"region" | "gender" | "ageGroup" | "color" | "width" | "toolKind", string>>;

export function getAttribute(product: Product, key: string): string | undefined;
export function resolveFilterOptions(filter: FilterDef, products: Product[]): string[];
export function applyCatalogFilters(products: Product[], config: CatalogTabConfig, params: CatalogParams): Product[];
export function getActiveFilters(config: CatalogTabConfig, params: CatalogParams): Array<{ paramKey: string; label: string; value: string }>;
export function buildCatalogHref(tab: CatalogTab, params: CatalogParams): string;
```

- [ ] **Step 1: Create the helpers module**

Create `src/lib/catalog-filters.ts`:

```ts
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
  if (filter.kind === "select" || filter.options.source === "attribute") {
    const attrKey = filter.kind === "select" ? "age-group" : filter.options.attributeKey;
    return getAttribute(product, attrKey)?.toLowerCase() === target;
  }
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
```

Note: `matchesFilter` maps `ageGroup` → attribute key `age-group` (the CMS attribute key), preserving current behavior from the old page.

- [ ] **Step 2: Verify types compile**

Run: `rtk npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/catalog-filters.ts
git commit -m "feat: add generic catalog filter helpers"
```

---

### Task 3: CatalogHeader + tab nav components

**Files:**
- Create: `src/components/catalog/catalog-header.tsx`

**Interfaces:**
- Consumes: `CatalogTabConfig` from `@/lib/catalog-config`; `WhatsAppButton` from `@/components/whatsapp-button`; `createWhatsAppUrl` from `@/lib/whatsapp`.
- Produces:

```tsx
export function CatalogHeader(props: { config: CatalogTabConfig; resultCount: number; whatsappUrl: string }): JSX.Element;
export function CatalogTabNav(props: { activeTab: CatalogTab }): JSX.Element;
```

- [ ] **Step 1: Create the components**

Create `src/components/catalog/catalog-header.tsx`:

```tsx
import Link from "next/link";

import { CATALOG_TAB_LABELS, CATALOG_TAB_ORDER, type CatalogTab, type CatalogTabConfig } from "@/lib/catalog-config";
import { buildCatalogHref } from "@/lib/catalog-filters";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";

export function CatalogHeader({
  config,
  resultCount,
  whatsappUrl,
}: {
  config: CatalogTabConfig;
  resultCount: number;
  whatsappUrl: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--color-accent)">{config.header.eyebrow}</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-(--color-ink) sm:text-4xl">{config.header.title}</h1>
        <p className="max-w-2xl text-base leading-7 text-(--color-ink-2)">{config.header.description}</p>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm text-(--color-ink-2)">
          <span className="font-semibold text-(--color-ink)">{resultCount}</span> items
        </p>
        <WhatsAppButton url={whatsappUrl} location="catalog_header" variant="outline" size="chip">
          WhatsApp Inquiry
        </WhatsAppButton>
      </div>
    </div>
  );
}

export function CatalogTabNav({ activeTab }: { activeTab: CatalogTab }) {
  return (
    <nav
      aria-label="Catalog categories"
      className="sticky top-14 z-30 -mx-4 flex gap-2 overflow-x-auto bg-(--color-paper)/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:top-16"
    >
      {CATALOG_TAB_ORDER.map((tab) => (
        <Link
          key={tab}
          href={buildCatalogHref(tab, {})}
          aria-current={activeTab === tab ? "page" : undefined}
          className={cn(
            "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
            activeTab === tab
              ? "border-(--color-accent) bg-(--color-accent) text-(--color-accent-ink)"
              : "border-(--color-rule) text-(--color-ink) hover:bg-(--color-paper-2)",
          )}
        >
          {CATALOG_TAB_LABELS[tab]}
        </Link>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `rtk npx tsc --noEmit`
Expected: PASS. If `font-display` is not a defined Tailwind utility in this project, check `globals.css` for the display-font utility name used by Phase 1 components (e.g. in `hero.tsx` or `section-header.tsx`) and use that instead.

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/catalog-header.tsx
git commit -m "feat: add catalog header and tab nav components"
```

---

### Task 4: FilterSidebar + select filter renderer

**Files:**
- Create: `src/components/catalog/filter-sidebar.tsx`
- Create: `src/components/catalog/filter-select.tsx` (client — absorbs `RentalAgeGroupSelect`)

**Interfaces:**
- Consumes: `FilterDef`, `CatalogTab` from `@/lib/catalog-config`; `CatalogParams`, `resolveFilterOptions`, `buildCatalogHref` from `@/lib/catalog-filters`; `Product` from `@/types/catalog`.
- Produces:

```tsx
export function FilterSidebar(props: {
  tab: CatalogTab;
  filters: FilterDef[];
  params: CatalogParams;
  baseProducts: Product[]; // base-filtered products, for dynamic option resolution
}): JSX.Element;

export function FilterSelect(props: {
  tab: CatalogTab;
  paramKey: string;
  label: string;
  allLabel: string;
  options: string[];
  currentValue: string;
}): JSX.Element; // "use client"
```

- [ ] **Step 1: Create the client select filter**

Create `src/components/catalog/filter-select.tsx`:

```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function FilterSelect({
  tab,
  paramKey,
  label,
  allLabel,
  options,
  currentValue,
}: {
  tab: string;
  paramKey: string;
  label: string;
  allLabel: string;
  options: string[];
  currentValue: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <select
      aria-label={label}
      value={currentValue}
      onChange={(event) => navigate(event.target.value)}
      className="w-full rounded-input border border-(--color-rule) bg-(--color-paper-2) px-3 py-2 text-sm text-(--color-ink)"
    >
      <option value="">{allLabel}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
```

Note: uses controlled `value` (not `defaultValue`) so the select stays in sync when chips/reset links change the URL.

- [ ] **Step 2: Create the sidebar**

Create `src/components/catalog/filter-sidebar.tsx`:

```tsx
import Link from "next/link";

import type { CatalogTab, FilterDef } from "@/lib/catalog-config";
import { buildCatalogHref, resolveFilterOptions, type CatalogParams } from "@/lib/catalog-filters";
import type { Product } from "@/types/catalog";
import { FilterSelect } from "@/components/catalog/filter-select";
import { cn } from "@/lib/utils";

export function FilterSidebar({
  tab,
  filters,
  params,
  baseProducts,
}: {
  tab: CatalogTab;
  filters: FilterDef[];
  params: CatalogParams;
  baseProducts: Product[];
}) {
  const hasActive = filters.some((filter) => params[filter.paramKey]?.trim());

  return (
    <div className="space-y-5 rounded-card border border-(--color-rule) bg-(--color-paper-2) p-5">
      <div className="flex items-center justify-between border-b border-(--color-rule) pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-ink-2)">Filters</p>
        {hasActive ? (
          <Link href={buildCatalogHref(tab, {})} className="text-xs font-semibold text-(--color-accent)">
            Reset
          </Link>
        ) : null}
      </div>
      {filters.map((filter) => {
        const options = resolveFilterOptions(filter, baseProducts);
        const activeValue = params[filter.paramKey]?.trim() ?? "";
        if (filter.kind === "select") {
          return (
            <div key={filter.paramKey}>
              <p className="mb-2 text-sm font-semibold text-(--color-ink)">{filter.label}</p>
              <FilterSelect
                tab={tab}
                paramKey={filter.paramKey}
                label={filter.label}
                allLabel={filter.allLabel}
                options={options}
                currentValue={activeValue}
              />
            </div>
          );
        }
        return (
          <fieldset key={filter.paramKey}>
            <legend className="mb-2 text-sm font-semibold text-(--color-ink)">{filter.label}</legend>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const isActive = activeValue.toLowerCase() === option.toLowerCase();
                return (
                  <Link
                    key={option}
                    href={buildCatalogHref(tab, { ...params, [filter.paramKey]: isActive ? undefined : option })}
                    aria-pressed={isActive}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition-colors",
                      isActive
                        ? "border-(--color-accent) bg-(--color-accent) text-(--color-accent-ink)"
                        : "border-(--color-rule) text-(--color-ink-2) hover:bg-(--color-paper)",
                    )}
                  >
                    {option}
                  </Link>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Verify types compile**

Run: `rtk npx tsc --noEmit`
Expected: PASS. If `rounded-input` is not a defined utility, use `rounded-[12px]` or the radius utility Phase 1 established for inputs (check `globals.css` `@theme` block).

- [ ] **Step 4: Commit**

```bash
git add src/components/catalog/filter-sidebar.tsx src/components/catalog/filter-select.tsx
git commit -m "feat: add filter sidebar and generic select filter"
```

---

### Task 5: ActiveFilterChips + CatalogGrid

**Files:**
- Create: `src/components/catalog/active-filter-chips.tsx`
- Create: `src/components/catalog/catalog-grid.tsx`

**Interfaces:**
- Consumes: `getActiveFilters`, `buildCatalogHref`, `CatalogParams` from `@/lib/catalog-filters`; `CatalogTabConfig` from `@/lib/catalog-config`; `ProductCard` from `@/components/product-card`; `WhatsAppButton` from `@/components/whatsapp-button`.
- Produces:

```tsx
export function ActiveFilterChips(props: {
  tab: CatalogTab;
  config: CatalogTabConfig;
  params: CatalogParams;
  baseProducts: Product[];
}): JSX.Element | null;

export function CatalogGrid(props: {
  products: Product[];
  config: CatalogTabConfig;
  whatsappUrl: string;
}): JSX.Element;
```

- [ ] **Step 1: Create ActiveFilterChips**

Create `src/components/catalog/active-filter-chips.tsx`:

```tsx
import Link from "next/link";

import type { CatalogTab, CatalogTabConfig } from "@/lib/catalog-config";
import { buildCatalogHref, getActiveFilters, type CatalogParams } from "@/lib/catalog-filters";
import type { Product } from "@/types/catalog";

export function ActiveFilterChips({
  tab,
  config,
  params,
  baseProducts,
}: {
  tab: CatalogTab;
  config: CatalogTabConfig;
  params: CatalogParams;
  baseProducts: Product[];
}) {
  const active = getActiveFilters(config, params, baseProducts);
  if (!active.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {active.map((item) => (
        <Link
          key={item.paramKey}
          href={buildCatalogHref(tab, { ...params, [item.paramKey]: undefined })}
          className="rounded-full border border-(--color-rule) bg-(--color-paper) px-3 py-1 text-xs text-(--color-ink)"
          aria-label={`Remove ${item.label} filter ${item.value}`}
        >
          {item.label}: {item.value} ✕
        </Link>
      ))}
      <Link href={buildCatalogHref(tab, {})} className="text-xs font-semibold text-(--color-accent)">
        Clear all
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Create CatalogGrid**

Create `src/components/catalog/catalog-grid.tsx`:

```tsx
import type { CatalogTabConfig } from "@/lib/catalog-config";
import type { Product } from "@/types/catalog";
import { ProductCard } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function CatalogGrid({
  products,
  config,
  whatsappUrl,
}: {
  products: Product[];
  config: CatalogTabConfig;
  whatsappUrl: string;
}) {
  if (!products.length) {
    return (
      <div className="rounded-card border border-dashed border-(--color-rule) bg-(--color-paper) p-8 text-center">
        <p className="font-semibold text-(--color-ink)">{config.emptyState.title}</p>
        <p className="mt-1 text-sm text-(--color-ink-2)">{config.emptyState.body}</p>
        <WhatsAppButton url={whatsappUrl} location="catalog_empty" variant="light" className="mt-4">
          Ask on WhatsApp
        </WhatsAppButton>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant={config.cardVariant} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verify types compile**

Run: `rtk npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/catalog/active-filter-chips.tsx src/components/catalog/catalog-grid.tsx
git commit -m "feat: add active filter chips and catalog grid components"
```

---

### Task 6: FilterSheet (mobile bottom sheet)

**Files:**
- Create: `src/components/catalog/filter-sheet.tsx`

**Interfaces:**
- Consumes: same props as `FilterSidebar` (renders the same filter UI inside a sheet); `SlidersHorizontal`, `X` from `lucide-react`.
- Produces:

```tsx
export function FilterSheet(props: {
  tab: CatalogTab;
  filters: FilterDef[];
  params: CatalogParams;
  baseProducts: Product[];
  resultCount: number;
}): JSX.Element; // "use client"

// Also exports a context + hook so BottomActionBar can open the sheet:
export function FilterSheetProvider(props: { children: React.ReactNode }): JSX.Element;
export function useFilterSheet(): { open: () => void };
```

Design note: `BottomActionBar` (in `layout.tsx`) and the catalog page are separate server trees, so the sheet's open state must live in a client provider mounted in the frontend layout. The provider renders nothing itself; `FilterSheet` registers its opener with the context.

- [ ] **Step 1: Create the sheet + provider**

Create `src/components/catalog/filter-sheet.tsx`:

```tsx
"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import type { CatalogTab, FilterDef } from "@/lib/catalog-config";
import { buildCatalogHref, resolveFilterOptions, type CatalogParams } from "@/lib/catalog-filters";
import type { Product } from "@/types/catalog";
import { FilterSelect } from "@/components/catalog/filter-select";
import { cn } from "@/lib/utils";

type FilterSheetContextValue = { open: () => void; register: (opener: () => void) => void };

const FilterSheetContext = createContext<FilterSheetContextValue>({ open: () => {}, register: () => {} });

export function useFilterSheet() {
  return useContext(FilterSheetContext);
}

export function FilterSheetProvider({ children }: { children: React.ReactNode }) {
  const openerRef = useRef<() => void>(() => {});
  const register = useCallback((opener: () => void) => {
    openerRef.current = opener;
  }, []);
  const open = useCallback(() => openerRef.current(), []);
  return <FilterSheetContext.Provider value={{ open, register }}>{children}</FilterSheetContext.Provider>;
}

export function FilterSheet({
  tab,
  filters,
  params,
  baseProducts,
  resultCount,
}: {
  tab: CatalogTab;
  filters: FilterDef[];
  params: CatalogParams;
  baseProducts: Product[];
  resultCount: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { register } = useFilterSheet();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    register(() => setIsOpen(true));
  }, [register]);

  // Close on navigation (params change means a filter link was clicked)
  const paramsKey = JSON.stringify(params);
  useEffect(() => {
    setIsOpen(false);
  }, [paramsKey]);

  // Escape closes + focus management + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const previousFocus = document.activeElement as HTMLElement | null;
    sheetRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);

  const hasActive = filters.some((filter) => params[filter.paramKey]?.trim());

  return (
    <div className={cn("fixed inset-0 z-[60] lg:hidden", !isOpen && "pointer-events-none")} aria-hidden={!isOpen}>
      <div
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity duration-300 motion-reduce:transition-opacity motion-reduce:duration-150",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={() => setIsOpen(false)}
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Catalog filters"
        tabIndex={-1}
        className={cn(
          "absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-(--color-paper-2) shadow-xl outline-none",
          "transition-transform duration-300 ease-(--ease-out) motion-reduce:transition-opacity motion-reduce:duration-150",
          isOpen ? "translate-y-0" : "translate-y-full motion-reduce:translate-y-0 motion-reduce:opacity-0",
        )}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-(--color-rule) bg-(--color-paper-2) px-5 py-4">
          <p className="text-sm font-semibold text-(--color-ink)">Filters</p>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close filters" className="rounded-full p-1 text-(--color-ink-2) hover:bg-(--color-paper)">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-5 px-5 py-5 pb-28">
          {filters.map((filter) => {
            const options = resolveFilterOptions(filter, baseProducts);
            const activeValue = params[filter.paramKey]?.trim() ?? "";
            if (filter.kind === "select") {
              return (
                <div key={filter.paramKey}>
                  <p className="mb-2 text-sm font-semibold text-(--color-ink)">{filter.label}</p>
                  <FilterSelect tab={tab} paramKey={filter.paramKey} label={filter.label} allLabel={filter.allLabel} options={options} currentValue={activeValue} />
                </div>
              );
            }
            return (
              <fieldset key={filter.paramKey}>
                <legend className="mb-2 text-sm font-semibold text-(--color-ink)">{filter.label}</legend>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => {
                    const isActive = activeValue.toLowerCase() === option.toLowerCase();
                    return (
                      <Link
                        key={option}
                        href={buildCatalogHref(tab, { ...params, [filter.paramKey]: isActive ? undefined : option })}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-sm",
                          isActive ? "border-(--color-accent) bg-(--color-accent) text-(--color-accent-ink)" : "border-(--color-rule) text-(--color-ink-2)",
                        )}
                      >
                        {option}
                      </Link>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>
        <div className="fixed inset-x-0 bottom-0 flex items-center gap-3 border-t border-(--color-rule) bg-(--color-paper-2) px-5 py-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          {hasActive ? (
            <Link href={buildCatalogHref(tab, {})} className="text-sm font-semibold text-(--color-accent)">
              Reset
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 rounded-full bg-(--color-accent) px-5 py-3 text-sm font-semibold text-(--color-accent-ink)"
          >
            Show {resultCount} results
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `rtk npx tsc --noEmit`
Expected: PASS. If `ease-(--ease-out)` is not valid in this Tailwind v4 setup, replace with `ease-[cubic-bezier(0.22,1,0.36,1)]`.

- [ ] **Step 3: Commit**

```bash
git add src/components/catalog/filter-sheet.tsx
git commit -m "feat: add mobile filter bottom sheet with provider"
```

---

### Task 7: Wire BottomActionBar Filters button to the sheet

**Files:**
- Modify: `src/components/bottom-action-bar.tsx` (catalog "Filters" action)
- Modify: `src/app/(frontend)/layout.tsx` (mount `FilterSheetProvider`)

**Interfaces:**
- Consumes: `useFilterSheet`, `FilterSheetProvider` from `@/components/catalog/filter-sheet`.
- Produces: catalog Filters button opens the sheet instead of scrolling to `#catalog-browser`.

- [ ] **Step 1: Mount the provider in the frontend layout**

In `src/app/(frontend)/layout.tsx`, import `FilterSheetProvider` from `@/components/catalog/filter-sheet` and wrap the existing children + `BottomActionBar` inside it. Keep all other layout structure unchanged.

- [ ] **Step 2: Update the catalog Filters action**

In `src/components/bottom-action-bar.tsx`:
- Import `useFilterSheet` from `@/components/catalog/filter-sheet`.
- Inside `BottomActionBar`, call `const filterSheet = useFilterSheet();`.
- Change the catalog "Filters" action from `{ label: "Filters", icon: ..., href: "#catalog-browser" }` to `{ label: "Filters", icon: ..., onClick: filterSheet.open }`.

- [ ] **Step 3: Verify lint + types**

Run: `rtk npm run lint && rtk npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/\(frontend\)/layout.tsx src/components/bottom-action-bar.tsx
git commit -m "feat: wire catalog filters button to bottom sheet"
```

---

### Task 8: Rewrite catalog page as thin config-driven composition

**Files:**
- Modify: `src/app/(frontend)/catalog/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: everything from Tasks 1–6; `getProducts`, `getSiteSettings` from `@/lib/cms`; `createMetadata` from `@/lib/seo`; `createWhatsAppUrl` from `@/lib/whatsapp`.
- Produces: the catalog route. Keeps `metadata` export unchanged.

- [ ] **Step 1: Rewrite the page**

Replace the entire contents of `src/app/(frontend)/catalog/page.tsx` with:

```tsx
import type { Metadata } from "next";

import { CATALOG_TABS, resolveCatalogTab } from "@/lib/catalog-config";
import { applyCatalogFilters, type CatalogParams } from "@/lib/catalog-filters";
import { ActiveFilterChips } from "@/components/catalog/active-filter-chips";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { CatalogHeader, CatalogTabNav } from "@/components/catalog/catalog-header";
import { FilterSheet } from "@/components/catalog/filter-sheet";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { getProducts, getSiteSettings } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createMetadata(
  "Catalog | RKUB Family Tailoring Store",
  "Browse tailoring tools, fabrics, beads, accessories, and rental costumes.",
  "/catalog",
);

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<CatalogParams & { tab?: string }>;
}) {
  const { tab, ...params } = await searchParams;
  const activeTab = resolveCatalogTab(tab);
  const config = CATALOG_TABS[activeTab];
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);

  const baseProducts = products.filter(config.baseFilter);
  const filteredProducts = applyCatalogFilters(products, config, params);
  const whatsappUrl = createWhatsAppUrl(config.inquiryMessage, settings.whatsappNumber);

  return (
    <div className="space-y-6 pb-12">
      <CatalogHeader config={config} resultCount={filteredProducts.length} whatsappUrl={whatsappUrl} />
      <CatalogTabNav activeTab={activeTab} />
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <FilterSidebar tab={activeTab} filters={config.filters} params={params} baseProducts={baseProducts} />
        </aside>
        <div className="space-y-5">
          <ActiveFilterChips tab={activeTab} config={config} params={params} baseProducts={baseProducts} />
          <CatalogGrid products={filteredProducts} config={config} whatsappUrl={whatsappUrl} />
        </div>
      </div>
      <FilterSheet tab={activeTab} filters={config.filters} params={params} baseProducts={baseProducts} resultCount={filteredProducts.length} />
    </div>
  );
}
```

- [ ] **Step 2: Verify lint + types**

Run: `rtk npm run lint && rtk npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/\(frontend\)/catalog/page.tsx
git commit -m "refactor: rewrite catalog page as config-driven composition"
```

---

### Task 9: Delete absorbed component + clean up references

**Files:**
- Delete: `src/components/rental-age-group-select.tsx`
- Modify: any file still importing it (should be none after Task 8 — verify)

- [ ] **Step 1: Verify no references remain**

Run: `rtk grep -rn "rental-age-group-select\|RentalAgeGroupSelect" src/`
Expected: no matches

- [ ] **Step 2: Delete the file**

```bash
git rm src/components/rental-age-group-select.tsx
```

- [ ] **Step 3: Verify lint + build**

Run: `rtk npm run lint && rtk npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove rental age group select absorbed into filter select"
```

---

### Task 10: Update tests + final verification

**Files:**
- Modify: `tests/catalog-visual.spec.ts`
- Modify: `tests/accessibility.spec.ts` (add filter sheet coverage)

- [ ] **Step 1: Update catalog visual spec**

Read `tests/catalog-visual.spec.ts` and update selectors/assertions to match the new layout: compact header (`h1` per tab), tab pill nav with `aria-current`, sidebar visible at desktop viewport, grid cards. Remove assertions tied to the old hero section, per-tab search inputs, and "Load More" button.

- [ ] **Step 2: Add filter sheet accessibility coverage**

In `tests/accessibility.spec.ts`, add a test at mobile viewport (e.g. 375×812):
1. Goto `/catalog`.
2. Click the "Filters" button in the bottom action bar.
3. Expect the dialog (`role="dialog"`, `aria-label="Catalog filters"`) to be visible.
4. Press `Escape` → expect dialog hidden.
5. Reopen, click a filter chip → expect URL to contain the param and dialog to close.

- [ ] **Step 3: Run the Playwright specs**

Run: `rtk npx playwright test tests/catalog-visual.spec.ts tests/accessibility.spec.ts`
Expected: PASS. If the dev server routing issue from Phase 1 persists in the worktree, run with the production build (`rtk npm run build && rtk npm run start` in a separate terminal) or note the limitation in the commit message.

- [ ] **Step 4: Full verification**

Run: `rtk npm run lint && rtk npm run build`
Expected: PASS

- [ ] **Step 5: Commit and push**

```bash
git add tests/
git commit -m "test: update catalog specs for unified layout and filter sheet"
git push origin redesign/phase1-homepage
```

---

## Self-review notes
- Spec coverage: config module (T1), filter helpers (T2), header + tab nav (T3), sidebar + select (T4), chips + grid (T5), sheet (T6), bottom bar wiring (T7), page rewrite (T8), deletion (T9), tests (T10). All spec sections map to a task.
- Type consistency: `CatalogParams`, `FilterDef`, `CatalogTabConfig`, `buildCatalogHref`, `resolveFilterOptions`, `getActiveFilters`, `applyCatalogFilters` signatures match across tasks.
- Known soft spots flagged inline: `font-display`, `rounded-input`, `ease-(--ease-out)` utility names need verification against `globals.css` during implementation.
