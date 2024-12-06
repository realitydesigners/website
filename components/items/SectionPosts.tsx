"use client";
import { SanityImage } from "@/components/global/Images";
import { BlockItem, PostsPayload } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const FormattedDate: React.FC<{ date?: string; className?: string }> = ({
  date,
  className,
}) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date not available";

  return <span className={className}>{formattedDate}</span>;
};

const Heading: React.FC<{ heading?: string; className?: string }> = ({
  heading,
  className,
}) => {
  const displayHeading = heading || "no title";
  return <h2 className={className}>{displayHeading}</h2>;
};

const SubHeading: React.FC<{ heading?: string; className?: string }> = ({
  heading,
  className,
}) => {
  const displayHeading = heading || "no title";
  return <h2 className={className}>{displayHeading}</h2>;
};

export const PostItems: FC<{
  block: BlockItem;
  slug?: { current?: string };
  date?: string;
  className?: string;
}> = ({ block, slug }) => {
  const { heading } = block;
  const imageUrl = block.imageRef?.imageUrl;

  return (
    <div className="group w-full border-gray-600/50 p-2 transition duration-300 ease-in-out hover:shadow-lg lg:block lg:flex lg:flex-row lg:flex-row-reverse">
      <div className="overflow-hidden">
        <div className="transform transition duration-300 ease-in-out group-hover:scale-105">
          <Image
            src={imageUrl}
            width={200}
            height={200}
            alt={"this"}
            className="-[.7em] h-[8em] w-full object-contain object-cover lg:h-[5em]  lg:w-[5em]"
          />
        </div>
      </div>
      <div className="flex w-full items-center lg:pl-1 lg:pr-2">
        <Link href={`/posts/${slug?.current}`} prefetch={true}>
          <Heading
            heading={block.heading}
            className={` font-kodemono  text-white p-2 font-bold capitalize leading-[1.3em]`}
          />
        </Link>
      </div>
    </div>
  );
};

const TopBar: FC<{
  post: PostsPayload[];
  slug?: { current?: string };
  className?: string;
}> = ({ post }) => {
  return (
    <div className="grid h-auto w-full grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4 ">
      {post.map((postItem) =>
        postItem.block?.map((block, index) =>
          block.heading && block.imageRef ? (
            <PostItems
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
  );
};

export const PostItem: FC<{
  block: BlockItem;
  slug?: { current?: string };
  date?: string;
  className?: string;
}> = ({ block, slug }) => {
  const { image, heading, publicationDate } = block;
  const imageUrl = block.imageRef?.imageUrl;

  return (
    <div className="group flex h-auto flex-col p-1 transition duration-300 ease-in-out hover:shadow-lg">
      <div className="overflow-hidden">
        <div className="transform transition duration-300 ease-in-out group-hover:scale-105">
          <Image
            src={imageUrl}
            width={500}
            height={500}
            alt={"this"}
            className="h-[250px] w-full object-contain object-cover lg:h-[175px]  "
          />
        </div>
      </div>

      <FormattedDate
        date={publicationDate}
        className={` h-auto font-kodemono w-full text-gray-400/50 p-1 pt-2 text-xs font-bold uppercase tracking-widest `}
      />
      <Link href={`/posts/${slug?.current}`} prefetch={true}>
        <Heading
          heading={block.heading}
          className={` font-russo text-white p-1 text-3xl font-bold capitalize leading-[1.2em]`}
        />
      </Link>
      <SubHeading
        heading={block.subheading}
        className={` font-kodemono  text-md text-gray-200/50 p-1 leading-tight `}
      />
    </div>
  );
};

const SideBar: FC<{
  post: PostsPayload[];
  slug?: { current?: string };
  className?: string;
}> = ({ post }) => {
  return (
    <div className="flex w-full flex-col gap-4 lg:w-1/4">
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
  );
};

export const MainPostItem: FC<{
  block: BlockItem;
  slug?: { current?: string };
  date?: string;
  className?: string;
}> = ({ block, slug }) => {
  const { publicationDate } = block;

  const imageUrl = block.imageRef?.imageUrl;
  const imageAlt = block.imageRef?.imageAlt;

  return (
    <div className="group flex h-auto flex-col border-gray-600/50 p-1 transition duration-300 ease-in-out">
      <div className="overflow-hidden ">
        <div className="transform transition duration-300 ease-in-out group-hover:scale-105">
          <Image
            src={imageUrl}
            width={1500}
            height={1500}
            alt={"this"}
            className="-[.7em] h-[350px]  w-full object-contain object-cover  lg:h-[33vw]"
          />
        </div>
      </div>
      <FormattedDate
        date={publicationDate}
        className={` font-kodemono h-auto w-full text-gray-400/50 p-1 pt-3 text-xs font-bold uppercase tracking-widest `}
      />
      <Link href={`/posts/${slug?.current}`} prefetch={true}>
        <Heading
          heading={block.heading}
          className={` font-russo  text-whitep-1 text-4xl font-bold uppercase leading-none lg:text-6xl`}
        />
      </Link>
      <SubHeading
        heading={block.subheading}
        className={` font-kodemono  text-gray-200/50 p-1 text-xl leading-tight `}
      />
    </div>
  );
};

export const MainPost: FC<{
  post: PostsPayload;
  className?: string;
}> = ({ post }) => {
  if (!post || !post.block) {
    return <div>No post available</div>;
  }

  return (
    <div className="my-4 flex w-full px-0 lg:my-0 lg:w-1/2 lg:px-4">
      <MainPostItem block={post.block[0]} slug={post.slug} />
    </div>
  );
};

export const RightBarPostItem: FC<{
  block: BlockItem;
  slug?: { current?: string };
  date?: string;
  className?: string;
}> = ({ block, slug }) => {
  const { publicationDate } = block;

  const imageUrl = block.imageRef?.imageUrl;
  return (
    <div className="group flex h-auto w-full flex-row p-1 transition duration-300 ease-in-out hover:shadow-lg">
      <div className="overflow-hidden">
        <div className="transform transition duration-300 ease-in-out group-hover:scale-105">
          <Image
            src={imageUrl}
            width={200}
            height={200}
            alt={"this"}
            className="-[.7em] h  -[.7em] h-[6em]  w-[5em] object-contain object-cover"
          />
        </div>
      </div>
      <div className="flex w-full flex-col pl-1 pr-2">
        <FormattedDate
          date={publicationDate}
          className={` h-auto w-full text-gray-400/50 p-1 pt-3 text-xs font-bold uppercase tracking-widest `}
        />
        <Link href={`/posts/${slug?.current}`} prefetch={true}>
          <Heading
            heading={block.heading}
            className={` font-kodemono  text-white pl-2 text-lg font-bold capitalize leading-[1.2em] leading-none `}
          />
        </Link>
      </div>
    </div>
  );
};

const RightSideBar: FC<{
  post: PostsPayload[];
  slug?: { current?: string };
  className?: string;
}> = ({ post }) => {
  return (
    <div className="mb-4 flex w-full flex-col gap-4 lg:mb-0 lg:w-1/4">
      {post.map((postItem) =>
        postItem.block?.map((block, index) =>
          block.heading && block.imageRef ? (
            <RightBarPostItem
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
      <MainPost post={mainPostData} className="order-1 lg:order-1" />
      <RightSideBar post={rightPostData} className="order-3 lg:order-3" />
      <TopBar post={topPostData} className="order-4 lg:order-4" />
    </div>
  );
};

export default SectionPosts;
