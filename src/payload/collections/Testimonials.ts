export const TestimonialsCollection = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "quote", type: "textarea", required: true },
    { name: "role", type: "text" },
  ],
};
