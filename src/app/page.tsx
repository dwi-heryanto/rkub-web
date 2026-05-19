import Link from "next/link";
import Script from "next/script";

import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { categories, faqs, products, testimonials } from "@/data/products";
import { createLocalBusinessJsonLd } from "@/lib/seo";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export default function Home() {
  const localBusinessJsonLd = createLocalBusinessJsonLd();

  return (
    <div className="space-y-12 pb-16">
      <Script id="local-business-jsonld" type="application/ld+json">
        {JSON.stringify(localBusinessJsonLd)}
      </Script>

      <section className="rounded-3xl bg-[--color-soft-peach] p-6 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-[--color-deep-teal]">Family Tailoring Store Catalog</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">Browse fabrics, tools, rentals, and tailoring services with ease.</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[--color-text-muted]">
          Built for all ages with a clean canvas, soft accents, and comfortable reading. Discover products visually and continue your inquiry via WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/catalog">
            <Button>Browse Catalog</Button>
          </Link>
          <a href={createWhatsAppUrl("Hello, I want to ask about your tailoring and rental services.")} target="_blank" rel="noreferrer">
            <Button variant="secondary">Chat on WhatsApp</Button>
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Category Showcase</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article key={category.slug} className="rounded-2xl border border-black/5 bg-white p-5 text-sm font-medium">
              {category.label}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Collections</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="services" className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-black/5 bg-white p-6">
          <h3 className="text-xl font-semibold">Rental Showcase</h3>
          <p className="mt-2 text-sm leading-6 text-[--color-text-muted]">Traditional and costume rentals with clear sizing support and WhatsApp confirmation flow.</p>
        </article>
        <article className="rounded-2xl border border-black/5 bg-white p-6">
          <h3 className="text-xl font-semibold">Custom Tailoring Services</h3>
          <p className="mt-2 text-sm leading-6 text-[--color-text-muted]">Send your design reference, measurements, and timeline for personalized tailoring.</p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="text-xl font-semibold">Testimonials</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {testimonials.map((item) => (
              <li key={item.name}>
                <p className="text-[--color-text-muted]">“{item.quote}”</p>
                <p className="mt-1 font-semibold">— {item.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-6">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {faqs.map((item) => (
              <li key={item.question}>
                <p className="font-semibold">{item.question}</p>
                <p className="text-[--color-text-muted]">{item.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl bg-[--color-sky-haze] p-6">
        <h2 className="text-xl font-semibold">Find Us</h2>
        <p className="mt-2 text-sm text-[--color-text-muted]">Google Maps section placeholder: integrate your real location embed in production.</p>
      </section>
    </div>
  );
}
