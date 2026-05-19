const ARRAY_FIELD_TYPE = "array";
const TEXT_FIELD_TYPE = "text";

export const attributeDefinitionsField = {
  name: "attributes",
  type: ARRAY_FIELD_TYPE,
  fields: [
    { name: "key", type: TEXT_FIELD_TYPE, required: true },
    { name: "label", type: TEXT_FIELD_TYPE, required: true },
    {
      name: "type",
      type: TEXT_FIELD_TYPE,
      required: true,
      admin: {
        description: "Input type (text or select).",
      },
    },
    {
      name: "options",
      type: ARRAY_FIELD_TYPE,
      fields: [{ name: "value", type: TEXT_FIELD_TYPE, required: true }],
      admin: {
        description: "Options for select-type attributes.",
      },
    },
  ],
};
