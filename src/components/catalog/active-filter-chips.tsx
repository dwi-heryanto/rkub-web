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
