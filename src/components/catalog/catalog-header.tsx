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
