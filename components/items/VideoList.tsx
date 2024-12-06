"use client";
import { SanityImage } from "@/components/global/Images";
import { VideoPayload } from "@/types";
import Link from "next/link";
import { FC } from "react";

interface VideoitemProps {
  videos: VideoPayload;
}

export const VideoItem: FC<VideoitemProps> = ({ videos }) => {
  const { title, image, slug } = videos;

  return (
    <article className="mb-4 ">
      {videos && (
        <div className="relative h-auto mb-4 w-full">
          <SanityImage
            width={500}
            height={500}
            priority={true}
            image={videos.image}
            alt={`Cover Image for ${title}`}
            classesWrapper="w-full h-[200px] sm:h-[20vw] lg:h-[200px] w-full object-cover rounded-lg "
          />
        </div>
      )}
      <div>
        <Link href={`/videos/${slug?.current}`}>
          <h2
            className={` font-russo cursor-pointer p-2 text-2xl uppercase leading-none text-white`}
          >
            {title}
          </h2>
        </Link>
      </div>
    </article>
  );
};

interface VideoListProps {
  videos: VideoPayload[];
}
export const VideoList: FC<VideoListProps> = ({ videos }) => {
  if (!videos) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-12 p-4 pt-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoItem key={video.slug?.current} videos={video} />
      ))}
    </div>
  );
};

export default VideoList;
