"use client";
import React from "react";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";

const VideoRefBlock = ({ videoTitle, className, videoUrl }) => {
  if (!videoUrl) return null;

  switch (className) {
    case "light":
      return (
        <div className="mb-6 flex w-full justify-center p-2">
          <div className="flex w-full flex-col items-end rounded-[.7em] bg-gray-300 p-2 pb-4 shadow-lg lg:w-3/4">
            <span className="my-4 font-kodemono ml-2 font-bold rounded-full text-black bg-[#5eead4] pb-[5px] pl-2 pr-2 pt-[3px] text-sm">
              VIDEO
            </span>
            <YouTubeEmbed videoUrl={videoUrl} />
            <p className="ml-2 pt-4 font-russo text-center text-2xl uppercase leading-[1em] tracking-wide text-black">
              {videoTitle}
            </p>
          </div>
        </div>
      );
    case "dark":
      return (
        <div className="flex w-full justify-center p-2 py-4">
          <div className="flex w-full flex-col items-start rounded-[.7em] p-2 pb-4 shadow-lg lg:w-2/3">
            <div className="flex w-full flex-wrap items-center justify-between">
              <span className="my-4 font-kodemono ml-2 font-bold rounded-full text-black bg-[#5eead4] pb-[5px] pl-2 pr-2 pt-[3px] text-sm">
                VIDEO
              </span>
              <p className="text-md font-russo py-2 text-center font-bold uppercase leading-[1.3em] tracking-wide text-white">
                {videoTitle}
              </p>
            </div>
            <YouTubeEmbed videoUrl={videoUrl} />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default React.memo(VideoRefBlock);
