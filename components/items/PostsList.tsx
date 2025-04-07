"use client";
import { PostsPayload } from "@/types";
import { FC } from "react";
import { BasePostItem } from "./BasePostItem";

interface PostsListProps {
  post: PostsPayload[];
  className?: string;
}

const PostsList: FC<PostsListProps> = ({ post, className }) => {
  if (!post) {
    return <div>No posts available</div>;
  }

  return (
    <div className={`w-full flex flex-col ${className || ""}`}>
      <h4 className="font-russo text-xl lg:text-2xl mb-4 text-gray-200">
        More Posts
      </h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {post.map((postItem) =>
          postItem.block?.map((block, index) =>
            block.heading && block.imageRef ? (
              <BasePostItem
                key={`${postItem.slug?.current}-${index}`}
                block={block}
                slug={postItem.slug}
                config={{
                  layout: "list",
                  imageSize: { width: 500, height: 500 },
                }}
              />
            ) : null
          )
        )}
      </div>
    </div>
  );
};

export default PostsList;
