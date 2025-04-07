import { VideoList } from "@/components/items/VideoList";
import { sanityFetch } from "@/sanity/lib/client";
import { getVideosQuery } from "@/sanity/lib/queries";
import { VideoPayload } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Videos",
  description: "Videos",
};

const Page = async (props: any) => {
  const videos = await sanityFetch<VideoPayload[]>({
    query: getVideosQuery,
    tags: ["videos"],
  });

  return (
    <div className="flex-cols bg-black flex h-auto w-full flex-wrap lg:px-12">
      <VideoList videos={videos} />
    </div>
  );
};

export default Page;
