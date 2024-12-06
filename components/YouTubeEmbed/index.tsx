"use client";

import React, { useState } from "react";

export const YouTubeEmbed = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(videoUrl);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${
    isPlaying ? "1" : "0"
  }&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&controls=0&color=white&playsinline=1&loop=1&playlist=${videoId}&mute=0`;

  const handleClick = () => {
    setIsPlaying(true);
  };

  return (
    <div
      className="group relative w-full h-full overflow-hidden rounded-lg"
      style={{ paddingBottom: "50%" }}
      onClick={handleClick}
    >
      {!isPlaying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 cursor-pointer transition-opacity ">
          <div className="rounded-full bg-black hover:bg-[#121212] p-4 shadow-lg ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="white"
              className="opacity-80"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      <div className="absolute inset-0">
        <iframe
          className="absolute top-[-60px] left-0 h-[calc(100%+112px)] w-full"
          src={embedUrl}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{
            border: "none",
          }}
        />
      </div>
    </div>
  );
};
