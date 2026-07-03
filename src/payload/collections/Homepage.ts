export const HomepageCollection = {
  slug: "homepage",
  admin: {
    useAsTitle: "heroTitle",
  },
  fields: [
    { name: "heroEyebrow", type: "text", required: true },
    { name: "heroTitle", type: "text", required: true },
    { name: "heroDescription", type: "textarea" },
    { name: "heroPrimaryLabel", type: "text" },
    { name: "heroPrimaryHref", type: "text" },
    { name: "heroSecondaryLabel", type: "text" },
    { name: "heroSecondaryHref", type: "text" },
    {
      name: "highlights",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "image", type: "text" },
      ],
    },
    {
      name: "whatsappTitle",
      type: "text",
    },
    { name: "whatsappDescription", type: "textarea" },
    { name: "whatsappMessage", type: "textarea" },
    { name: "mapTitle", type: "text" },
    { name: "mapDescription", type: "textarea" },
    { name: "mapEmbedUrl", type: "text" },
    { name: "mapPlaceUrl", type: "text" },
  ],
};
