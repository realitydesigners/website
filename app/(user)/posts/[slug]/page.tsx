import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/Blocks";
import PostsList from "@/components/items/PostsList";
import { postsBySlugQuery, postsQuery } from "@/sanity/lib//queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { PostsPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import React, { Suspense } from "react";
import { generatePageMetadata } from "@/lib/metadata";
import { draftMode } from "next/headers";

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export function generateStaticParams() {
  return generateStaticSlugs("posts");
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await sanityFetch<PostsPayload>({
    query: postsBySlugQuery,
    qParams: { slug: params.slug },
    tags: ["post"],
  });

  return generatePageMetadata<PostsPayload>(
    {
      query: postsBySlugQuery,
      slug: post?.slug?.current || "",
      tags: ["post"],
    },
    parent
  );
}

export default async function PageSlugRoute({ params }: PageProps) {
  const [currentPost, allPosts] = await Promise.all([
    sanityFetch<PostsPayload>({
      query: postsBySlugQuery,
      qParams: { slug: params.slug },
      tags: ["post"],
    }),
    sanityFetch<PostsPayload[]>({
      query: postsQuery,
      tags: ["post"],
    }),
  ]);

  if (!currentPost) {
    return null;
  }

  const otherPosts = allPosts.filter(
    (post) => post.slug?.current !== currentPost.slug?.current
  );

  const blocks = currentPost?.block || [];

  return (
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
  );
}
