import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { createMetadata } from "@/lib/seo";
import { createInquiryMessage, createWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) {
    return createMetadata("Product Not Found", "Product was not found.");
  }
  return createMetadata(`${product.name} | RKUB`, product.description, `/products/${product.slug}`);
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) notFound();

  const whatsappUrl = createWhatsAppUrl(createInquiryMessage(product));

  return (
    <article className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl bg-[--color-soft-peach]">
            <Image src={product.image} alt={product.name} width={1200} height={800} className="w-full object-cover" priority />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {product.gallery.map((image) => (
              <div key={image} className="overflow-hidden rounded-2xl bg-[--color-muted-mandarin]">
                <Image src={image} alt={`${product.name} preview`} width={800} height={600} className="h-40 w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <aside className="space-y-4 rounded-3xl border border-black/5 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[--color-deep-teal]">{product.category.replace(/-/g, " ")}</p>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-sm text-[--color-text-muted]">
            <p className="font-medium text-[--color-text]">Aliases</p>
            <ul className="mt-1 list-inside list-disc">
              {product.aliases.map((alias) => (
                <li key={alias}>{alias}</li>
              ))}
            </ul>
          </div>
          <p className="text-lg font-semibold">{product.unitPrice}</p>
          <p className="text-sm leading-6 text-[--color-text-muted]">{product.description}</p>
          <ul className="space-y-2 text-sm">
            {product.attributes.map((attribute) => (
              <li key={attribute.key} className="flex justify-between gap-4 border-b border-black/5 pb-2">
                <span className="font-medium">{attribute.label}</span>
                <span>{attribute.value}</span>
              </li>
            ))}
          </ul>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            <Button className="w-full">Ask via WhatsApp</Button>
          </a>
        </aside>
      </div>
    </article>
  );
}
