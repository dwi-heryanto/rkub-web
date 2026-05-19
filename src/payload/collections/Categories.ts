export const CategoriesCollection = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea" },
    {
      name: "attributes",
      type: "array",
      fields: [
        { name: "key", type: "text", required: true },
        { name: "label", type: "text", required: true },
        { name: "type", type: "text", required: true },
        { name: "options", type: "array", fields: [{ name: "value", type: "text", required: true }] },
      ],
    },
  ],
};
