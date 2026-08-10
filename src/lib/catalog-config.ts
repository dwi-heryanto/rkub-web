import type { Product } from "@/types/catalog";

export type CatalogTab = "rental" | "fabric" | "tools" | "traditional" | "materials";

export type ChipFilterDef = {
  kind: "chips";
  paramKey: "region" | "gender" | "color" | "width" | "toolKind";
  label: string;
  options: { source: "static"; values: string[] } | { source: "attribute"; attributeKey: string };
  match: "tag" | "attribute";
};

export type SelectFilterDef = {
  kind: "select";
  paramKey: "ageGroup";
  label: string;
  options: { source: "static"; values: string[] };
  match: "attribute";
  allLabel: string;
};

export type FilterDef = ChipFilterDef | SelectFilterDef;

export interface CatalogTabConfig {
  tab: CatalogTab;
  header: { eyebrow: string; title: string; description: string };
  cardVariant: "rental" | "default" | "compact" | "materials";
  inquiryMessage: string;
  filters: FilterDef[];
  baseFilter: (product: Product) => boolean;
  emptyState: { title: string; body: string };
}

const inCategories =
  (...categories: Product["category"][]) =>
  (product: Product) =>
    categories.includes(product.category);

export const CATALOG_TAB_ORDER: CatalogTab[] = ["rental", "fabric", "tools", "traditional", "materials"];

export const CATALOG_TAB_LABELS: Record<CatalogTab, string> = {
  rental: "Rental",
  fabric: "Fabrics",
  tools: "Tools",
  traditional: "Traditional",
  materials: "Materials",
};

const REGION_OPTIONS = ["Java", "Bali", "Sumatra", "Sulawesi"];
const GENDER_OPTIONS = ["Male", "Female"];

export const CATALOG_TABS: Record<CatalogTab, CatalogTabConfig> = {
  rental: {
    tab: "rental",
    header: {
      eyebrow: "Rental Collection",
      title: "Dress for the Occasion",
      description:
        "Traditional costume rentals for ceremonies, performances, and cultural events — with sizing support and fast WhatsApp assistance.",
    },
    cardVariant: "rental",
    inquiryMessage: "Hello, I want to check the rental catalog and available sizes.",
    filters: [
      { kind: "chips", paramKey: "region", label: "Region", options: { source: "static", values: REGION_OPTIONS }, match: "tag" },
      { kind: "chips", paramKey: "gender", label: "Gender", options: { source: "static", values: GENDER_OPTIONS }, match: "tag" },
      {
        kind: "select",
        paramKey: "ageGroup",
        label: "Age Group",
        options: { source: "static", values: ["Adult", "Teen", "Child (5-12)", "Toddler"] },
        match: "attribute",
        allLabel: "All Ages",
      },
    ],
    baseFilter: inCategories("rental-costumes"),
    emptyState: {
      title: "No rental costumes found",
      body: "Try adjusting your filters or inquire about availability via WhatsApp.",
    },
  },
  fabric: {
    tab: "fabric",
    header: {
      eyebrow: "Fabric Collection",
      title: "Explore Fabrics",
      description: "Brocade, cotton, and decorative textiles selected for bespoke tailoring and event-ready garments.",
    },
    cardVariant: "default",
    inquiryMessage: "Hello, I want to ask about fabric availability and pricing.",
    filters: [
      { kind: "chips", paramKey: "color", label: "Color", options: { source: "attribute", attributeKey: "color" }, match: "attribute" },
      { kind: "chips", paramKey: "width", label: "Width", options: { source: "attribute", attributeKey: "width" }, match: "attribute" },
    ],
    baseFilter: inCategories("fabrics"),
    emptyState: {
      title: "No fabrics match these filters",
      body: "Try a different color or width, or ask us on WhatsApp — new stock arrives regularly.",
    },
  },
  tools: {
    tab: "tools",
    header: {
      eyebrow: "Tools Collection",
      title: "Precision for Every Stitch",
      description: "Reliable tailoring tools — cutting, measuring, hand-sewing, and pressing essentials.",
    },
    cardVariant: "compact",
    inquiryMessage: "Hello, I want to ask about tailoring tools availability.",
    filters: [
      {
        kind: "chips",
        paramKey: "toolKind",
        label: "Tool Type",
        options: { source: "static", values: ["cutting", "measuring", "hand-sewing", "pressing"] },
        match: "tag",
      },
    ],
    baseFilter: inCategories("tailoring-tools"),
    emptyState: {
      title: "No tools found",
      body: "Try selecting a different tool type or inquire via WhatsApp.",
    },
  },
  traditional: {
    tab: "traditional",
    header: {
      eyebrow: "Traditional Collection",
      title: "Traditional Attire Catalog",
      description: "Traditional attire curated for ceremonies, formal occasions, and cultural events.",
    },
    cardVariant: "rental",
    inquiryMessage: "Hello, I want to check traditional clothing options and available sizes.",
    filters: [
      { kind: "chips", paramKey: "region", label: "Region", options: { source: "static", values: REGION_OPTIONS }, match: "tag" },
      { kind: "chips", paramKey: "gender", label: "Gender", options: { source: "static", values: GENDER_OPTIONS }, match: "tag" },
    ],
    baseFilter: inCategories("traditional-clothing"),
    emptyState: {
      title: "No traditional attire found",
      body: "Try adjusting your filters or ask us on WhatsApp about regional styles.",
    },
  },
  materials: {
    tab: "materials",
    header: {
      eyebrow: "Materials Collection",
      title: "Explore Materials",
      description: "Fabrics, beads, and decorative materials for tailoring, embellishment, and custom garment work.",
    },
    cardVariant: "materials",
    inquiryMessage: "Hello, I want to ask about materials and decorative supplies.",
    filters: [
      { kind: "chips", paramKey: "color", label: "Color", options: { source: "attribute", attributeKey: "color" }, match: "attribute" },
      { kind: "chips", paramKey: "width", label: "Width", options: { source: "attribute", attributeKey: "width" }, match: "attribute" },
    ],
    baseFilter: inCategories("fabrics", "beads-accessories", "decorative-materials"),
    emptyState: {
      title: "No materials match these filters",
      body: "Try different filters or ask us on WhatsApp — we can source specific materials.",
    },
  },
};

export function resolveCatalogTab(input?: string): CatalogTab {
  if (input === "fabric" || input === "tools" || input === "traditional" || input === "materials") return input;
  return "rental";
}
