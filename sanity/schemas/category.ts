import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description:
        "Represents the title or name of the category. This field is used to identify the category in the user interface and in URLs.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "Provides a unique identifier for the category, used in URLs to access the category's content. The slug is automatically generated from the title but can be manually adjusted if needed.",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "model",
      type: "reference",
      title: "3D Model",
      description:
        "References the 3D model associated with the category. This allows for the visualization of the category in a 3D environment, providing users with a more immersive experience.",
      to: { type: "model" },
    }),
    defineField({
      name: "isMain",
      type: "boolean",
      title: "Is Parent Category?",
      description:
        "Indicates whether the category is a parent category. Parent categories typically serve as the top-level categories and may have subcategories nested within them.",
    }),
    defineField({
      name: "subcategories",
      type: "array",
      title: "Subcategories",
      description:
        "Contains references to subcategories belonging to this category. Subcategories allow for further organization and categorization of content within the main category.",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "sceneIdentifier",
      type: "string",
      title: "Scene Identifier",
    }),
  ],
});
