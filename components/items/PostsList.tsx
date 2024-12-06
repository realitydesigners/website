"use client";
import { BlockItem, PostsPayload } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface PostItemProps {
  block: BlockItem;
  slug?: {
    current?: string;
  };
}

interface PostsListProps {
  post: PostsPayload[];
  slug?: {
    current?: string;
  };
}

export const PostItem: FC<PostItemProps> = ({ block, slug }) => {
  const { image, heading, subheading, publicationDate } = block;

  const imageUrl = block.imageRef?.imageUrl;

  const formattedDate = publicationDate
    ? new Date(publicationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date not available";

  return (
    <div className="group flex h-auto flex-col border-gray-600/50 p-1 transition duration-300 ease-in-out hover:shadow-lg">
      <div className="overflow-hidden">
        {/* Apply scaling on hover to the image */}
        <div className="transform transition duration-300 ease-in-out group-hover:scale-105">
          {/* <PostImage image={image} heading={heading} /> */}
          <Image
            src={imageUrl}
            width={300}
            height={300}
            alt={"this"}
            className="-[.7em] h-[50vw] w-full object-contain object-cover md:h-[33vw]  lg:h-[15vw]"
          />
        </div>
      </div>
      <span
        className={` font-kodemono  py-2 h-auto w-full text-gray-400/50  text-xs uppercase  tracking-widest`}
      >
        {formattedDate}
      </span>
      <div>
        <Link href={`/posts/${slug?.current}`}>
          <h2
            className={` font-kodemono mb-4 text-white p-1 text-4xl font-bold capitalize leading-[1.2em] text-transparent`}
          >
            {heading}
          </h2>
        </Link>
        <p
          className={` font-kodemono  text-gray-400/50 p-1 text-lg leading-tight`}
        >
          {subheading}
        </p>
      </div>
    </div>
  );
};

const PostsList: FC<PostsListProps> = ({ post }) => {
  if (!post) {
    return <div>No posts available</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <h4 className={`  text-2xl lg:text-4xl mb-4  text-gray-200 `}>
        More Posts
      </h4>
      <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
        {post.map((postItem) =>
          postItem.block?.map((block, index) =>
            block.heading && block.imageRef ? (
              <PostItem
                key={`${postItem.slug?.current}-${index}`}
                block={block}
                slug={
                  postItem.slug?.current
                    ? { current: postItem.slug.current }
                    : undefined
                }
              />
            ) : null
          )
        )}
      </div>
    </div>
  );
};

export default PostsList;
