import { VideoList } from "@/components/items/VideoList";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { getVideosQuery } from "@/sanity/lib/queries";
import { VideoPayload } from "@/types";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return generateStaticSlugs("video");
}
export default async function VideoPage({ params }: Props) {
  const videos: VideoPayload[] = await sanityFetch({
    query: getVideosQuery,
    tags: ["video"],
    qParams: { slug: params },
  });
  return (
    <div className="flex-cols bg-black flex h-auto w-full flex-wrap lg:px-12">
      <VideoList videos={videos} />
    </div>
  );
}
