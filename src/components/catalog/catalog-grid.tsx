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
