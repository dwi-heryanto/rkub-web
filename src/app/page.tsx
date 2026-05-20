import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Gem, MapPin, Scissors, Shirt, Sparkles, Wrench } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getCategories, getHomepageContent, getProducts, getSiteSettings } from "@/lib/cms";
import { createLocalBusinessJsonLd } from "@/lib/seo";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const categoryMeta: Record<string, { href: string; icon: typeof Scissors; tint: string; cta: string }> = {
  "tailoring-tools": { href: "/catalog?tab=tools", icon: Wrench, tint: "bg-[var(--color-soft-peach)]", cta: "Browse Tools" },
  fabrics: { href: "/catalog?tab=fabric", icon: Sparkles, tint: "bg-[var(--color-sky-haze)]", cta: "View Fabrics" },
  "beads-accessories": { href: "/catalog?tab=materials", icon: Gem, tint: "bg-[var(--color-muted-mandarin)]", cta: "Shop Embellishments" },
  "rental-costumes": { href: "/catalog?tab=rental", icon: Shirt, tint: "bg-[var(--color-soft-peach)]", cta: "View Rentals" },
  "traditional-clothing": { href: "/catalog?tab=traditional", icon: Shirt, tint: "bg-[var(--color-sky-haze)]", cta: "Discover Heritage" },
  "tailoring-services": { href: "/services", icon: Scissors, tint: "bg-[var(--color-muted-mandarin)]", cta: "Book Consultation" },
  "decorative-materials": { href: "/catalog?tab=materials", icon: Gem, tint: "bg-[var(--color-soft-peach)]", cta: "Shop Materials" },
};

export default async function Home() {
  const [content, categories, products, settings] = await Promise.all([
    getHomepageContent(),
    getCategories(),
    getProducts(),
    getSiteSettings(),
  ]);
  const localBusinessJsonLd = createLocalBusinessJsonLd(settings);

  return (
    <div className="space-y-16 pb-16">
      <Script id="local-business-jsonld" type="application/ld+json">
        {JSON.stringify(localBusinessJsonLd)}
      </Script>

      <section className="relative overflow-hidden rounded-[32px] bg-[var(--color-forest-canopy)] px-6 py-10 text-white sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_70%_25%,#b6ede2_0%,transparent_45%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">{content.hero.eyebrow}</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Heritage in Every Stitch</h1>
            <p className="max-w-xl text-lg text-white/80">{content.hero.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={content.hero.primaryCta.href} className={cn(buttonVariants({ variant: "inverse" }), "rounded-2xl px-6")}>
                {content.hero.primaryCta.label}
              </Link>
              <Link href="/services" className={cn(buttonVariants({ variant: "outline-light" }), "rounded-2xl px-6")}>
                Our Services
              </Link>
            </div>
          </div>
          <Card className="overflow-hidden rounded-[24px] border-white/15 bg-white/10 p-0 shadow-none">
            <Image
              src="/gallery/service-tailoring.svg"
              alt="Tailoring craftsmanship"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold">Explore the Store</h2>
          <p className="text-[var(--color-text-muted)]">Everything you need to bring your sartorial visions to life.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            (() => {
              const meta = categoryMeta[category.slug] ?? categoryMeta["decorative-materials"];
              const Icon = meta.icon;
              return (
                <Link key={category.slug} href={meta.href}>
                  <Card className="group h-full rounded-3xl border-[var(--color-border)] p-7 transition-transform duration-300 hover:-translate-y-1">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${meta.tint}`}>
                      <Icon className="h-6 w-6 text-[var(--color-deep-teal)]" />
                    </div>
                    <p className="text-xl font-semibold">{category.name}</p>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">{category.description}</p>
                    <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-deep-teal)]">
                      {meta.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </Card>
                </Link>
              );
            })()
          ))}
        </div>
      </section>

      <section className="rounded-[32px] bg-[var(--color-surface)] p-6 sm:p-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold">Featured Collections</h2>
            <p className="text-[var(--color-text-muted)]">Curated highlights from our extensive catalog.</p>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-12">
          <Card className="overflow-hidden rounded-3xl p-0 lg:col-span-7">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square">
                <Image src={products[0]?.image ?? "/gallery/fabric-brocade.svg"} alt={products[0]?.name ?? "Featured product"} fill className="object-cover" priority loading="eager" />
              </div>
              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-deep-teal)]">New Arrival</p>
                <h3 className="mt-2 text-2xl font-semibold">{products[0]?.name ?? "Premium Brocade Lace"}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{products[0]?.description ?? "Premium featured collection."}</p>
                <Link href={`/products/${products[0]?.slug ?? "premium-brocade-lace"}`} className={cn(buttonVariants({ variant: "secondary" }), "mt-5 rounded-2xl px-5")}>
                  View Details
                </Link>
              </div>
            </div>
          </Card>
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-forest-canopy)] p-7 text-white lg:col-span-5">
            <Image
              src="/gallery/rental-showcase.svg"
              alt="Traditional wedding attire"
              fill
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest-canopy)] via-[var(--color-forest-canopy)]/70 to-transparent" />
            <div className="relative z-10 flex min-h-[360px] flex-col justify-end">
              <h3 className="text-2xl font-semibold">Traditional Wedding Attire</h3>
              <p className="mt-2 max-w-sm text-sm text-white/80">Bespoke garments tailored to honor cultural significance with modern structural elegance.</p>
              <Link href="/catalog?tab=traditional" className={cn(buttonVariants({ variant: "inverse" }), "mt-5 w-fit rounded-2xl px-5")}>
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-center text-3xl font-semibold">The Art of Craftsmanship</h2>
        <div className="grid auto-rows-[180px] grid-cols-2 gap-2 md:grid-cols-4 md:auto-rows-[220px]">
          <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl">
            <Image src={content.gallery[0]?.image ?? "/gallery/fabric-roll.svg"} alt={content.gallery[0]?.title ?? "Craft gallery"} width={1200} height={1200} className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-2xl bg-[var(--color-soft-peach)]">
            <Image src={content.gallery[1]?.image ?? "/gallery/bead-set.svg"} alt={content.gallery[1]?.title ?? "Gallery item"} width={600} height={600} className="h-full w-full object-cover opacity-85 mix-blend-multiply" />
          </div>
          <div className="row-span-2 overflow-hidden rounded-2xl">
            <Image src={content.gallery[2]?.image ?? "/gallery/rental-showcase.svg"} alt={content.gallery[2]?.title ?? "Gallery item"} width={900} height={1200} className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-[var(--color-sky-haze)] p-4 text-center text-lg italic text-[var(--color-deep-teal)]">
            &quot;Precision in every cut. Passion in every seam.&quot;
          </div>
        </div>
      </section>

      <section className="px-2">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] bg-[var(--color-deep-teal)] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,#d5ff4d_0%,#00f5dc_45%,transparent_70%)] opacity-25 blur-2xl" />
          <h2 className="relative text-4xl font-bold leading-tight sm:text-5xl">{content.whatsappCta.title}</h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/80">{content.whatsappCta.description}</p>
          <WhatsAppButton
            url={createWhatsAppUrl(content.whatsappCta.message, settings.whatsappNumber)}
            location="home_whatsapp_cta"
            variant="inverse"
            className="relative mt-7 rounded-2xl px-8"
          >
            Chat on WhatsApp <ArrowRight className="ml-1 h-4 w-4" />
          </WhatsAppButton>
        </div>
      </section>

      <section id="faq" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-semibold">Common Questions</h2>
          <div className="space-y-3">
            {content.faqs.map((item) => (
              <details key={item.question} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
                <summary className="cursor-pointer list-none font-semibold">{item.question}</summary>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-3xl font-semibold">{content.map.title}</h2>
          <div className="relative flex h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-sky-haze)]">
            <Image src="/gallery/rental-showcase.svg" alt="Store location map placeholder" fill className="object-cover opacity-35 grayscale" />
            <div className="relative rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-center">
              <MapPin className="mx-auto h-5 w-5 text-[var(--color-deep-teal)]" />
              <p className="mt-1 text-sm font-semibold">{settings.siteName}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{settings.address}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{content.map.description}</p>
        </div>
      </section>

      <section className="space-y-5 rounded-[28px] bg-[var(--color-surface)] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Featured Catalog Picks</h2>
          <Link href="/catalog?tab=rental" className="text-sm font-semibold text-[var(--color-deep-teal)]">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
