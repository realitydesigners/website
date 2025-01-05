import { BlockProps } from "@/components/blocks/Blocks";
import { sanityFetch } from "@/sanity/lib/client";
import { getVideoBySlugQuery } from "@/sanity/lib/queries";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import type { PostsPayload, VideoPayload } from "@/types";
import { Metadata } from "next";
import VideoPageClient from "./client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const resolvedParams = await props.params;
  const video = await sanityFetch<PostsPayload>({
    query: getVideoBySlugQuery,
    tags: ["video"],
    qParams: { slug: resolvedParams.slug },
  });

  // @ts-ignore
  const ogImage = urlForOpenGraphImage(video?.block?.[0]?.image);

  return {
    title: video?.block?.[0]?.heading || "Video",
    description: video?.block?.[0]?.subheading || "Video details",
    openGraph: {
      title: video?.block?.[0]?.heading || "Video",
      description: video?.block?.[0]?.subheading || "Video details",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            alt: video?.block?.[0]?.heading || "Video thumbnail",
          },
        ],
      }),
    },
  };
}

export default async function VideoSlugRoute(props: Props) {
  const resolvedParams = await props.params;
  const currentVideo = await sanityFetch<VideoPayload>({
    query: getVideoBySlugQuery,
    tags: ["video"],
    qParams: { slug: resolvedParams.slug },
  });

  const videoUrl = currentVideo.url;
  const blocks = currentVideo?.block || [];
  const { title } = currentVideo || {};

  return (
    <>
      {currentVideo && (
        <div className="lg:flex-cols flex h-auto w-full flex-row flex-wrap items-start justify-center bg-black ">
          <div className="flex w-full flex-col items-center justify-centerlg:w-4/6" />
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
