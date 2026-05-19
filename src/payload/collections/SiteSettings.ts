export const SiteSettingsCollection = {
  slug: "site-settings",
  admin: {
    useAsTitle: "siteName",
  },
  fields: [
    { name: "siteName", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "address", type: "text" },
    { name: "phone", type: "text" },
    { name: "whatsappNumber", type: "text" },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "image", type: "text" },
      ],
    },
  ],
};
