import { defineField, defineType } from "sanity";

export interface ImageDocument {
  _type: "img";
  title?: string;
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
      url?: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
        size: number;
        mimeType: string;
      };
    };
  };
  alt?: string;
  team?: {
    _ref: string;
    _type: "reference";
    name?: string;
    image?: {
      asset: {
        _ref: string;
        _type: "reference";
        url?: string;
      };
    };
  };
}

export default defineType({
  type: "document",
  name: "img",

  title: "Image",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      description:
        "Alternative text for screenreaders. Falls back on caption if not set",
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "reference",
      to: { type: "team" },
    }),
  ],
});
