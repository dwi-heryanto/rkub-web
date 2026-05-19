import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories, getHomepageContent, getProducts, getSiteSettings } from "@/lib/cms";
import { createLocalBusinessJsonLd } from "@/lib/seo";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export default async function Home() {
  const [content, categories, products, settings] = await Promise.all([
    getHomepageContent(),
    getCategories(),
    getProducts(),
    getSiteSettings(),
  ]);
  const localBusinessJsonLd = createLocalBusinessJsonLd(settings);

  return (
    <div className="space-y-12 pb-16">
      <Script id="local-business-jsonld" type="application/ld+json">
        {JSON.stringify(localBusinessJsonLd)}
      </Script>

      <section className="rounded-[var(--radius-card)] bg-[--color-soft-peach] p-6 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-[--color-deep-teal]">{content.hero.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">{content.hero.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[--color-text-muted]">{content.hero.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={content.hero.primaryCta.href}>
            <Button>{content.hero.primaryCta.label}</Button>
          </Link>
          <a
            href={createWhatsAppUrl(
              content.hero.secondaryCta.href === "whatsapp" ? content.whatsappCta.message : content.hero.secondaryCta.href,
            )}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="secondary">{content.hero.secondaryCta.label}</Button>
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Category Showcase</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.slug} className="p-5 text-sm font-medium">
              {category.name}
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Featured Collections</h2>
          <Link href="/catalog" className="text-sm font-semibold text-[--color-deep-teal]">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="services" className="grid gap-4 sm:grid-cols-2">
        {content.highlights.map((highlight) => (
          <Card key={highlight.title}>
            <CardHeader>
              <CardTitle>{highlight.title}</CardTitle>
              <CardDescription>{highlight.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Visual Gallery</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {content.gallery.map((item) => (
            <Card key={item.title} className="overflow-hidden p-0">
              <div className="bg-[--color-sky-haze]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="h-44 w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <CardContent className="p-6">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="mt-2">{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="faq" className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {content.testimonials.map((item) => (
                <li key={item.name}>
                  <p className="text-[--color-text-muted]">“{item.quote}”</p>
                  <p className="mt-1 font-semibold">— {item.name}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {content.faqs.map((item) => (
                <li key={item.question}>
                  <p className="font-semibold">{item.question}</p>
                  <p className="text-[--color-text-muted]">{item.answer}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-[var(--radius-card)] bg-[--color-sky-haze] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>WhatsApp Ready</Badge>
          <h2 className="text-xl font-semibold">{content.whatsappCta.title}</h2>
        </div>
        <p className="mt-2 text-sm text-[--color-text-muted]">{content.whatsappCta.description}</p>
        <div className="mt-4">
          <a href={createWhatsAppUrl(content.whatsappCta.message)} target="_blank" rel="noreferrer">
            <Button>Ask via WhatsApp</Button>
          </a>
        </div>
      </section>

      <section className="rounded-[var(--radius-card)] border border-[--color-border] bg-[--color-surface] p-6">
        <h2 className="text-xl font-semibold">{content.map.title}</h2>
        <p className="mt-2 text-sm text-[--color-text-muted]">{content.map.description}</p>
      </section>
    </div>
  );
}
