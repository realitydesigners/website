import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "glossary",
  title: "Glossary",

  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "text",
      name: "definition",
      title: "Definition",
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: "reference",
      name: "model",
      title: "3D Model",
      to: { type: "model" },
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
    defineField({
      name: "refPosts",
      title: "Reference Posts",
      type: "array",
      of: [{ type: "reference", to: { type: "posts" } }],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        subtitle: "Page",
        title: title,
      };
    },
  },
});
