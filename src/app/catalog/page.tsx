import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CatalogBrowser } from "@/components/catalog-browser";
import { getCategories, getProducts } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = createMetadata(
  "Catalog | RKUB Family Tailoring Store",
  "Browse tailoring tools, fabrics, beads, accessories, and rental costumes.",
  "/catalog",
);

export default async function CatalogPage() {
  const [products, categories, settings] = await Promise.all([getProducts(), getCategories(), getSiteSettings()]);
  const rentalProducts = products.filter((product) => product.category === "rental-costumes");
  const featuredProducts = [...rentalProducts, ...products.filter((product) => product.category !== "rental-costumes")].slice(0, 3);
  const inquiryUrl = createWhatsAppUrl("Hello, I want to check the rental catalog and available sizes.", settings.whatsappNumber);

  return (
    <div className="space-y-10 pb-10">
      <section className="overflow-hidden rounded-[calc(var(--radius-card)+8px)] border border-border bg-primary text-white">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_.95fr] lg:p-10">
          <div className="flex flex-col justify-center space-y-6">
            <Badge className="w-fit bg-white/10 text-white">Premium Selection</Badge>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Rental Collection</p>
              <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Dress for the Occasion</h1>
              <p className="max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Traditional costume rentals crafted for ceremonies, performances, and cultural events with sizing support and fast WhatsApp assistance.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#catalog-browser"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-card)] bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
              >
                Browse Rentals
              </Link>
              <a
                href={inquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-card)] border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                WhatsApp Inquiry
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { title: "Sizing support", description: "Rental sets with quick guidance for fit and styling." },
                { title: "Regional styles", description: "Traditional looks for Bali, Jawa, and other heritage looks." },
                { title: "Event ready", description: "Prepared for weddings, performances, and family celebrations." },
              ].map((item) => (
                <Card key={item.title} className="border-white/10 bg-white/5 p-4 text-white shadow-none backdrop-blur-sm">
                  <CardContent className="space-y-1 p-0">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-sm text-white/75">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Card className="overflow-hidden border-white/10 bg-white/5 p-0 text-white shadow-none">
            <div className="relative">
              <Image
                src="/gallery/rental-showcase.svg"
                alt="Rental showcase"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-(--color-forest-canopy)/60 via-transparent to-transparent" />
            </div>
            <CardContent className="space-y-4 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-white/10 text-white">Ready to reserve</Badge>
                <Badge className="bg-white/10 text-white">Tailored consultation</Badge>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Heritage looks with modern booking flow</h2>
                <p className="text-sm leading-6 text-white/75">
                  Focused on event dressing, quick discovery, and a clear path into WhatsApp for sizing and availability checks.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Featured Picks</p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Curated styles for the rental shelf</h2>
          </div>
          <p className="max-w-xl text-sm text-(--color-text-muted)">
            A tighter lookbook section for the homepage-style browsing flow used in the Stitch reference.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-(--shadow-soft)">
              <Link href={`/products/${product.slug}`} className="block h-full">
                <div className="relative overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={704}
                    height={396}
                    className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <Badge variant="suggestion">{product.category.replace(/-/g, " ")}</Badge>
                  </div>
                </div>
                <CardContent className="space-y-3 p-5">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
                      <span className="text-sm font-semibold text-primary">{product.unitPrice}</span>
                    </div>
                    <p className="text-sm text-(--color-text-muted)">{product.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-(--color-text-muted)">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <CatalogBrowser products={products} categories={categories} />

      <footer className="grid gap-6 rounded-[calc(var(--radius-card)+4px)] border border-border bg-(--color-forest-canopy) p-6 text-white sm:p-8 lg:grid-cols-[1.4fr_.7fr_.7fr]">
        <div className="space-y-3">
          <p className="text-lg font-semibold">RKUB Family Tailoring Store</p>
          <p className="max-w-md text-sm text-white/75">
            Curation for heritage tailoring, fabric sourcing, and costume rentals with a direct line to WhatsApp for fast follow-up.
          </p>
          <Button variant="secondary" className="border-white/30 text-white hover:bg-white/10">
            Launch checklist in progress
          </Button>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-[0.2em] text-white/70">Support</p>
          <div className="flex flex-col gap-2 text-white/80">
            <Link href="#catalog-browser">Sizing help</Link>
            <Link href="/catalog">Rental catalog</Link>
            <a href={inquiryUrl} target="_blank" rel="noreferrer">
              WhatsApp inquiry
            </a>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-[0.2em] text-white/70">Company</p>
          <div className="flex flex-col gap-2 text-white/80">
            <Link href="/">Home</Link>
            <Link href="/catalog">Catalog</Link>
            <Link href="/products/premium-brocade-lace">Featured product</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
