export type ProductCategory =
  | "tailoring-tools"
  | "fabrics"
  | "beads-accessories"
  | "rental-costumes"
  | "traditional-clothing"
  | "decorative-materials"
  | "tailoring-services";

export interface ProductAttribute {
  key: string;
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  category: ProductCategory;
  tags: string[];
  unitPrice: string;
  description: string;
  image: string;
  gallery: string[];
  attributes: ProductAttribute[];
}
