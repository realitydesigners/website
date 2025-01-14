import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "model",
  title: "Model",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
    }),
  ],
});

export interface ModelDocument {
  _type: "model";
  _id: string;
  title?: string;
  file?: {
    asset: {
      url: string;
      originalFilename?: string;
    };
  };
}
