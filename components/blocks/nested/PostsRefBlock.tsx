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
      <div className="bg-gradient-to-r from-blue-200/10 to-blue-200/5 w-full rounded-lg md:w-1/3 group flex h-auto flex-row p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl lg:w-1/3">
        <img
          src={image}
          alt={heading}
          className="h-[80px] max-w-[80px] rounded-[.5em] object-cover"
        />
        <div className="relative flex w-3/4 flex-col pl-4">
          <p className="pt-2 mb-2  font-kodemono text-xs uppercase leading-none tracking-wide bg-gradient-to-r from-blue-100/50 to-blue-100/50 text-transparent bg-clip-text">
            Related Post
          </p>

          <Link
            className="duration-3 font-bold leading-[1.2em] text-2xl bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text transition-colors group-hover:text-gray-100 group-hover:underline"
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
