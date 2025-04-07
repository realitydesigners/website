"use client";
import { BlockItem, PostsPayload } from "@/types";
import { FC } from "react";
import { BasePostItem } from "./BasePostItem";

const TopBar: FC<{
  post: PostsPayload[];
  className?: string;
}> = ({ post, className }) => {
  return (
    <div
      className={`grid h-auto w-full grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4 ${className || ""}`}
    >
      {post.map((postItem) =>
        postItem.block?.map((block, index) =>
          block.heading && block.imageRef ? (
            <BasePostItem
              key={`${postItem.slug?.current}-${index}`}
              block={block}
              slug={postItem.slug}
              config={{
                layout: "top",
                imageSize: { width: 200, height: 200 },
              }}
            />
          ) : null
        )
      )}
    </div>
  );
};

const SideBar: FC<{
  post: PostsPayload[];
  className?: string;
}> = ({ post, className }) => {
  return (
    <div className={`flex w-full flex-col gap-4 lg:w-1/4 ${className || ""}`}>
      {post.map((postItem) =>
        postItem.block?.map((block, index) =>
          block.heading && block.imageRef ? (
            <BasePostItem
              key={`${postItem.slug?.current}-${index}`}
              block={block}
              slug={postItem.slug}
              config={{
                layout: "side",
                imageSize: { width: 500, height: 500 },
              }}
            />
          ) : null
        )
      )}
    </div>
  );
};

const MainPost: FC<{
  post: PostsPayload;
  className?: string;
}> = ({ post, className }) => {
  if (!post || !post.block) {
    return <div>No post available</div>;
  }

  return (
    <div
      className={`my-4 flex w-full px-0 lg:my-0 lg:w-1/2 lg:px-4 ${className || ""}`}
    >
      <BasePostItem
        block={post.block[0]}
        slug={post.slug}
        config={{
          layout: "main",
          imageSize: { width: 1500, height: 1500 },
        }}
      />
    </div>
  );
};

const RightSideBar: FC<{
  post: PostsPayload[];
  className?: string;
}> = ({ post, className }) => {
  return (
    <div
      className={`mb-4 flex w-full flex-col gap-4 lg:mb-0 lg:w-1/4 ${className || ""}`}
    >
      {post.map((postItem) =>
        postItem.block?.map((block, index) =>
          block.heading && block.imageRef ? (
            <BasePostItem
              key={`${postItem.slug?.current}-${index}`}
              block={block}
              slug={postItem.slug}
              config={{
                layout: "right",
                imageSize: { width: 200, height: 200 },
              }}
            />
          ) : null
        )
      )}
    </div>
  );
};

const SectionPosts: FC<{
  topPostData: PostsPayload[];
  sidePostData: PostsPayload[];
  mainPostData: PostsPayload;
  rightPostData: PostsPayload[];
}> = ({ topPostData, sidePostData, mainPostData, rightPostData }) => {
  if (!mainPostData || !mainPostData.block) {
    return <div>No main post available</div>;
  }

  return (
    <div className="flex-cols flex h-auto w-full flex-wrap p-2 pt-[80px] lg:px-16">
      <SideBar post={sidePostData} className="order-2 lg:order-2" />
      <MainPost post={mainPostData} className="order-1 lg:order-2" />
      <RightSideBar post={rightPostData} className="order-3 lg:order-3" />
      <TopBar post={topPostData} className="order-4 lg:order-4" />
    </div>
  );
};

export default SectionPosts;
