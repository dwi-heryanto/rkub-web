# RKUB Redesign — Phase 2: Unified Catalog Page

## Status
Approved design spec. Ready for implementation plan.

## Context
Phase 1 established the Soft Editorial Market design system (warm cream paper `#f7f5f0`, deep forest accent `#2f4f3f`, Lora 600 display + Source Sans 3 body, pill buttons, 16px cards) and redesigned the homepage. Phase 2 redesigns the catalog page.

The current catalog page (`src/app/(frontend)/catalog/page.tsx`) is a ~700-line monolith with 5 divergent tab layouts (rental, fabric, tools, traditional, materials), each with different hero, filter, and grid treatments. Some filters are decorative (traditional tab renders non-functional spans), per-tab search boxes duplicate the global search, and a "Load More" button exists with no pagination behind it.

## Decisions (from brainstorming)
- **Scope:** Unify all 5 tabs into one layout system.
- **Mobile filters:** Bottom sheet/drawer triggered from the bottom action bar.
- **Hero:** Compact editorial header per tab (no large image hero).
- **Search:** Global search only — per-tab search boxes removed.
- **Architecture:** Approach A — config-driven unified catalog.

## Goals
1. One consistent catalog layout across all 5 tabs, driven by a per-tab config object.
2. Real, working filters on every tab (traditional tab filters become functional).
3. Mobile filter UX via bottom sheet, wired to the existing `BottomActionBar` "Filters" slot.
4. Shrink `page.tsx` from ~700 lines to ~150 lines.
5. Preserve the existing URL contract: `/catalog?tab=...&region=...&gender=...&ageGroup=...&color=...&width=...&toolKind=...`.

## Non-goals (Phase 2)
- Product detail page redesign (Phase 3).
- CMS schema or Payload collection changes.
- Pagination or infinite scroll (catalog counts are small; "Load More" is removed).
- Sort options.
- New search backend — global search stays as-is.

## Architecture

### Route contract (unchanged)
`/catalog?tab=rental|fabric|tools|traditional|materials` plus filter params. All filtering stays server-side via `searchParams`. No client-side data fetching.

### File structure

```
src/app/(frontend)/catalog/page.tsx        — thin server component (~150 lines)
src/lib/catalog-config.ts                  — per-tab config (new)
src/components/catalog/
  catalog-header.tsx                       — compact editorial header (new)
  filter-sidebar.tsx                       — desktop sticky sidebar (new)
  filter-sheet.tsx                         — "use client" mobile bottom sheet (new)
  active-filter-chips.tsx                  — removable chips row (new)
  catalog-grid.tsx                         — product grid + empty state (new)
```

### Data flow
1. `page.tsx` awaits `searchParams`, resolves `activeTab`, fetches `getProducts()` + `getSiteSettings()`.
2. Looks up `CATALOG_TABS[activeTab]` in `catalog-config.ts` — header copy, filter definitions, card variant, empty-state copy, WhatsApp inquiry message.
3. Applies the tab's `applyFilters` pure function to the product list.
4. Renders: `CatalogHeader` → tab pill nav → `FilterSidebar` (desktop) / `FilterSheet` (mobile) + `ActiveFilterChips` + `CatalogGrid`.

### Tab config shape

```ts
type FilterDef =
  | {
      kind: "chips";
      paramKey: string;              // e.g. "region", "color"
      label: string;                 // e.g. "Region"
      options: { source: "static"; values: string[] }
             | { source: "attribute"; attributeKey: string };  // distinct values from products
      match: "tag" | "attribute";    // match against product.tags or product.attributes
    }
  | {
      kind: "select";
      paramKey: string;              // e.g. "ageGroup"
      label: string;
      options: { source: "static"; values: string[] };
      match: "attribute";
    };

interface CatalogTabConfig {
  tab: CatalogTab;                   // "rental" | "fabric" | "tools" | "traditional" | "materials"
  header: { eyebrow: string; title: string; description: string };
  cardVariant: "rental" | "default" | "compact" | "materials";
  inquiryMessage: string;            // WhatsApp prefilled message
  filters: FilterDef[];
  baseFilter: (product: Product) => boolean;       // category membership
  emptyState: { title: string; body: string };
}
```

Filter application is generic: the page walks `filters`, reads each `paramKey` from `searchParams`, and filters products by `match` rule. No per-tab filter code outside config.

## Components

### `CatalogHeader` (server)
- Eyebrow (uppercase, tracking-wide, `--color-accent`), Lora 600 title (`--text-2xl`–`--text-3xl`), one-line description in `--color-ink-2`.
- Right side: result count ("24 items") + WhatsApp inquiry pill (outline variant).
- Compact, ~120px tall. No hero image, no badge cards.

### Tab nav (server)
- Horizontally scrollable pill row (5 tabs), sticky under the top nav (`top-14` mobile / `top-16` desktop).
- Active tab: filled `--color-accent` pill with `--color-accent-ink` text; inactive: `--color-rule` border.

### `FilterSidebar` (server, desktop ≥lg)
- Sticky (`top-28`), `--color-paper-2` card, 16px radius, 260–280px wide.
- Renders `FilterDef[]` generically: fieldset + legend + chip links. Toggle behavior: clicking an active chip clears that param.
- `kind: "select"` renders a client select that navigates via URL params (absorbs `RentalAgeGroupSelect`).
- "Reset all" link at top-right when any filter is active.

### `FilterSheet` (client, mobile <lg)
- Triggered by the **Filters** button in the existing `BottomActionBar` (Phase 1 spec already defines this slot).
- Slide-up sheet: max 85vh, rounded-top-2xl, drag handle, backdrop scrim.
- Content: same `FilterDef[]` rendered as chip groups + sticky footer with "Show N results" (accent pill, closes sheet) and "Reset".
- Implementation: controlled `useState` open/close + CSS transform transition (`--ease-out`, 300ms); `prefers-reduced-motion` falls back to opacity-only ≤150ms. No new dependency. Body scroll locked while open.
- Chips inside the sheet are plain `<Link>` hrefs — selecting one navigates and the sheet closes on navigation.
- Accessibility: focus moves into sheet on open, Escape closes, focus returns to trigger.

### `ActiveFilterChips` (server)
- Row above the grid showing active filters as removable chips (`Region: Java ✕`), each a link that removes that param. "Clear all" at the end. Hidden when no filters active.

### `CatalogGrid` (server)
- 3-up desktop / 2-up tablet / 1-up mobile, gap-5.
- Card variant from tab config.
- Empty state: dashed-border card, title + body from config, WhatsApp button with tab-specific inquiry message.
- "Load More" button removed (non-functional; no pagination exists).

### Bottom action bar (catalog context)
Home · Filters (opens sheet) · Search (opens global search) · Chat on WhatsApp — per Phase 1 spec.

## Per-tab config

| Tab | Filters | Card variant | Notes |
|---|---|---|---|
| `rental` | Region (chips: Java, Bali, Sumatra, Sulawesi) · Gender (chips: Male, Female) · Age Group (select) | `rental` | `RentalAgeGroupSelect` absorbed into generic select renderer |
| `fabric` | Color (chips, from `color` attribute) · Width (chips, from `width` attribute) | `default` | Options derived from products, not hardcoded |
| `tools` | Tool kind (chips: All, Cutting, Measuring, Hand Sewing, Pressing) | `compact` | Tag-based matching, same as today |
| `traditional` | Region (chips) · Gender (chips) | `rental` | Currently decorative spans — become real working filters |
| `materials` | Color (chips, from attribute) · Width (chips, from attribute) | `materials` | Same dynamic options as fabric |

Dynamic options (`source: "attribute"`) are computed at render time from the tab's base-filtered products, sorted alphabetically, deduplicated case-insensitively.

## Error handling
- Invalid `tab` param → falls back to `rental` (current behavior, kept).
- Unknown filter param values → ignored (no match, no crash). Active-filter chips only render values present in the filter definition.
- Empty results → config-driven empty state with WhatsApp CTA.
- `getProducts()` failure → existing `src/app/(frontend)/catalog/error.tsx` boundary stays as-is.

## Testing
- Update `tests/catalog-visual.spec.ts` for the new layout.
- Extend `tests/accessibility.spec.ts`: filter sheet focus trap, Escape closes, focus return, `aria-current` on active tab pill, chips are real links.
- `tests/button-contrast.spec.ts` should pass unchanged (Phase 1 tokens reused).
- Manual check: all 5 tabs × filter combinations × mobile sheet open/close.

## Files to change
- `src/app/(frontend)/catalog/page.tsx` — rewrite as thin config-driven page
- `src/components/bottom-action-bar.tsx` — wire Filters button to `FilterSheet` (catalog context)
- `tests/catalog-visual.spec.ts`, `tests/accessibility.spec.ts` — update

## Files to create
- `src/lib/catalog-config.ts`
- `src/components/catalog/catalog-header.tsx`
- `src/components/catalog/filter-sidebar.tsx`
- `src/components/catalog/filter-sheet.tsx`
- `src/components/catalog/active-filter-chips.tsx`
- `src/components/catalog/catalog-grid.tsx`

## Files to delete
- `src/components/rental-age-group-select.tsx` — absorbed into generic select filter

## Net effect
- `page.tsx`: ~700 → ~150 lines.
- Per-tab search boxes deleted (global search only).
- Dead "Load More" removed.
- Traditional tab filters become functional.

## Risks
- Filter sheet is the only new client component; keep it dependency-free to avoid bundle growth.
- Dynamic attribute options depend on CMS data hygiene (e.g. "Ivory" vs "ivory") — mitigated by case-insensitive dedupe.
- Removing per-tab search may surface if users relied on it — global search covers the same products.

## Next steps
1. Invoke `writing-plans` skill to create the implementation plan.
2. Implement in the existing worktree on branch `redesign/phase1-homepage` (or a new `redesign/phase2-catalog` branch — decide at plan time).
3. Validate with lint, build, and the Playwright specs above.
