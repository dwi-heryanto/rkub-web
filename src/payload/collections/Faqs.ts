export const FaqsCollection = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
  },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    { name: "order", type: "number" },
  ],
};
