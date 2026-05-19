import { dynamicAttributesField } from "@/payload/fields/dynamicAttributes";

export const ProductsCollection = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "aliases", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    { name: "category", type: "relationship", relationTo: "categories", required: true },
    { name: "tags", type: "array", fields: [{ name: "value", type: "text", required: true }] },
    { name: "unitPrice", type: "text", required: true },
    { name: "description", type: "textarea" },
    {
      name: "images",
      type: "array",
      fields: [
        { name: "url", type: "text", required: true },
        { name: "alt", type: "text" },
      ],
    },
    dynamicAttributesField,
  ],
};
