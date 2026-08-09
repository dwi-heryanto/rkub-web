import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Gem, Scissors, Shirt, Sparkles, Wrench } from "lucide-react";

import { CategoryCard } from "@/components/category-card";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { SectionHeader } from "@/components/section-header";
import { WhatsAppBand } from "@/components/whatsapp-band";
import { Card } from "@/components/ui/card";
import { getCategories, getHomepageContent, getProducts, getSiteSettings } from "@/lib/cms";
import { createLocalBusinessJsonLd } from "@/lib/seo";

const categoryMeta: Record<string, { href: string; icon: typeof Scissors; image: string }> = {
  "tailoring-tools": { href: "/catalog?tab=tools", icon: Wrench, image: "https://images.unsplash.com/photo-1605218427306-022ba6c554de?auto=format&fit=crop&w=800&q=80" },
  fabrics: { href: "/catalog?tab=fabric", icon: Sparkles, image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&w=800&q=80" },
  "beads-accessories": { href: "/catalog?tab=materials", icon: Gem, image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80" },
  "rental-costumes": { href: "/catalog?tab=rental", icon: Shirt, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80" },
  "traditional-clothing": { href: "/catalog?tab=traditional", icon: Shirt, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80" },
  "tailoring-services": { href: "/services", icon: Scissors, image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=800&q=80" },
  "decorative-materials": { href: "/catalog?tab=materials", icon: Gem, image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80" },
};

export default async function Home() {
  const [content, categories, products, settings] = await Promise.all([
    getHomepageContent(),
    getCategories(),
    getProducts(),
    getSiteSettings(),
  ]);

  const localBusinessJsonLd = createLocalBusinessJsonLd(settings);
  const featuredProducts = products.slice(0, 4);
  const heroImage = content.gallery[0] ?? { image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1600&q=80", title: content.hero.title, description: content.hero.description };
  const rentalGallery = content.gallery[2] ?? { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80", title: "Traditional pieces, ready for events", description: "Quick size checks and WhatsApp confirmation make rental requests straightforward." };

  return (
    <div className="space-y-16 pb-16">
      <Script id="local-business-jsonld" type="application/ld+json">
        {JSON.stringify(localBusinessJsonLd)}
      </Script>

      <Hero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        cta={content.hero.primaryCta}
        image={{ src: heroImage.image, alt: heroImage.title }}
      />

      <section className="space-y-6">
        <SectionHeader
          title="Shop by category"
          description="Move from raw materials to finished pieces without losing the thread."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const meta = categoryMeta[category.slug] ?? categoryMeta["decorative-materials"];

            return (
              <CategoryCard
                key={category.slug}
                category={category}
                href={meta.href}
                icon={meta.icon}
                image={{ src: meta.image, alt: category.name }}
              />
            );
          })}
        </div>
      </section>

      <section className="space-y-6 rounded-[var(--radius-lg)] bg-[var(--color-paper-2)] p-6 sm:p-8">
        <SectionHeader
          title="Featured products"
          description="A small set of catalog picks to help people jump straight into browsing."
          viewAllHref="/catalog"
          viewAllLabel="Browse catalog"
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} variant={index === 0 ? "featured" : "default"} />
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="relative overflow-hidden rounded-[var(--radius-lg)] border-[var(--color-rule)] p-0">
          <Image
            src="https://images.unsplash.com/photo-1605218427306-022ba6c554de?auto=format&fit=crop&w=1200&q=80"
            alt="Tailoring services"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent" />
          <div className="relative z-10 flex min-h-[22rem] flex-col justify-end p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Services</p>
            <h2 className="mt-2 font-[var(--font-display)] text-[var(--text-2xl)] font-semibold leading-tight sm:text-[var(--text-3xl)]">
              Services that start with a conversation
            </h2>
            <p className="mt-3 max-w-md text-white/80">
              {content.highlights[1]?.description ?? "Send measurements, references, and timing for a tailored reply."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-accent)] transition-opacity hover:opacity-90">
                Book consultation
              </Link>
              <Link href="/support/sizing-guide" className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                Check sizing guide
              </Link>
            </div>
          </div>
        </Card>

        <Card className="space-y-6 rounded-[var(--radius-lg)] border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8">
          <SectionHeader
            title="Why it works"
            description="Short proof points that show the store is useful, responsive, and easy to understand."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {content.highlights.map((highlight) => (
              <div key={highlight.title} className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper)] p-4">
                <p className="text-sm font-semibold text-[var(--color-ink)]">{highlight.title}</p>
                <p className="mt-1 text-sm text-[var(--color-ink-2)]">{highlight.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card className="relative overflow-hidden rounded-[var(--radius-lg)] border-[var(--color-rule)] p-0">
          <Image
            src={rentalGallery.image}
            alt={rentalGallery.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent" />
          <div className="relative z-10 flex min-h-[22rem] flex-col justify-end p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Rental teaser</p>
            <h2 className="mt-2 font-[var(--font-display)] text-[var(--text-2xl)] font-semibold leading-tight sm:text-[var(--text-3xl)]">
              Traditional pieces, ready for events
            </h2>
            <p className="mt-3 max-w-md text-white/80">
              Quick size checks and WhatsApp confirmation make rental requests straightforward.
            </p>
            <Link href="/catalog?tab=rental" className="mt-5 inline-flex w-fit items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-accent)] transition-opacity hover:opacity-90">
              Explore rentals <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Card>

        <Card className="space-y-4 rounded-[var(--radius-lg)] border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-ink-2)]">Why it works</p>
          <div className="space-y-3">
            {content.highlights.map((highlight) => (
              <div key={highlight.title} className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper)] p-4">
                <p className="font-semibold text-[var(--color-ink)]">{highlight.title}</p>
                <p className="mt-1 text-sm text-[var(--color-ink-2)]">{highlight.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Trusted by families and event hosts"
          description="Short proof points that show the store is useful, responsive, and easy to understand."
        />
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="relative overflow-hidden rounded-[var(--radius-lg)] border-[var(--color-rule)] p-0">
            <Image
              src="https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=1200&q=80"
              alt="Traditional craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[var(--color-ink)]/80 via-[var(--color-ink)]/40 to-transparent" />
            <div className="relative z-10 flex min-h-[20rem] flex-col justify-end p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Family-run since day one</p>
              <h2 className="mt-2 font-[var(--font-display)] text-[var(--text-2xl)] font-semibold leading-tight">
                Craftsmanship passed down with care
              </h2>
            </div>
          </Card>

          <div className="grid gap-5">
            {content.testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="rounded-[var(--radius-lg)] border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Customer note</p>
                <blockquote className="mt-3 text-lg leading-8 text-[var(--color-ink)]">
                  “{testimonial.quote}”
                </blockquote>
                <p className="mt-4 text-sm font-semibold text-[var(--color-ink-2)]">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppBand
        title={content.whatsappCta.title}
        description={content.whatsappCta.description}
        message={content.whatsappCta.message}
        whatsappNumber={settings.whatsappNumber}
        location="home_whatsapp_cta"
      />
    </div>
  );
}
