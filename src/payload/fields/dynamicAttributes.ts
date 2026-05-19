const ARRAY_FIELD_TYPE = "array";
const TEXT_FIELD_TYPE = "text";

export const dynamicAttributesField = {
  name: "attributes",
  type: ARRAY_FIELD_TYPE,
  fields: [
    { name: "key", type: TEXT_FIELD_TYPE, required: true },
    { name: "label", type: TEXT_FIELD_TYPE, required: true },
    { name: "value", type: TEXT_FIELD_TYPE, required: true },
  ],
};
