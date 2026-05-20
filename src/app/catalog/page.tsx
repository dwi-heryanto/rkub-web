import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getProducts } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/cms";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata(
  "Catalog | RKUB Family Tailoring Store",
  "Browse tailoring tools, fabrics, beads, accessories, and rental costumes.",
  "/catalog",
);

type CatalogTab = "rental" | "fabric" | "tools" | "traditional" | "materials";
type ToolKind = "all-tools" | "cutting" | "measuring" | "hand-sewing" | "pressing";

function resolveTab(input?: string): CatalogTab {
  if (input === "fabric" || input === "tools" || input === "traditional" || input === "materials") return input;
  return "rental";
}

function resolveToolKind(input?: string): ToolKind {
  if (input === "cutting" || input === "measuring" || input === "hand-sewing" || input === "pressing") return input;
  return "all-tools";
}

function getAttribute(product: { attributes: Array<{ key: string; value: string }> }, key: string) {
  return product.attributes.find((item) => item.key === key)?.value;
}

function buildCatalogHref(params: { tab: CatalogTab; color?: string; width?: string; toolKind?: ToolKind }) {
  const query = new URLSearchParams();
  query.set("tab", params.tab);
  if (params.color) query.set("color", params.color);
  if (params.width) query.set("width", params.width);
  if (params.toolKind && params.toolKind !== "all-tools") query.set("toolKind", params.toolKind);
  return `/catalog?${query.toString()}`;
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; color?: string; width?: string; toolKind?: string }>;
}) {
  const { tab, color, width, toolKind } = await searchParams;
  const activeTab = resolveTab(tab);
  const isTraditional = activeTab === "traditional";
  const isTools = activeTab === "tools";
  const isMaterials = activeTab === "materials";
  const isRental = activeTab === "rental";
  const activeToolKind = resolveToolKind(toolKind);
  const activeFabricColor = color?.trim() || "";
  const activeFabricWidth = width?.trim() || "";
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);
  const rentalProducts = products.filter((product) => product.category === "rental-costumes");
  const traditionalProducts = products.filter((product) => product.category === "traditional-clothing");
  const fabricProducts = products
    .filter((product) => product.category === "fabrics")
    .filter((product) => (activeFabricColor ? getAttribute(product, "color")?.toLowerCase() === activeFabricColor.toLowerCase() : true))
    .filter((product) => (activeFabricWidth ? getAttribute(product, "width")?.toLowerCase() === activeFabricWidth.toLowerCase() : true));
  const toolsProducts = products
    .filter((product) => product.category === "tailoring-tools")
    .filter((product) => {
      if (activeToolKind === "all-tools") return true;
      return product.tags.some((tag) => tag.toLowerCase() === activeToolKind);
    });
  const materialsProducts = products.filter((product) => ["fabrics", "beads-accessories", "decorative-materials"].includes(product.category));
  const tabProducts =
    activeTab === "fabric"
      ? fabricProducts
      : activeTab === "tools"
        ? toolsProducts
        : activeTab === "traditional"
          ? traditionalProducts
          : activeTab === "materials"
            ? materialsProducts
            : rentalProducts;
  const featuredProducts =
    activeTab === "fabric"
      ? tabProducts.slice(0, 3)
      : activeTab === "tools"
        ? tabProducts.slice(0, 3)
        : activeTab === "traditional"
          ? tabProducts.slice(0, 3)
          : activeTab === "materials"
            ? tabProducts.slice(0, 3)
            : [...rentalProducts, ...products.filter((product) => product.category !== "rental-costumes")].slice(0, 3);
  const inquiryUrl = createWhatsAppUrl("Hello, I want to check the rental catalog and available sizes.", settings.whatsappNumber);
  const hero =
    activeTab === "fabric"
      ? {
        badge: "Fabric Selection",
        label: "Fabric Collection",
        title: "Explore Fabrics",
        description: "Browse brocade, cotton, and decorative textiles selected for bespoke tailoring and event-ready garments.",
      }
      : activeTab === "tools"
        ? {
          badge: "Professional Tools",
          label: "Tools Collection",
          title: "Precision For Every Stitch",
          description: "Discover reliable tailoring tools from cutting and measuring to hand-sewing essentials.",
        }
        : activeTab === "traditional"
          ? {
            badge: "Premium Selection",
            label: "Traditional Collection",
            title: "Rental Catalog",
            description: "Discover our collection of traditional attire curated for ceremonies, formal occasions, and cultural events.",
          }
          : activeTab === "materials"
            ? {
              badge: "Materials Selection",
              label: "Materials Collection",
              title: "Explore Materials",
              description: "Browse fabrics, beads, and decorative materials for tailoring, embellishment, and custom garment work.",
            }
            : {
              badge: "Premium Selection",
              label: "Rental Collection",
              title: "Dress for the Occasion",
              description: "Traditional costume rentals crafted for ceremonies, performances, and cultural events with sizing support and fast WhatsApp assistance.",
            };
  const fabricPalette = ["Ivory", "White", "Deep Teal", "Sky Haze"];
  const fabricWidths = ["115 cm", "120 cm", "150 cm"];
  const toolKinds: Array<{ label: string; value: ToolKind }> = [
    { label: "All Tools", value: "all-tools" },
    { label: "Cutting", value: "cutting" },
    { label: "Measuring", value: "measuring" },
    { label: "Hand Sewing", value: "hand-sewing" },
    { label: "Pressing", value: "pressing" },
  ];
  const featuredTitle =
    activeTab === "fabric"
      ? "Premium fabrics for bespoke pieces"
      : activeTab === "tools"
        ? "Professional tools for daily workflow"
        : activeTab === "traditional"
          ? "Traditional looks with ceremonial character"
          : activeTab === "materials"
            ? "Material picks including beads and accents"
            : "Curated styles for the rental shelf";
  const featuredDescription = activeTab === "fabric"
    ? "Fabric options tuned for kebaya, formalwear, and custom requests."
    : activeTab === "tools"
      ? "Precision tools selected for cutting, measuring, and tailoring execution."
      : activeTab === "traditional"
        ? "Traditional clothing rentals with region and fit considerations."
        : activeTab === "materials"
          ? "A broader material shelf spanning fabrics, beads, and decorative components."
          : "A tighter lookbook section for the homepage-style browsing flow used in the Stitch reference.";
  const traditionalInquiryUrl = createWhatsAppUrl(
    "Hello, I want to check traditional clothing options and available sizes.",
    settings.whatsappNumber,
  );
  const toolsInquiryUrl = createWhatsAppUrl(
    "Hello, I want to ask about tailoring tools availability.",
    settings.whatsappNumber,
  );
  return (
    <div className="space-y-12 pb-12">
      {!isTools && !isMaterials ? (
        <section className={`overflow-hidden border border-border text-white ${isTraditional ? "bg-[var(--color-deep-teal)]" : "rounded-[calc(var(--radius-card)+12px)] bg-primary"}`}>
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_.95fr] lg:p-10">
            <div className="flex flex-col justify-center space-y-6">
              <Badge className="w-fit bg-white/10 text-white">{hero.badge}</Badge>
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">{hero.label}</p>
                <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{hero.title}</h1>
                <p className="max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{hero.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="#catalog-browser" className={cn(buttonVariants(), "rounded-2xl bg-background px-6 !text-primary hover:bg-white")}>
                  Browse Catalog
                </Link>
                <WhatsAppButton
                  url={inquiryUrl}
                  location="catalog_hero"
                  variant="outline-light"
                  className="min-h-11 rounded-card px-5 py-3"
                >
                  WhatsApp Inquiry
                </WhatsAppButton>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {(isTraditional
                  ? [
                    { title: "Regional looks", description: "Browse Java, Bali, and Sumatra inspired outfits." },
                    { title: "Gender options", description: "Explore male, female, and unisex style sets." },
                    { title: "Size coverage", description: "Daily rental options with quick fit confirmation." },
                  ]
                  : [
                    { title: "Sizing support", description: "Rental sets with quick guidance for fit and styling." },
                    { title: "Regional styles", description: "Traditional looks for Bali, Jawa, and other heritage looks." },
                    { title: "Event ready", description: "Prepared for weddings, performances, and family celebrations." },
                  ]).map((item) => (
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
                  src={
                    activeTab === "fabric"
                      ? "/gallery/fabric-roll.svg"
                      : activeTab === "tools"
                        ? "/gallery/service-tailoring.svg"
                        : activeTab === "traditional"
                          ? "/gallery/rental-kebaya.svg"
                          : activeTab === "materials"
                            ? "/gallery/bead-set.svg"
                            : "/gallery/rental-showcase.svg"
                  }
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
                    {isTraditional
                      ? "Focused on traditional event dressing with clear region and gender-oriented discovery."
                      : "Focused on event dressing, quick discovery, and a clear path into WhatsApp for sizing and availability checks."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : null}

      <section className={`flex flex-wrap gap-2 ${isTraditional || isTools || isMaterials ? "rounded-2xl border border-border bg-white p-2" : ""}`}>
        <Link href={buildCatalogHref({ tab: "rental" })} className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeTab === "rental" ? "border-primary bg-primary !text-white" : "border-border text-foreground"}`}>
          Rental
        </Link>
        <Link href={buildCatalogHref({ tab: "fabric" })} className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeTab === "fabric" ? "border-primary bg-primary !text-white" : "border-border text-foreground"}`}>
          Fabrics
        </Link>
        <Link href={buildCatalogHref({ tab: "tools" })} className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeTab === "tools" ? "border-primary bg-primary !text-white" : "border-border text-foreground"}`}>
          Tools
        </Link>
        <Link href={buildCatalogHref({ tab: "traditional" })} className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeTab === "traditional" ? "border-primary bg-primary !text-white" : "border-border text-foreground"}`}>
          Traditional
        </Link>
        <Link href={buildCatalogHref({ tab: "materials" })} className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeTab === "materials" ? "border-primary bg-primary !text-white" : "border-border text-foreground"}`}>
          Materials
        </Link>
      </section>

      {isTools ? (
        <>
          <section className="grid gap-6 md:grid-cols-[1fr_320px] md:items-end">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">Professional Tools</h1>
              <p className="max-w-3xl text-lg text-[var(--color-text-muted)]">
                Precision instruments designed for longevity and exactness. Equip your workspace with reliable shears, measuring devices, and hand-sewing essentials.
              </p>
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full rounded-full border border-border bg-white py-3 pl-12 pr-4 text-sm outline-none ring-primary/20 placeholder:text-[var(--color-text-muted)] focus:ring-2"
              />
            </div>
          </section>

          <section className="flex gap-3 overflow-x-auto pb-2">
            {toolKinds.map((item) => (
              <Link
                key={item.value}
                href={buildCatalogHref({ tab: "tools", toolKind: item.value })}
                className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${activeToolKind === item.value
                  ? "border-primary bg-primary !text-white"
                  : "border-border bg-[var(--color-surface)] text-[var(--color-midnight-ink)] hover:bg-[var(--color-soft-peach)]"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </section>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tabProducts.map((product) => {
              const primaryTag = product.tags[0] || "Tools";
              return (
                <Card key={product.id} className="group flex h-full flex-col gap-4 rounded-xl border-border bg-white p-5">
                  <Link href={`/products/${product.slug}`} className="flex h-full flex-col gap-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-[var(--color-soft-peach)]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-[var(--color-bg)] px-3 py-1 text-xs font-semibold text-primary">
                        {primaryTag}
                      </span>
                    </div>
                    <div className="flex grow flex-col">
                      <h3 className="text-lg font-semibold leading-snug">{product.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-[var(--color-text-muted)]">{product.description}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <span className="text-2xl font-bold text-primary">{product.unitPrice}</span>
                        <WhatsAppButton
                          url={toolsInquiryUrl}
                          location="catalog_tools_card"
                          aria-label={`Inquire about ${product.name} via WhatsApp`}
                          className="min-h-0 rounded-lg bg-transparent p-2 text-primary hover:bg-[var(--color-soft-peach)]"
                          variant="ghost"
                        >
                          <MessageCircle className="h-5 w-5" />
                        </WhatsAppButton>
                      </div>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </section>
        </>
      ) : isMaterials ? (
        <section id="catalog-browser" className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-2xl border-border bg-white p-5 shadow-none">
              <h2 className="text-xl font-semibold text-primary">Explore Materials</h2>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">Find the right fabrics, beads, and decorative accents for your next piece.</p>
              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search by name or alias..."
                  className="w-full rounded-[16px] border border-border bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-primary/20 placeholder:text-[var(--color-text-muted)] focus:ring-2"
                />
              </div>
            </Card>
            <Card className="rounded-2xl border-border bg-white p-5 shadow-none">
              <p className="text-sm font-semibold">Category</p>
              <div className="mt-3 space-y-2 text-sm">
                <p className="rounded-lg bg-[var(--color-soft-peach)] px-3 py-2">Fabrics</p>
                <p className="rounded-lg px-3 py-2 text-[var(--color-text-muted)]">Beads &amp; Accessories</p>
              </div>
              <p className="mt-4 text-sm font-semibold">Color</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {fabricPalette.map((item) => (
                  <Link
                    key={item}
                    href={buildCatalogHref({
                      tab: "materials",
                      color: activeFabricColor.toLowerCase() === item.toLowerCase() ? undefined : item,
                      width: activeFabricWidth || undefined,
                    })}
                    className={`rounded-full border px-3 py-1 text-xs ${activeFabricColor.toLowerCase() === item.toLowerCase() ? "border-primary bg-primary !text-white" : "border-border text-[var(--color-text-muted)]"}`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm font-semibold">Width</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {fabricWidths.map((size) => (
                  <Link
                    key={size}
                    href={buildCatalogHref({
                      tab: "materials",
                      color: activeFabricColor || undefined,
                      width: activeFabricWidth.toLowerCase() === size.toLowerCase() ? undefined : size,
                    })}
                    className={`rounded-full border px-3 py-1 text-xs ${activeFabricWidth.toLowerCase() === size.toLowerCase() ? "border-primary bg-primary !text-white" : "border-border text-[var(--color-text-muted)]"}`}
                  >
                    {size}
                  </Link>
                ))}
              </div>
              {(activeFabricColor || activeFabricWidth) ? (
                <Link href={buildCatalogHref({ tab: "materials" })} className="mt-4 inline-block text-xs font-semibold text-primary">
                  Clear filters
                </Link>
              ) : null}
            </Card>
          </aside>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tabProducts.map((product) => (
              <Card key={product.id} className="group flex h-full flex-col rounded-2xl border-border bg-white p-5 shadow-none transition-transform duration-300 hover:-translate-y-1 hover:shadow-(--shadow-soft)">
                <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--color-sky-haze)]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="mt-4 flex grow flex-col">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-full bg-[var(--color-soft-peach)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-primary">{product.name}</h3>
                    <p className="mt-1 text-lg text-[var(--color-text-muted)]">{product.unitPrice}</p>
                    <span className="mt-4 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[16px] border-2 border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
                      <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
            {!tabProducts.length ? (
              <Card className="border-dashed border-border bg-surface p-8 text-center text-sm text-[var(--color-text-muted)] shadow-none md:col-span-2 xl:col-span-3">
                No matching material items yet.
              </Card>
            ) : null}
          </div>
        </section>
      ) : !isTraditional ? (
        <section className="space-y-5 rounded-[28px] bg-[var(--color-surface)] p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Featured Picks</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{featuredTitle}</h2>
            </div>
            <p className="max-w-xl text-sm text-(--color-text-muted)">{featuredDescription}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
      ) : null}

      {isRental ? (
        <section id="catalog-browser" className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:-mt-4">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-2xl border-border bg-white p-0 shadow-none">
              <CardContent className="space-y-5 p-6">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Filters</p>
                  <Link href={buildCatalogHref({ tab: "rental" })} className="text-xs font-semibold text-primary">
                    Reset
                  </Link>
                </div>
                <div>
                  <p className="text-sm font-semibold">Region</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Java", "Bali", "Sumatra", "Sulawesi"].map((region) => (
                      <span key={region} className="rounded-full border border-border px-3 py-1 text-xs text-[var(--color-text-muted)]">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">Gender</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["All", "Male", "Female"].map((gender, idx) => (
                      <span key={gender} className={`rounded-full border px-3 py-1 text-xs ${idx === 0 ? "border-primary bg-primary !text-white" : "border-border text-[var(--color-text-muted)]"}`}>
                        {gender}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">Age Group</p>
                  <select aria-label="Age Group" className="mt-2 w-full rounded-[16px] border border-border bg-white px-3 py-2 text-sm">
                    <option>Adult</option>
                    <option>Teen</option>
                    <option>Child (5-12)</option>
                    <option>Toddler</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </aside>
          <div className="space-y-5">
            <Card className="rounded-2xl border-border bg-white p-2 shadow-none">
              <div className="flex gap-2">
                <Link href={buildCatalogHref({ tab: "rental" })} className="flex-1 rounded-xl border border-primary bg-primary px-4 py-2 text-center text-sm font-semibold !text-white">
                  Rental Costumes
                </Link>
                <Link href={buildCatalogHref({ tab: "traditional" })} className="flex-1 rounded-xl border border-border bg-[var(--color-surface)] px-4 py-2 text-center text-sm font-semibold text-[var(--color-text-muted)]">
                  Traditional Clothing
                </Link>
              </div>
            </Card>
            <Card className="rounded-2xl border-border bg-white p-0 shadow-none">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Showing <span className="font-semibold text-foreground">{rentalProducts.length}</span> rental costumes
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Java", "Bali"].map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-[var(--color-soft-peach)] px-3 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
              {rentalProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-(--shadow-soft)">
                  <Link href={`/products/${product.slug}`} className="block h-full">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={704}
                        height={396}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
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
                        {product.tags.slice(0, 2).map((tag) => (
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
            <div className="flex justify-center">
              <Button variant="secondary" className="rounded-[16px] border-border px-6 py-3 text-[var(--color-text-muted)] hover:text-primary">
                Load More Options
              </Button>
            </div>
          </div>
        </section>
      ) : isTools || isMaterials ? null : (
        <section id="catalog-browser" className={`grid gap-6 ${isTraditional ? "lg:grid-cols-[280px_minmax(0,1fr)] lg:-mt-4" : "lg:grid-cols-[300px_minmax(0,1fr)]"}`}>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className={`border-border p-0 shadow-none ${isTraditional ? "rounded-2xl bg-white" : "bg-surface"}`}>
              <CardContent className="space-y-5 p-6">
                {activeTab === "fabric" || activeTab === "materials" ? (
                  <>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Color</p>
                      <div className="flex flex-wrap gap-2">
                        {fabricPalette.map((item) => (
                          <Link
                            key={item}
                            href={buildCatalogHref({
                              tab: activeTab,
                              color: activeFabricColor.toLowerCase() === item.toLowerCase() ? undefined : item,
                              width: activeFabricWidth || undefined,
                            })}
                            className={`rounded-full border px-3 py-1 text-xs ${activeFabricColor.toLowerCase() === item.toLowerCase() ? "border-primary bg-primary !text-white" : "border-border text-[var(--color-text-muted)]"}`}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Width</p>
                      <div className="flex flex-wrap gap-2">
                        {fabricWidths.map((size) => (
                          <Link
                            key={size}
                            href={buildCatalogHref({
                              tab: activeTab,
                              color: activeFabricColor || undefined,
                              width: activeFabricWidth.toLowerCase() === size.toLowerCase() ? undefined : size,
                            })}
                            className={`rounded-full border px-3 py-1 text-xs ${activeFabricWidth.toLowerCase() === size.toLowerCase() ? "border-primary bg-primary !text-white" : "border-border text-[var(--color-text-muted)]"}`}
                          >
                            {size}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {(activeFabricColor || activeFabricWidth) ? (
                      <div>
                        <Link href={buildCatalogHref({ tab: activeTab })} className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                          Clear filters
                        </Link>
                      </div>
                    ) : null}
                  </>
                ) : activeTab === "tools" ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Tool categories</p>
                    <div className="flex flex-wrap gap-2">
                      {toolKinds.map((item) => (
                        <Link
                          href={buildCatalogHref({ tab: "tools", toolKind: item.value })}
                          key={item.value}
                          className={`rounded-full border px-3 py-1 text-xs ${activeToolKind === item.value ? "border-primary bg-primary !text-white" : "border-border text-[var(--color-text-muted)]"}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Traditional filters</p>
                      <Link href={buildCatalogHref({ tab: "traditional" })} className="text-xs font-semibold text-primary">
                        Reset
                      </Link>
                    </div>
                    <p className="text-sm font-semibold">Region</p>
                    <div className="flex flex-wrap gap-2">
                      {["Java", "Bali", "Sumatra"].map((region) => (
                        <span key={region} className="rounded-full border border-border px-3 py-1 text-xs text-[var(--color-text-muted)]">
                          {region}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold">Gender</p>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Male", "Female"].map((gender, idx) => (
                        <span key={gender} className={`rounded-full border px-3 py-1 text-xs ${idx === 0 ? "border-primary bg-primary !text-white" : "border-border text-[var(--color-text-muted)]"}`}>
                          {gender}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-5">
            {isTraditional ? (
              <Card className="border-border bg-white p-0 shadow-none">
                <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Showing <span className="font-semibold text-foreground">{tabProducts.length}</span> traditional costumes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Bali"].map((tag) => (
                      <span key={tag} className="rounded-full border border-border bg-[var(--color-soft-peach)] px-3 py-1 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border bg-surface p-0 shadow-none">
                <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{tabProducts.length} items available</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {activeTab === "fabric"
                        ? "Fabric catalog curated for motif, drape, and finishing requirements."
                        : activeTab === "tools"
                          ? "Tool catalog curated for cutting, measuring, and hand-sewing essentials."
                          : activeTab === "traditional"
                            ? "Traditional clothing rental catalog with regional style curation."
                            : "Materials catalog including fabrics, beads, and decorative supplies."}
                    </p>
                  </div>
                  <Badge variant="suggestion">
                    {activeTab === "fabric" ? "Fabrics" : activeTab === "tools" ? "Tools" : activeTab === "traditional" ? "Traditional" : "Materials"} tab
                  </Badge>
                </CardContent>
              </Card>
            )}

            {tabProducts.length ? (
              <div className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ${isTraditional ? "xl:gap-5" : ""}`}>
                {tabProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-(--shadow-soft)">
                    <Link href={`/products/${product.slug}`} className="block h-full">
                      <div className={`relative overflow-hidden bg-muted ${isTraditional ? "aspect-[3/4]" : ""}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={704}
                          height={396}
                          className={`${isTraditional ? "h-full w-full" : "h-52 w-full"} object-cover transition-transform duration-300 group-hover:scale-[1.02]`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
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
            ) : (
              <Card className="border-dashed border-border bg-surface p-8 text-center text-sm text-[var(--color-text-muted)] shadow-none">
                No matching items yet.
              </Card>
            )}
            {isTraditional ? (
              <div>
                <WhatsAppButton
                  url={traditionalInquiryUrl}
                  location="catalog_traditional_cta"
                  className="px-5 py-3"
                >
                  WhatsApp Inquiry
                </WhatsAppButton>
              </div>
            ) : null}
          </div>
        </section>
      )}

    </div>
  );
}
