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
