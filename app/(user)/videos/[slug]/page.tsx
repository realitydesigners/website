import { BlockProps } from "@/components/blocks/Blocks";
import { sanityFetch } from "@/sanity/lib/client";
import { getVideoBySlugQuery } from "@/sanity/lib/queries";
import type { VideoPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import VideoPageClient from "./client";
import { generatePageMetadata } from "@/lib/metadata";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generatePageMetadata<VideoPayload>(
    {
      query: getVideoBySlugQuery,
      slug: params.slug,
      tags: ["video"],
      // Videos use the block structure like posts
    },
    parent
  );
}

export default async function PageSlugRoute({ params }: Props) {
  const currentVideo = await sanityFetch<VideoPayload>({
    query: getVideoBySlugQuery,
    tags: ["video"],
    qParams: { slug: params.slug },
  });

  const videoUrl = currentVideo.url;
  console.log(videoUrl);
  const blocks = currentVideo?.block || [];
  const { title } = currentVideo || {};

  return (
    <>
      {currentVideo && (
        <div className="lg:flex-cols flex h-auto w-full flex-row flex-wrap items-start justify-center bg-black ">
          <div className="flex  w-full flex-col items-center justify-centerlg:w-4/6" />
          <VideoPageClient
            videoUrl={videoUrl}
            title={title}
            blocks={blocks as (BlockProps & { _key: string })[]}
          />
        </div>
      )}
    </>
  );
}
