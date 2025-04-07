import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "quote",
  title: "Quote",

  fields: [
    defineField({
      type: "text",
      name: "quote",
      title: "Quote",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mediaRef",
      title: "Image Reference",
      type: "object",
      fields: [
        {
          name: "image",
          type: "reference",
          to: { type: "img" },
        },
        {
          name: "layout",
          type: "string",
          title: "Layout",
          options: {
            list: [
              { title: "Full Width", value: "Full Width" },
              { title: "Half Width", value: "Half Width" },
            ],
          },
        },
      ],
    }),
  ],
});

export interface QuoteDocument {
  _type: "quote";
  _id: string;
  quote?: string;
  mediaRef?: {
    image?: {
      image?: {
        asset: {
          url: string;
        };
      };
    };
    layout?: string;
  };
}
