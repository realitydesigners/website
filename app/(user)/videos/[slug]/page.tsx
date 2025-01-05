import { BlockProps } from "@/components/blocks/Blocks";
import { sanityFetch } from "@/sanity/lib/client";
import { getVideoBySlugQuery } from "@/sanity/lib/queries";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import type { PostsPayload, VideoPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import VideoPageClient from "./client";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metadataBaseUrl =
    process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000";
  const video = await sanityFetch<PostsPayload>({
    query: getVideoBySlugQuery,
    tags: ["video"],
    qParams: { slug: params.slug },
  });
  //@ts-ignore
  const ogImage = urlForOpenGraphImage(video?.block?.[0]?.image);
  const metadataBase = new URL(metadataBaseUrl);

  return {
    title: video?.block?.[0]?.heading,
    description: video?.block?.[0]?.subheading || (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
    metadataBase,
  };
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
