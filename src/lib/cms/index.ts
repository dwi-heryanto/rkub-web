import { cache } from "react";

import { categories as seedCategories, products as seedProducts } from "@/data/seed/catalog";
import { homepageContent as seedHomepage, siteSettings as seedSettings } from "@/data/seed/content";
import type { Category, Product, ProductCategory } from "@/types/catalog";
import type { HomepageContent, SiteSettings } from "@/types/content";

interface PayloadListResponse<T> {
  docs: T[];
}

const payloadBaseUrl =
  process.env.PAYLOAD_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || process.env.NEXT_PUBLIC_SITE_URL || "";

const payloadApiUrl = payloadBaseUrl ? `${payloadBaseUrl.replace(/\/$/, "")}/api` : "";

async function payloadFetch<T>(path: string) {
  if (!payloadApiUrl) return null;

  try {
    const response = await fetch(`${payloadApiUrl}${path}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function mapPayloadCategory(entry: Record<string, unknown>): Category {
  return {
    id: String(entry.id ?? entry.slug ?? ""),
    slug: String(entry.slug ?? "") as ProductCategory,
    name: String(entry.name ?? ""),
    description: entry.description ? String(entry.description) : undefined,
    attributes: Array.isArray(entry.attributes)
      ? entry.attributes.map((item) => {
        const optionsRaw = (item as Record<string, unknown>).options;
        return {
          key: String((item as Record<string, unknown>).key ?? ""),
          label: String((item as Record<string, unknown>).label ?? ""),
          type: ((item as Record<string, unknown>).type ?? "text") as "text" | "select",
          options: Array.isArray(optionsRaw)
            ? optionsRaw.map((option) => String((option as Record<string, unknown>).value ?? option))
            : undefined,
        };
      })
      : [],
  };
}

function mapPayloadProduct(entry: Record<string, unknown>): Product {
  const aliases = Array.isArray(entry.aliases) ? entry.aliases.map((item) => String((item as Record<string, unknown>).value)) : [];
  const tags = Array.isArray(entry.tags) ? entry.tags.map((item) => String((item as Record<string, unknown>).value)) : [];
  const images = Array.isArray(entry.images) ? entry.images : [];
  const gallery = images.map((item) => String((item as Record<string, unknown>).url ?? "")).filter(Boolean);
  const category = entry.category as Record<string, unknown> | string | undefined;

  return {
    id: String(entry.id ?? entry.slug ?? ""),
    slug: String(entry.slug ?? ""),
    name: String(entry.name ?? ""),
    aliases,
    category: (typeof category === "string" ? category : String(category?.slug ?? "")) as ProductCategory,
    tags,
    unitPrice: String(entry.unitPrice ?? ""),
    description: String(entry.description ?? ""),
    image: gallery[0] || "/gallery/fabric-brocade.svg",
    gallery: gallery.length ? gallery : ["/gallery/fabric-brocade.svg"],
    attributes: Array.isArray(entry.attributes)
      ? entry.attributes.map((item) => ({
        key: String((item as Record<string, unknown>).key ?? ""),
        label: String((item as Record<string, unknown>).label ?? ""),
        value: String((item as Record<string, unknown>).value ?? ""),
      }))
      : [],
    relatedSlugs: Array.isArray(entry.related)
      ? entry.related.map((item) => String((item as Record<string, unknown>).slug ?? "")).filter(Boolean)
      : undefined,
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const response = await payloadFetch<PayloadListResponse<Record<string, unknown>>>("/site-settings");
  if (response?.docs?.[0]) {
    const entry = response.docs[0];
    return {
      siteName: String(entry.siteName ?? seedSettings.siteName),
      description: String(entry.description ?? seedSettings.description),
      address: String(entry.address ?? seedSettings.address),
      phone: String(entry.phone ?? seedSettings.phone),
      whatsappNumber: String(entry.whatsappNumber ?? seedSettings.whatsappNumber),
      seo: {
        title: String((entry.seo as Record<string, unknown> | undefined)?.title ?? seedSettings.seo.title),
        description: String((entry.seo as Record<string, unknown> | undefined)?.description ?? seedSettings.seo.description),
        image: (entry.seo as Record<string, unknown> | undefined)?.image ? String((entry.seo as Record<string, unknown>).image) : seedSettings.seo.image,
      },
    };
  }
  return seedSettings;
});

export const getHomepageContent = cache(async (): Promise<HomepageContent> => {
  const [homepageResponse, testimonialsResponse, faqsResponse] = await Promise.all([
    payloadFetch<PayloadListResponse<Record<string, unknown>>>("/homepage"),
    payloadFetch<PayloadListResponse<Record<string, unknown>>>("/testimonials?limit=6"),
    payloadFetch<PayloadListResponse<Record<string, unknown>>>("/faqs?limit=10&sort=order"),
  ]);

  const entry = homepageResponse?.docs?.[0];

  const testimonials = testimonialsResponse?.docs?.length
    ? testimonialsResponse.docs.map((item) => ({
      name: String(item.name ?? ""),
      quote: String(item.quote ?? ""),
    }))
    : seedHomepage.testimonials;

  const faqs = faqsResponse?.docs?.length
    ? faqsResponse.docs.map((item) => ({
      question: String(item.question ?? ""),
      answer: String(item.answer ?? ""),
    }))
    : seedHomepage.faqs;

  if (entry) {
    return {
      hero: {
        eyebrow: String(entry.heroEyebrow ?? seedHomepage.hero.eyebrow),
        title: String(entry.heroTitle ?? seedHomepage.hero.title),
        description: String(entry.heroDescription ?? seedHomepage.hero.description),
        primaryCta: {
          label: String(entry.heroPrimaryLabel ?? seedHomepage.hero.primaryCta.label),
          href: String(entry.heroPrimaryHref ?? seedHomepage.hero.primaryCta.href),
        },
        secondaryCta: {
          label: String(entry.heroSecondaryLabel ?? seedHomepage.hero.secondaryCta.label),
          href: String(entry.heroSecondaryHref ?? seedHomepage.hero.secondaryCta.href),
        },
      },
      highlights: Array.isArray(entry.highlights)
        ? entry.highlights.map((item) => ({
          title: String((item as Record<string, unknown>).title ?? ""),
          description: String((item as Record<string, unknown>).description ?? ""),
        }))
        : seedHomepage.highlights,
      gallery: Array.isArray(entry.gallery)
        ? entry.gallery.map((item) => ({
          title: String((item as Record<string, unknown>).title ?? ""),
          description: String((item as Record<string, unknown>).description ?? ""),
          image: String((item as Record<string, unknown>).image ?? ""),
        }))
        : seedHomepage.gallery,
      testimonials,
      faqs,
      whatsappCta: {
        title: String(entry.whatsappTitle ?? seedHomepage.whatsappCta.title),
        description: String(entry.whatsappDescription ?? seedHomepage.whatsappCta.description),
        message: String(entry.whatsappMessage ?? seedHomepage.whatsappCta.message),
      },
      map: {
        title: String(entry.mapTitle ?? seedHomepage.map.title),
        description: String(entry.mapDescription ?? seedHomepage.map.description),
        embedUrl: String(entry.mapEmbedUrl ?? seedHomepage.map.embedUrl ?? ""),
        placeUrl: String(entry.mapPlaceUrl ?? seedHomepage.map.placeUrl ?? ""),
      },
    };
  }

  return {
    ...seedHomepage,
    testimonials,
    faqs,
  };
});

export const getCategories = cache(async (): Promise<Category[]> => {
  const response = await payloadFetch<PayloadListResponse<Record<string, unknown>>>("/categories?limit=200");
  if (response?.docs?.length) {
    return response.docs.map(mapPayloadCategory);
  }
  return seedCategories;
});

export const getProducts = cache(async (): Promise<Product[]> => {
  const response = await payloadFetch<PayloadListResponse<Record<string, unknown>>>("/products?limit=200&depth=2");
  if (response?.docs?.length) {
    return response.docs.map(mapPayloadProduct);
  }
  return seedProducts;
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | undefined> => {
  const response = await payloadFetch<PayloadListResponse<Record<string, unknown>>>(`/products?where[slug][equals]=${slug}&limit=1&depth=2`);
  if (response?.docs?.[0]) {
    return mapPayloadProduct(response.docs[0]);
  }
  return seedProducts.find((item) => item.slug === slug);
});

export const getRelatedProducts = cache(async (product: Product): Promise<Product[]> => {
  const all = await getProducts();
  const related = product.relatedSlugs?.length
    ? all.filter((item) => product.relatedSlugs?.includes(item.slug))
    : all.filter((item) => item.category === product.category && item.slug !== product.slug);
  return related.slice(0, 4);
});
