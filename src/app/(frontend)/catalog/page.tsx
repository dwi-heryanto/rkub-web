import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ClientSearchInput } from "@/components/search-input";
import { ProductCard } from "@/components/product-card";
import { RentalAgeGroupSelect } from "@/components/rental-age-group-select";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getProducts, getSiteSettings } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";
import { createWhatsAppUrl } from "@/lib/whatsapp";
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

function buildCatalogHref(params: { tab: CatalogTab; color?: string; width?: string; toolKind?: ToolKind; region?: string; gender?: string; ageGroup?: string }) {
  const query = new URLSearchParams();
  query.set("tab", params.tab);
  if (params.color) query.set("color", params.color);
  if (params.width) query.set("width", params.width);
  if (params.toolKind && params.toolKind !== "all-tools") query.set("toolKind", params.toolKind);
  if (params.region) query.set("region", params.region);
  if (params.gender) query.set("gender", params.gender);
  if (params.ageGroup) query.set("ageGroup", params.ageGroup);
  return `/catalog?${query.toString()}`;
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; color?: string; width?: string; toolKind?: string; region?: string; gender?: string; ageGroup?: string }>;
}) {
  const { tab, color, width, toolKind, region, gender, ageGroup } = await searchParams;
  const activeTab = resolveTab(tab);
  const isTraditional = activeTab === "traditional";
  const isTools = activeTab === "tools";
  const isMaterials = activeTab === "materials";
  const isRental = activeTab === "rental";
  const activeToolKind = resolveToolKind(toolKind);
  const activeFabricColor = color?.trim() || "";
  const activeFabricWidth = width?.trim() || "";
  const activeRegion = region?.trim() || "";
  const activeGender = gender?.trim() || "";
  const activeAgeGroup = ageGroup?.trim() || "";
  const [products, settings] = await Promise.all([getProducts(), getSiteSettings()]);
  const rentalProducts = products
    .filter((product) => product.category === "rental-costumes")
    .filter((product) => (activeRegion ? product.tags.some((t) => t.toLowerCase() === activeRegion.toLowerCase()) : true))
    .filter((product) => (activeGender ? product.tags.some((t) => t.toLowerCase() === activeGender.toLowerCase()) : true))
    .filter((product) => (activeAgeGroup ? getAttribute(product, "age-group")?.toLowerCase() === activeAgeGroup.toLowerCase() : true));
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
            title: "Traditional Attire Catalog",
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
        <section className={`overflow-hidden border border-border text-white ${isTraditional ? "bg-primary" : "rounded-[calc(var(--radius-card)+12px)] bg-primary"}`}>
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_.95fr] lg:p-10">
            <div className="flex flex-col justify-center space-y-6">
              <Badge className="w-fit bg-white/10 text-white">{hero.badge}</Badge>
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">{hero.label}</p>
                <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{hero.title}</h1>
                <p className="max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{hero.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="#catalog-browser" className={cn(buttonVariants({ variant: "default" }), "px-6")}>
                  Browse Catalog
                </Link>
                <WhatsAppButton
                  url={inquiryUrl}
                  location="catalog_hero"
                  variant="light"
                  size="lg"
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
                      : activeTab === "traditional"
                        ? "/gallery/rental-kebaya.svg"
                        : "/gallery/rental-showcase.svg"
                  }
                  alt="Rental showcase"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                  loading="eager"
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

      <nav aria-label="Catalog categories" className={`flex flex-wrap gap-2 ${isTraditional || isTools || isMaterials ? "rounded-2xl border border-border bg-white p-2" : ""}`}>
        {([
          { value: "rental", label: "Rental" },
          { value: "fabric", label: "Fabrics" },
          { value: "tools", label: "Tools" },
          { value: "traditional", label: "Traditional" },
          { value: "materials", label: "Materials" },
        ] as const).map((tabItem) => (
          <Link
            key={tabItem.value}
            href={buildCatalogHref({ tab: tabItem.value })}
            role="tab"
            aria-selected={activeTab === tabItem.value}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeTab === tabItem.value ? "border-primary bg-primary text-white!" : "border-border text-foreground"}`}
          >
            {tabItem.label}
          </Link>
        ))}
      </nav>

      {isTools ? (
        <>
          <section className="grid gap-6 md:grid-cols-[1fr_320px] md:items-end">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">Professional Tools</h1>
              <p className="max-w-3xl text-lg text-(--color-text-muted)">
                Precision instruments designed for longevity and exactness. Equip your workspace with reliable shears, measuring devices, and hand-sewing essentials.
              </p>
            </div>
            <div className="relative">
              <ClientSearchInput
                placeholder="Search tools..."
                location="catalog_tools_search"
                inputClassName="rounded-full"
              />
            </div>
          </section>

          <section className="flex gap-3 overflow-x-auto pb-2">
            {toolKinds.map((item) => (
              <Link
                key={item.value}
                href={buildCatalogHref({ tab: "tools", toolKind: item.value })}
                className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${activeToolKind === item.value
                  ? "border-primary bg-primary text-white!"
                  : "border-border bg-surface text-midnight-ink hover:bg-muted"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </section>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tabProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="compact"
                showWhatsAppAction
                whatsappUrl={toolsInquiryUrl}
              />
            ))}
            {!tabProducts.length ? (
              <Card className="border-dashed border-border bg-surface p-8 text-center text-sm text-(--color-text-muted) shadow-none sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <p className="font-semibold">No tools found</p>
                <p className="mt-1">Try selecting a different tool category or inquire via WhatsApp.</p>
                <WhatsAppButton url={toolsInquiryUrl} location="catalog_tools_empty" variant="light" className="mt-4">
                  Ask on WhatsApp
                </WhatsAppButton>
              </Card>
            ) : null}
          </section>
        </>
      ) : isMaterials ? (
        <section id="catalog-browser" className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-2xl border-border bg-white p-5 shadow-none">
              <h2 className="text-xl font-semibold text-primary">Explore Materials</h2>
              <p className="mt-1 text-sm text-(--color-text-muted)">Find the right fabrics, beads, and decorative accents for your next piece.</p>
              <div className="mt-4">
                <ClientSearchInput
                  placeholder="Search by name or alias..."
                  location="catalog_materials_search"
                  inputClassName="rounded-2xl py-2.5"
                />
              </div>
            </Card>
            <Card className="rounded-2xl border-border bg-white p-5 shadow-none">
              <p className="text-sm font-semibold">Category</p>
              <div className="mt-3 space-y-2 text-sm">
                <p className="rounded-lg bg-muted px-3 py-2">Fabrics</p>
                <p className="rounded-lg px-3 py-2 text-(--color-text-muted)">Beads &amp; Accessories</p>
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
                    className={`rounded-full border px-3 py-1 text-xs ${activeFabricColor.toLowerCase() === item.toLowerCase() ? "border-primary bg-primary text-white!" : "border-border text-(--color-text-muted)"}`}
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
                    className={`rounded-full border px-3 py-1 text-xs ${activeFabricWidth.toLowerCase() === size.toLowerCase() ? "border-primary bg-primary text-white!" : "border-border text-(--color-text-muted)"}`}
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
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">Explore Materials</h1>
              <p className="mt-2 max-w-3xl text-lg text-(--color-text-muted)">
                Browse fabrics, beads, and decorative accents for tailoring and custom garment work.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tabProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="materials" />
              ))}
              {!tabProducts.length ? (
                <Card className="border-dashed border-border bg-surface p-8 text-center text-sm text-(--color-text-muted) shadow-none md:col-span-2 xl:col-span-3">
                  No matching material items yet.
                </Card>
              ) : null}
            </div>
          </div>
        </section>
      ) : !isTraditional ? (
        <section className="space-y-5 rounded-[28px] bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Featured Picks</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{featuredTitle}</h2>
            </div>
            <p className="max-w-xl text-sm text-(--color-text-muted)">{featuredDescription}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="featured" />
            ))}
            {!featuredProducts.length ? (
              <Card className="border-dashed border-border bg-surface p-8 text-center text-sm text-(--color-text-muted) shadow-none md:col-span-2 xl:col-span-3">
                No featured products available in this category yet.
              </Card>
            ) : null}
          </div>
        </section>
      ) : null}

      {isRental ? (
        <section id="catalog-browser" className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:-mt-4">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="rounded-2xl border-border bg-white p-0 shadow-none">
              <CardContent className="space-y-5 p-6">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">Filters</p>
                  <Link href={buildCatalogHref({ tab: "rental" })} className="text-xs font-semibold text-primary">
                    Reset
                  </Link>
                </div>
                <fieldset>
                  <legend className="text-sm font-semibold">Region</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Java", "Bali", "Sumatra", "Sulawesi"].map((region) => (
                      <Link
                        key={region}
                        href={buildCatalogHref({ tab: "rental", region: activeRegion.toLowerCase() === region.toLowerCase() ? undefined : region, gender: activeGender || undefined, ageGroup: activeAgeGroup || undefined })}
                        className={`rounded-full border px-3 py-1 text-xs ${activeRegion.toLowerCase() === region.toLowerCase() ? "border-primary bg-primary text-white!" : "border-border text-(--color-text-muted)"}`}
                      >
                        {region}
                      </Link>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold">Gender</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["All", "Male", "Female"].map((gender) => {
                      const isAll = gender === "All";
                      const isActive = isAll ? !activeGender : activeGender.toLowerCase() === gender.toLowerCase();
                      return (
                        <Link
                          key={gender}
                          href={buildCatalogHref({ tab: "rental", region: activeRegion || undefined, gender: isAll ? undefined : (isActive ? undefined : gender), ageGroup: activeAgeGroup || undefined })}
                          className={`rounded-full border px-3 py-1 text-xs ${isActive ? "border-primary bg-primary text-white!" : "border-border text-(--color-text-muted)"}`}
                        >
                          {gender}
                        </Link>
                      );
                    })}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="age-group-select" className="text-sm font-semibold">Age Group</label>
                  <RentalAgeGroupSelect
                    currentAgeGroup={activeAgeGroup}
                    currentRegion={activeRegion}
                    currentGender={activeGender}
                  />
                </div>
              </CardContent>
            </Card>
          </aside>
          <div className="space-y-5">
            <Card className="rounded-2xl border-border bg-white p-2 shadow-none">
              <div className="flex gap-2">
                <Link href={buildCatalogHref({ tab: "rental" })} className="flex-1 rounded-xl border border-primary bg-primary px-4 py-2 text-center text-sm font-semibold text-white!">
                  Rental Costumes
                </Link>
                <Link href={buildCatalogHref({ tab: "traditional" })} className="flex-1 rounded-xl border border-border bg-surface px-4 py-2 text-center text-sm font-semibold text-(--color-text-muted)">
                  Traditional Clothing
                </Link>
              </div>
            </Card>
            <Card className="rounded-2xl border-border bg-white p-0 shadow-none">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                <p className="text-sm text-(--color-text-muted)">
                  Showing <span className="font-semibold text-foreground">{rentalProducts.length}</span> rental costumes
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {activeRegion ? (
                    <Link href={buildCatalogHref({ tab: "rental", gender: activeGender || undefined, ageGroup: activeAgeGroup || undefined })} className="rounded-full border border-border bg-muted px-3 py-1 text-xs">
                      {activeRegion} ✕
                    </Link>
                  ) : null}
                  {activeGender ? (
                    <Link href={buildCatalogHref({ tab: "rental", region: activeRegion || undefined, ageGroup: activeAgeGroup || undefined })} className="rounded-full border border-border bg-muted px-3 py-1 text-xs">
                      {activeGender} ✕
                    </Link>
                  ) : null}
                  {activeAgeGroup ? (
                    <Link href={buildCatalogHref({ tab: "rental", region: activeRegion || undefined, gender: activeGender || undefined })} className="rounded-full border border-border bg-muted px-3 py-1 text-xs">
                      {activeAgeGroup} ✕
                    </Link>
                  ) : null}
                  {(activeRegion || activeGender || activeAgeGroup) ? (
                    <Link href={buildCatalogHref({ tab: "rental" })} className="text-xs font-semibold text-primary">
                      Clear all
                    </Link>
                  ) : null}
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
              {rentalProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="rental" />
              ))}
              {!rentalProducts.length ? (
                <Card className="border-dashed border-border bg-surface p-8 text-center text-sm text-(--color-text-muted) shadow-none sm:col-span-2 xl:col-span-3">
                  <p className="font-semibold">No rental costumes found</p>
                  <p className="mt-1">Try adjusting your filters or inquire about availability via WhatsApp.</p>
                  <WhatsAppButton url={inquiryUrl} location="catalog_rental_empty" variant="light" className="mt-4">
                    Ask on WhatsApp
                  </WhatsAppButton>
                </Card>
              ) : null}
            </div>
            <div className="flex justify-center">
              <Button variant="secondary" size="lg">
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
                {activeTab === "fabric" ? (
                  <>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">Color</p>
                      <div className="flex flex-wrap gap-2">
                        {fabricPalette.map((item) => (
                          <Link
                            key={item}
                            href={buildCatalogHref({
                              tab: activeTab,
                              color: activeFabricColor.toLowerCase() === item.toLowerCase() ? undefined : item,
                              width: activeFabricWidth || undefined,
                            })}
                            className={`rounded-full border px-3 py-1 text-xs ${activeFabricColor.toLowerCase() === item.toLowerCase() ? "border-primary bg-primary text-white!" : "border-border text-(--color-text-muted)"}`}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">Width</p>
                      <div className="flex flex-wrap gap-2">
                        {fabricWidths.map((size) => (
                          <Link
                            key={size}
                            href={buildCatalogHref({
                              tab: activeTab,
                              color: activeFabricColor || undefined,
                              width: activeFabricWidth.toLowerCase() === size.toLowerCase() ? undefined : size,
                            })}
                            className={`rounded-full border px-3 py-1 text-xs ${activeFabricWidth.toLowerCase() === size.toLowerCase() ? "border-primary bg-primary text-white!" : "border-border text-(--color-text-muted)"}`}
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
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">Traditional filters</p>
                      <Link href={buildCatalogHref({ tab: "traditional" })} className="text-xs font-semibold text-primary">
                        Reset
                      </Link>
                    </div>
                    <p className="text-sm font-semibold">Region</p>
                    <div className="flex flex-wrap gap-2">
                      {["Java", "Bali", "Sumatra"].map((region) => (
                        <span key={region} className="rounded-full border border-border px-3 py-1 text-xs text-(--color-text-muted)">
                          {region}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold">Gender</p>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Male", "Female"].map((gender, idx) => (
                        <span key={gender} className={`rounded-full border px-3 py-1 text-xs ${idx === 0 ? "border-primary bg-primary text-white!" : "border-border text-(--color-text-muted)"}`}>
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
                  <p className="text-sm text-(--color-text-muted)">
                    Showing <span className="font-semibold text-foreground">{tabProducts.length}</span> traditional costumes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Bali"].map((tag) => (
                      <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-xs">
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
                    <p className="text-sm text-(--color-text-muted)">
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
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={isTraditional ? "rental" : "default"}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-border bg-surface p-8 text-center text-sm text-(--color-text-muted) shadow-none">
                No matching items yet.
              </Card>
            )}
            {isTraditional ? (
              <div>
                <WhatsAppButton url={traditionalInquiryUrl} location="catalog_traditional_cta" className="px-5 py-3">
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
