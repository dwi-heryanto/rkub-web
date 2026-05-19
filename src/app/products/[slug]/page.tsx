import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
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

  const whatsappUrl = createWhatsAppUrl(createInquiryMessage(product));

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
    <article className="space-y-8">
      <Script id="product-jsonld" type="application/ld+json">
        {JSON.stringify(productJsonLd)}
      </Script>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <Card className="overflow-hidden border-0 bg-[var(--color-soft-peach)] p-0">
            <Image
              src={product.image}
              alt={product.name}
              width={1200}
              height={800}
              className="w-full object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </Card>
          <div className="grid gap-3 sm:grid-cols-2">
            {product.gallery.map((image) => (
              <Card key={image} className="overflow-hidden border-0 bg-[var(--color-muted-mandarin)] p-0">
                <Image
                  src={image}
                  alt={`${product.name} preview`}
                  width={800}
                  height={600}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </Card>
            ))}
          </div>
        </div>
        <Card className="space-y-4 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-deep-teal)]">{product.category.replace(/-/g, " ")}</p>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex flex-wrap gap-2">
            {product.aliases.map((alias) => (
              <Badge key={alias}>{alias}</Badge>
            ))}
          </div>
          <p className="text-lg font-semibold">{product.unitPrice}</p>
          <p className="text-sm leading-6 text-[var(--color-text-muted)]">{product.description}</p>
          <ul className="space-y-2 text-sm">
            {product.attributes.map((attribute) => (
              <li key={attribute.key} className="flex justify-between gap-4 border-b border-[var(--color-border)] pb-2">
                <span className="font-medium">{attribute.label}</span>
                <span>{attribute.value}</span>
              </li>
            ))}
          </ul>
          <WhatsAppButton url={whatsappUrl} location="product_detail" productName={product.name} className="w-full">
            Ask via WhatsApp
          </WhatsAppButton>
        </Card>
      </div>

      {related.length ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Products</h2>
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
