"use client";
import { SanityImage } from "@/components/global/Images";
import Link from "next/link";
import React from "react";

interface PostsCardLightProps {
  slug: string;
  heading: string;
  image: string;
}

const PostsCardLight: React.FC<PostsCardLightProps> = ({
  slug,
  heading,
  image,
}) => {
  return (
    <div className="flex w-full items-center justify-center py-4 px-4">
      <div className="bg-gradient-to-r from-blue-200/10 to-blue-100/5 w-full rounded-lg md:w-1/3 group flex h-auto flex-row p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl lg:w-1/3">
        <img
          src={image}
          alt={heading}
          className="h-[80px] max-w-[80px] rounded-[.5em] object-cover"
        />
        <div className="relative flex w-3/4 flex-col pl-4">
          <p className="pt-2 mb-2 font-bold font-kodemono text-xs uppercase leading-none tracking-wide text-gray-200/500 ">
            Related Post
          </p>

          <Link
            className="duration-3 font-russo font-bold leading-[1.2em] text-xl lg:text-2xl text-white transition-colors group-hover:text-gray-100 group-hover:underline"
            href={`/posts/${slug}`}
          >
            {heading}
          </Link>
        </div>
      </div>
    </div>
  );
};

const PostsRefBlock: React.FC<PostsCardLightProps> = ({
  slug,
  heading,
  image,
}) => {
  return <PostsCardLight slug={slug} heading={heading} image={image} />;
};

export default PostsRefBlock;
