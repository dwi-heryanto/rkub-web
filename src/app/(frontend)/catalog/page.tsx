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
