"use client";
import { BlockItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import {
  PostDisplayConfig,
  formatDate,
  getImageAlt,
  getImageUrl,
} from "@/utils/post-utils";

const layoutStyles = {
  main: {
    container:
      "group flex h-auto flex-col border-gray-600/50 p-1 transition duration-300 ease-in-out",
    image: "h-[350px] w-full object-contain object-cover lg:h-[33vw]",
    heading:
      "font-russo text-white p-1 text-4xl font-bold uppercase leading-none lg:text-6xl",
    date: "font-kodemono h-auto w-full text-gray-400/50 p-1 pt-3 text-xs font-bold uppercase tracking-widest",
  },
  side: {
    container:
      "group flex h-auto flex-col p-1 transition duration-300 ease-in-out hover:shadow-lg",
    image: "h-[250px] w-full object-contain object-cover lg:h-[175px]",
    heading:
      "font-russo text-white p-1 text-3xl font-bold capitalize leading-[1.2em]",
    date: "font-kodemono w-full text-gray-400/50 p-1 pt-2 text-xs font-bold uppercase tracking-widest",
  },
  right: {
    container:
      "group flex h-auto w-full flex-row p-1 transition duration-300 ease-in-out hover:shadow-lg",
    image: "h-[6em] w-[5em] object-contain object-cover",
    heading:
      "font-kodemono text-white pl-2 text-lg font-bold capitalize leading-[1.2em] leading-none",
    date: "h-auto w-full text-gray-400/50 p-1 pt-3 text-xs font-bold uppercase tracking-widest",
  },
  top: {
    container:
      "group w-full border-gray-600/50 p-2 transition duration-300 ease-in-out hover:shadow-lg lg:block lg:flex lg:flex-row lg:flex-row-reverse",
    image: "h-[8em] w-full object-contain object-cover lg:h-[5em] lg:w-[5em]",
    heading:
      "font-kodemono text-white p-2 font-bold capitalize leading-[1.3em]",
    date: "font-kodemono text-gray-400/50 p-1 text-xs uppercase tracking-widest",
  },
  list: {
    container:
      "group flex h-auto flex-col p-1 transition duration-300 ease-in-out hover:shadow-lg",
    image:
      "h-[50vw] w-full object-contain object-cover md:h-[33vw] lg:h-[15vw]",
    heading:
      "font-kodemono text-white p-1 text-2xl font-bold capitalize leading-[1.2em]",
    date: "font-kodemono text-gray-400/50 p-1 text-xs uppercase tracking-widest",
  },
};

export const BasePostItem: FC<{
  block: BlockItem;
  slug?: { current?: string };
  config: PostDisplayConfig;
}> = ({ block, slug, config }) => {
  const {
    layout,
    imageSize = { width: 500, height: 500 },
    className,
    imageClassName,
    headingClassName,
    dateClassName,
  } = config;
  const styles = layoutStyles[layout];

  const imageUrl = getImageUrl(block);
  const imageAlt = getImageAlt(block);
  const formattedDate = formatDate(block.publicationDate);

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {imageUrl && (
        <div className="overflow-hidden">
          <div className="transform transition duration-300 ease-in-out group-hover:scale-105">
            <img
              src={imageUrl}
              alt={imageAlt}
              className={`${styles.image} ${imageClassName || ""}`}
            />
          </div>
        </div>
      )}

      <div
        className={
          layout === "right" ? "flex w-full flex-col pl-1 pr-2" : undefined
        }
      >
        <span className={`${styles.date} ${dateClassName || ""}`}>
          {formattedDate}
        </span>

        <Link href={`/posts/${slug?.current}`} prefetch={true}>
          <h2 className={`${styles.heading} ${headingClassName || ""}`}>
            {block.heading || "no title"}
          </h2>
        </Link>

        {block.subheading && layout !== "top" && layout !== "right" && (
          <p className="font-kodemono text-gray-200/50 p-1 text-md leading-tight">
            {block.subheading}
          </p>
        )}
      </div>
    </div>
  );
};
