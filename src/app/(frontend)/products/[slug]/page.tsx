import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { ProductInquiryPanel } from "@/components/product-inquiry-panel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getProductBySlug, getProducts, getRelatedProducts, getSiteSettings } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";
import { createInquiryMessage, createWhatsAppUrl } from "@/lib/whatsapp";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return createMetadata("Product Not Found", "Product was not found.");
  }
  return createMetadata(`${product.name} | RKUB`, product.description, `/products/${product.slug}`, product.image);
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const settings = await getSiteSettings();
  const isBrocadeDetail = product.slug === "premium-brocade-lace";
  const isBeadsDetail = product.slug === "premium-glass-seed-beads";
  const isShearsDetail = product.slug === "gingher-shears-tool";
  const isBeskapDetail = product.slug === "premium-javanese-beskap";

  const whatsappUrl = createWhatsAppUrl(createInquiryMessage(product));
  const catalogTab =
    product.category === "tailoring-tools"
      ? "tools"
      : product.category === "traditional-clothing"
        ? "traditional"
        : product.category === "beads-accessories" || product.category === "decorative-materials"
          ? "materials"
          : product.category === "rental-costumes"
            ? "rental"
            : "fabric";

  const detailVariant = {
    "premium-glass-seed-beads": {
      badge: "Premium Beads",
      highlight: "Detailed embellishment ready",
      highlightPanelClass: "border-0 bg-[var(--color-sky-haze)] p-4 shadow-none",
      badgeClass: "bg-[var(--color-sky-haze)] text-[var(--color-deep-teal)]",
      spotlightAttributeIndex: 2,
    },
    "gingher-shears-tool": {
      badge: "Professional Tool",
      highlight: "Precision cutting for atelier work",
      highlightPanelClass: "border-0 bg-[var(--color-soft-peach)] p-4 shadow-none",
      badgeClass: "bg-[var(--color-soft-peach)] text-[var(--color-deep-teal)]",
      spotlightAttributeIndex: 0,
    },
    "premium-javanese-beskap": {
      badge: "Traditional Wear",
      highlight: "Ceremonial-ready curated set",
      highlightPanelClass: "border-0 bg-[var(--color-muted-mandarin)] p-4 shadow-none",
      badgeClass: "bg-[var(--color-muted-mandarin)] text-[var(--color-deep-teal)]",
      spotlightAttributeIndex: 1,
    },
    "premium-brocade-lace": {
      badge: "Featured Product",
      highlight: "Heritage lace with modern finish",
      highlightPanelClass: "border-0 bg-[var(--color-sky-haze)] p-4 shadow-none",
      badgeClass: "bg-[var(--color-soft-peach)] text-[var(--color-deep-teal)]",
      spotlightAttributeIndex: 1,
    },
  }[product.slug] || {
    badge: "Featured Product",
    highlight: "Curated quality for tailoring workflow",
    highlightPanelClass: "border-0 bg-[var(--color-sky-haze)] p-4 shadow-none",
    badgeClass: "bg-[var(--color-soft-peach)] text-[var(--color-deep-teal)]",
    spotlightAttributeIndex: 1,
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery,
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: product.unitPrice,
      availability: "https://schema.org/InStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://rkub-web.example.com"}/products/${product.slug}`,
    },
    brand: settings.siteName,
  };

  return (
    <article className="space-y-8 pb-24 md:pb-0">
      <Script id="product-jsonld" type="application/ld+json">
        {JSON.stringify(productJsonLd)}
      </Script>

      <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] sm:text-sm">
        <Link href="/" className="hover:text-[var(--color-deep-teal)]">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/catalog?tab=${catalogTab}`} className="hover:text-[var(--color-deep-teal)]">
          Catalog
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold text-foreground">{product.name}</span>
      </nav>

      <div className={`grid gap-6 ${isBeadsDetail || isShearsDetail || isBeskapDetail ? "md:grid-cols-2" : "lg:grid-cols-12"}`}>
        <div className="space-y-4 lg:col-span-7">
          <Card className={`overflow-hidden border-0 p-0 ${isBrocadeDetail || isBeadsDetail || isShearsDetail || isBeskapDetail ? "rounded-[16px] bg-white" : "bg-[var(--color-soft-peach)]"}`}>
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={1200}
                height={800}
                className={`w-full object-cover ${isBeadsDetail ? "aspect-square" : isShearsDetail ? "aspect-[4/3]" : isBeskapDetail ? "aspect-[4/5]" : ""}`}
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${detailVariant.badgeClass}`}>
                {detailVariant.badge}
              </div>
            </div>
          </Card>
          <div className={`grid gap-3 sm:grid-cols-3 ${isBrocadeDetail ? "grid-cols-4 sm:grid-cols-4" : isBeadsDetail ? "grid-cols-3" : isBeskapDetail ? "grid-cols-4 sm:grid-cols-4" : "grid-cols-3"}`}>
            {product.gallery.map((image, index) => (
              <Card key={`${image}-${index}`} className={`overflow-hidden border-0 p-0 ${isBrocadeDetail || isBeadsDetail || isShearsDetail || isBeskapDetail ? "rounded-[12px] bg-white" : "bg-[var(--color-muted-mandarin)]"}`}>
                <Image
                  src={image}
                  alt={`${product.name} preview ${index + 1}`}
                  width={320}
                  height={320}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 25vw, 12vw"
                />
              </Card>
            ))}
          </div>
        </div>

        <Card className={`space-y-5 lg:col-span-5 ${isBrocadeDetail || isBeadsDetail || isShearsDetail || isBeskapDetail ? "rounded-[16px] border border-border bg-white shadow-none" : ""}`}>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-deep-teal)]">
              {isShearsDetail ? "Professional Grade" : isBeskapDetail ? "Premium Rental" : product.category.replace(/-/g, " ")}
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{product.name}</h1>
            <p className="text-base font-semibold text-primary">{product.unitPrice}</p>
          </div>

          {isBeskapDetail ? (
            <p className="text-sm italic text-[var(--color-text-muted)]">{product.aliases.join(", ")}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {product.aliases.map((alias) => (
                <Badge key={alias} variant="suggestion">
                  {alias}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-sm leading-7 text-[var(--color-text-muted)]">{product.description}</p>
          <Card className={detailVariant.highlightPanelClass}>
            <p className="text-sm font-semibold text-foreground">{detailVariant.highlight}</p>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {product.attributes.map((attribute, index) => (
              <Card
                key={attribute.key}
                className={`${isShearsDetail ? "border border-[var(--color-border)] bg-white p-4 shadow-none" : ""} ${index === detailVariant.spotlightAttributeIndex ? "border-0 bg-[var(--color-soft-peach)] p-4 shadow-none" : "p-4 shadow-none"}`}
              >
                <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">{attribute.label}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{attribute.value}</p>
              </Card>
            ))}
          </div>

          {isBeadsDetail ? (
            <ProductInquiryPanel
              product={product}
              location="product_detail"
              showQuantity
              className="space-y-3"
            />
          ) : (
            <WhatsAppButton url={whatsappUrl} location="product_detail" productName={product.name} className="w-full">
              Inquire via WhatsApp
            </WhatsAppButton>
          )}
        </Card>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-surface)] p-3 md:hidden">
        <WhatsAppButton url={whatsappUrl} location="product_detail_sticky" productName={product.name} className="w-full">
          Inquire via WhatsApp
        </WhatsAppButton>
      </div>

      {related.length ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{isBrocadeDetail || isShearsDetail ? "You Might Also Like" : isBeskapDetail ? "Recommended for You" : "Related Products"}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Need a custom request?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--color-text-muted)]">
            Share your design reference, measurements, and timeline. The RKUB team will reply with availability and next steps.
          </p>
        </CardContent>
      </Card>
    </article>
  );
}
