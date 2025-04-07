"use client";
import { SanityImage } from "@/components/global/Images";
import { BlockItem } from "@/types";
import Link from "next/link";
import { FC } from "react";

interface PostItemProps {
  block: BlockItem;
  slug?: {
    current?: string;
  };
}

export const PostItem: FC<PostItemProps> = ({ block, slug }) => {
  const { image, heading, subheading, publicationDate } = block;

  const formattedDate = publicationDate
    ? new Date(publicationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date not available";

  return (
    <div className=" flex h-auto w-full flex-col rounded-[1em] border border-gray-600/50 p-2">
      {image && (
        <div className="relative">
          <SanityImage
            width={500}
            height={500}
            priority={true}
            image={image}
            alt={`Cover Image for ${heading}`}
            classesWrapper="w-full h-[50vw] md:h-[33vw] lg:h-[20vw] object-cover object-contain rounded-[.7em]"
          />
        </div>
      )}
      <span
        className={` h-auto w-full p-2 pt-4  text-xs uppercase  tracking-widest text-gray-400`}
      >
        {formattedDate}
      </span>
      <div>
        <Link href={`/posts/${slug?.current}`}>
          <h2
            className={` cursor-pointer p-2 text-4xl capitalize leading-none text-gray-200`}
          >
            {heading || "no title"}
          </h2>
        </Link>
        <p className={` text-md p-2 leading-tight text-gray-400`}>
          {subheading || "no subheading"}
        </p>
      </div>
    </div>
  );
};

export default PostItem;
