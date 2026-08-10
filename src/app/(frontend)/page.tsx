/* Hallmark · macrostructure: Marquee Hero · theme: Garden · enrichment: none (typography only)
 * tone: soft · accent: leaf-green · display: Lora 600 · body: Source Sans 3 400
 * H1 marquee knobs: size=xl, alignment=left-bias, underlay=none
 */

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

const categoryMeta: Record<string, { href: string; icon: typeof Scissors; cta: string }> = {
  "tailoring-tools":      { href: "/catalog?tab=tools",       icon: Wrench,   cta: "Browse Tools" },
  fabrics:                { href: "/catalog?tab=fabric",       icon: Sparkles, cta: "Browse Fabrics" },
  "beads-accessories":    { href: "/catalog?tab=materials",    icon: Gem,      cta: "Browse Beads" },
  "rental-costumes":      { href: "/catalog?tab=rental",       icon: Shirt,    cta: "View Rentals" },
  "traditional-clothing": { href: "/catalog?tab=traditional",  icon: Shirt,    cta: "Browse Heritage" },
  "tailoring-services":   { href: "/services",                 icon: Scissors, cta: "Book a Fitting" },
  "decorative-materials": { href: "/catalog?tab=materials",    icon: Gem,      cta: "Browse Materials" },
};

export default async function Home() {
  const [content, categories, products, settings] = await Promise.all([
    getHomepageContent(),
    getCategories(),
    getProducts(),
    getSiteSettings(),
  ]);
  const localBusinessJsonLd = createLocalBusinessJsonLd(settings);
  const mapEmbedUrl = content.map.embedUrl?.trim();
  const mapPlaceUrl = content.map.placeUrl?.trim();

  return (
    <div className="space-y-[var(--space-2xl)] pb-[var(--space-2xl)]">
      <Script id="local-business-jsonld" type="application/ld+json">
        {JSON.stringify(localBusinessJsonLd)}
      </Script>

      {/* Marquee Hero — typography fills the fold, no CTAs in view */}
      <section
        className="flex min-h-[85dvh] flex-col justify-center"
        style={{ padding: "var(--space-2xl) clamp(1rem, 4vw, 2.5rem)" }}
      >
        <h1
          className="font-[var(--font-display)] text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.015em] text-[var(--color-ink)]"
          style={{ maxWidth: "18ch" }}
        >
          Heritage in
          <br />
          Every Stitch
        </h1>
        <p className="mt-6 max-w-[42ch] text-[var(--text-lg)] leading-relaxed text-[var(--color-ink-2)]">
          {content.hero.description}
        </p>
      </section>

      {/* Thick rule — the marquee divider */}
      <hr
        className="mx-auto border-0"
        style={{
          width: "clamp(2rem, 8vw, 6rem)",
          height: "3px",
          background: "var(--color-accent)",
          marginTop: 0,
          marginBottom: 0,
        }}
      />

      {/* Categories — below the fold */}
      <section
        className="space-y-[var(--space-md)]"
        style={{ paddingLeft: "clamp(1rem, 4vw, 2.5rem)", paddingRight: "clamp(1rem, 4vw, 2.5rem)" }}
      >
        <h2 className="font-[var(--font-display)] text-[var(--text-2xl)] font-semibold text-[var(--color-ink)]">
          Explore the Store
        </h2>
        <p className="text-[var(--text-base)] text-[var(--color-ink-2)]">
          Everything you need to bring your sartorial visions to life.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const meta = categoryMeta[category.slug] ?? categoryMeta["decorative-materials"];
            const Icon = meta.icon;
            return (
              <Link key={category.slug} href={meta.href}>
                <Card className="group h-full rounded-[var(--radius-lg)] border-[var(--color-rule)] p-6 transition-shadow duration-[var(--dur-short)] hover:shadow-[var(--shadow-soft)]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)]/10">
                    <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <p className="font-[var(--font-display)] text-[var(--text-lg)] font-semibold text-[var(--color-ink)]">
                    {category.name}
                  </p>
                  <p className="mt-2 text-[var(--text-sm)] text-[var(--color-ink-2)]">{category.description}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-[var(--text-sm)] font-semibold text-[var(--color-accent)]">
                    {meta.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-[var(--dur-short)] group-hover:translate-x-0.5" />
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Collection */}
      <section
        className="space-y-[var(--space-md)]"
        style={{
          padding: "var(--space-xl) clamp(1rem, 4vw, 2.5rem)",
          background: "var(--color-paper-2)",
        }}
      >
        <div>
          <h2 className="font-[var(--font-display)] text-[var(--text-2xl)] font-semibold text-[var(--color-ink)]">
            Featured Collections
          </h2>
          <p className="text-[var(--text-base)] text-[var(--color-ink-2)]">
            Curated highlights from our catalog.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-12">
          <Card className="overflow-hidden rounded-[var(--radius-lg)] border-[var(--color-rule)] p-0 lg:col-span-7">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square">
                <Image
                  src={products[0]?.image ?? "/gallery/fabric-brocade.svg"}
                  alt={products[0]?.name ?? "Featured product"}
                  fill
                  className="object-cover"
                  priority
                  loading="eager"
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
                  New Arrival
                </p>
                <h3 className="mt-2 font-[var(--font-display)] text-[var(--text-xl)] font-semibold text-[var(--color-ink)]">
                  {products[0]?.name ?? "Premium Brocade Lace"}
                </h3>
                <p className="mt-2 text-[var(--text-sm)] text-[var(--color-ink-2)]">
                  {products[0]?.description ?? "Premium featured collection."}
                </p>
                <Link
                  href={`/products/${products[0]?.slug ?? "premium-brocade-lace"}`}
                  className={cn(buttonVariants({ variant: "secondary" }), "mt-5 w-fit rounded-[var(--radius-sm)] border-[var(--color-accent)] text-[var(--color-accent)]")}
                >
                  View Details
                </Link>
              </div>
            </div>
          </Card>
          {/* Traditional Wedding Attire card */}
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ink)] p-6 text-white lg:col-span-5">
            <Image
              src="/gallery/rental-showcase.svg"
              alt="Traditional wedding attire"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent" />
            <div className="relative z-10 flex min-h-[320px] flex-col justify-end">
              <h3 className="font-[var(--font-display)] text-[var(--text-xl)] font-semibold">
                Traditional Wedding Attire
              </h3>
              <p className="mt-2 max-w-sm text-[var(--text-sm)] text-white/75">
                Bespoke garments tailored to honor cultural significance with modern structural elegance.
              </p>
              <Link
                href="/catalog?tab=traditional"
                className={cn(buttonVariants({ variant: "secondary" }), "mt-5 w-fit rounded-[var(--radius-sm)]")}
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — irregular grid without tint backgrounds */}
      <section
        className="space-y-[var(--space-md)]"
        style={{ paddingLeft: "clamp(1rem, 4vw, 2.5rem)", paddingRight: "clamp(1rem, 4vw, 2.5rem)" }}
      >
        <h2 className="font-[var(--font-display)] text-[var(--text-2xl)] font-semibold text-[var(--color-ink)]">
          The Art of Craftsmanship
        </h2>
        <div className="grid auto-rows-[180px] grid-cols-2 gap-2 md:grid-cols-4 md:auto-rows-[220px]">
          <div className="col-span-2 row-span-2 overflow-hidden rounded-[var(--radius-md)]">
            <Image
              src={content.gallery[0]?.image ?? "/gallery/fabric-roll.svg"}
              alt={content.gallery[0]?.title ?? "Craft gallery"}
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="overflow-hidden rounded-[var(--radius-md)]">
            <Image
              src={content.gallery[1]?.image ?? "/gallery/bead-set.svg"}
              alt={content.gallery[1]?.title ?? "Gallery item"}
              width={600}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="row-span-2 overflow-hidden rounded-[var(--radius-md)]">
            <Image
              src={content.gallery[2]?.image ?? "/gallery/rental-showcase.svg"}
              alt={content.gallery[2]?.title ?? "Gallery item"}
              width={900}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)]/8 p-4 text-center font-[var(--font-display)] text-[var(--text-md)] italic text-[var(--color-accent)]">
            &ldquo;Precision in every cut. Passion in every seam.&rdquo;
          </div>
        </div>
      </section>

      {/* WhatsApp CTA — warm, personal */}
      <section
        style={{ paddingLeft: "clamp(1rem, 4vw, 2.5rem)", paddingRight: "clamp(1rem, 4vw, 2.5rem)" }}
      >
        <div className="mx-auto max-w-3xl rounded-[var(--radius-xl)] bg-[var(--color-ink)] px-8 py-14 text-center text-white sm:px-14">
          <h2 className="font-[var(--font-display)] text-[var(--text-2xl)] font-semibold leading-tight sm:text-[var(--text-3xl)]">
            {content.whatsappCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-base)] text-white/75">
            {content.whatsappCta.description}
          </p>
          <WhatsAppButton
            url={createWhatsAppUrl(content.whatsappCta.message, settings.whatsappNumber)}
            location="home_whatsapp_cta"
            variant="inverse"
            className="mt-7 rounded-[var(--radius-sm)] px-8"
          >
            Chat on WhatsApp <ArrowRight className="ml-1 h-4 w-4" />
          </WhatsAppButton>
        </div>
      </section>

      {/* FAQ + Map */}
      <section
        className="grid gap-8 lg:grid-cols-2"
        style={{ paddingLeft: "clamp(1rem, 4vw, 2.5rem)", paddingRight: "clamp(1rem, 4vw, 2.5rem)" }}
      >
        <div id="faq">
          <h2 className="mb-4 font-[var(--font-display)] text-[var(--text-2xl)] font-semibold text-[var(--color-ink)]">
            Common Questions
          </h2>
          <div className="space-y-3">
            {content.faqs.map((item) => (
              <details key={item.question} className="rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-5">
                <summary className="cursor-pointer list-none font-semibold text-[var(--color-ink)] outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]/40 focus-visible:ring-offset-2 rounded">
                  {item.question}
                </summary>
                <p className="mt-2 text-[var(--text-sm)] text-[var(--color-ink-2)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 font-[var(--font-display)] text-[var(--text-2xl)] font-semibold text-[var(--color-ink)]">
            {content.map.title}
          </h2>
          <div className="relative h-80 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-rule)]">
            {mapEmbedUrl ? (
              <iframe
                title={`${settings.siteName} location`}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            ) : (
              <Image src="/gallery/rental-showcase.svg" alt="Store location map" fill className="object-cover opacity-35 grayscale" />
            )}
            <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[11px] font-semibold text-[var(--color-accent)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              Visit our atelier
            </div>
            <div className={`absolute bottom-4 left-4 max-w-[260px] rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper-2)]/95 p-4 text-left shadow-[var(--shadow-soft)] backdrop-blur ${mapEmbedUrl ? "pointer-events-none" : ""}`}>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-ink-2)]">
                <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                Location
              </div>
              <p className="mt-2 text-[var(--text-sm)] font-semibold text-[var(--color-ink)]">{settings.siteName}</p>
              <p className="mt-1 text-[var(--text-xs)] text-[var(--color-ink-2)]">{settings.address}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[var(--text-sm)] text-[var(--color-ink-2)]">
            <p className="flex-1">{content.map.description}</p>
            {mapPlaceUrl ? (
              <Link
                href={mapPlaceUrl}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-4 py-2 text-[var(--text-sm)] font-semibold text-[var(--color-accent)]"
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* Product Picks */}
      <section
        className="space-y-[var(--space-md)]"
        style={{
          padding: "var(--space-lg) clamp(1rem, 4vw, 2.5rem)",
          background: "var(--color-paper-2)",
          borderRadius: "var(--radius-xl)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-[var(--font-display)] text-[var(--text-xl)] font-semibold text-[var(--color-ink)]">
            Catalog Picks
          </h2>
          <Link href="/catalog?tab=rental" className="text-[var(--text-sm)] font-semibold text-[var(--color-accent)]">
            View all &rarr;
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
