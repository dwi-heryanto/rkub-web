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
  const [prevParamsKey, setPrevParamsKey] = useState(paramsKey);
  if (prevParamsKey !== paramsKey) {
    setPrevParamsKey(paramsKey);
    setIsOpen(false);
  }

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
