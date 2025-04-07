import { BlockItem } from "@/types";

export const formatDate = (date?: string) => {
  return date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date not available";
};

export const getImageUrl = (block: BlockItem) => {
  return block.imageRef?.imageUrl;
};

export const getImageAlt = (block: BlockItem) => {
  return block.imageRef?.imageAlt || block.heading || "Post image";
};

export type PostLayout = "main" | "side" | "right" | "top" | "list";

export interface PostDisplayConfig {
  layout: PostLayout;
  imageSize?: {
    width: number;
    height: number;
  };
  className?: string;
  imageClassName?: string;
  headingClassName?: string;
  dateClassName?: string;
}
