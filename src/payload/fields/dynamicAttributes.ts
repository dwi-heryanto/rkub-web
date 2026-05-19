export const dynamicAttributesField = {
  name: "attributes",
  type: "array",
  fields: [
    { name: "key", type: "text", required: true },
    { name: "label", type: "text", required: true },
    { name: "value", type: "text", required: true },
  ],
};
