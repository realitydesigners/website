import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/Blocks";
import PostsList from "@/components/items/PostsList";

import { postsBySlugQuery, postsQuery } from "@/sanity/lib//queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { PostsPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import React, { Suspense, useMemo } from "react";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return generateStaticSlugs("posts");
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generatePageMetadata<PostsPayload>(
    {
      query: postsBySlugQuery,
      slug: params.slug,
      tags: ["post"],
    },
    parent
  );
}

export default async function PageSlugRoute({ params }) {
  const currentPost = await sanityFetch<PostsPayload>({
    query: postsBySlugQuery,
    tags: ["post"],
    qParams: { slug: params.slug },
  });

  console.log(currentPost);
  let otherPosts;

  if (currentPost) {
    const allPosts = await sanityFetch<PostsPayload[]>({
      query: postsQuery,
      tags: ["post"],
    });

    otherPosts = allPosts.filter((post) => post.slug?.current !== params.slug);
  }

  const blocks = currentPost?.block || [];

  return (
    <>
      {currentPost && (
        <>
          <main>
            {blocks?.map((block) => <Blocks block={block as BlockProps} />)}
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
