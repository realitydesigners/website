import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/Blocks";
import PostsList from "@/components/items/PostsList";
import { postsBySlugQuery, postsQuery } from "@/sanity/lib//queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { PostsPayload } from "@/types";
import { Metadata } from "next";
import React, { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return generateStaticSlugs("posts");
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const resolvedParams = await props.params;
  const post = await sanityFetch<PostsPayload>({
    query: postsBySlugQuery,
    tags: ["post"],
    qParams: { slug: resolvedParams.slug },
  });

  const ogImage = urlForOpenGraphImage(post?.block?.[0]?.imageRef);

  return {
    title: post?.block?.[0]?.heading || "Post",
    description: post?.block?.[0]?.subheading || "Article details",
    openGraph: {
      title: post?.block?.[0]?.heading || "Post",
      description: post?.block?.[0]?.subheading || "Article details",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            alt: post?.block?.[0]?.imageRef?.imageAlt || "Article image",
          },
        ],
      }),
    },
  };
}

export default async function PostSlugRoute(props: Props) {
  const resolvedParams = await props.params;
  const currentPost = await sanityFetch<PostsPayload>({
    query: postsBySlugQuery,
    tags: ["post"],
    qParams: { slug: resolvedParams.slug },
  });

  let otherPosts;

  if (currentPost) {
    const allPosts = await sanityFetch<PostsPayload[]>({
      query: postsQuery,
      tags: ["post"],
    });

    otherPosts = allPosts.filter(
      (post) => post.slug?.current !== resolvedParams.slug
    );
  }

  const blocks = currentPost?.block || [];

  return (
    <>
      {currentPost && (
        <>
          <main>
            {blocks?.map((block) => (
              <Blocks key={block._key} block={block as BlockProps} />
            ))}
          </main>
          <Suspense fallback={<div>Loading...</div>}>
            {otherPosts && (
              <div className="w-full py-16 px-4 lg:px-8">
                <PostsList post={otherPosts} />
              </div>
            )}
          </Suspense>
        </>
      )}
    </>
  );
}
