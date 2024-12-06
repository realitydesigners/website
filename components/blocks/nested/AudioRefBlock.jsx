"use client";
import React from "react";

const AudioPlayer = ({ audioTitle, audioFileUrl }) => {
  if (!audioFileUrl) {
    return <p>Audio file not found.</p>;
  }

  return (
    <div className="w-full py-4 flex justify-center p-2">
      <div className="w-full md:w-3/4 lg:w-1/2 items-end flex flex-col">
        <div className="flex flex-wrap w-full justify-between  items-center">
          <span className="my-4 font-kodemono ml-2 font-bold rounded-full text-black bg-purple-400 pb-[5px] pl-2 pr-2 pt-[3px] text-sm">
            PODCAST
          </span>
          <p className="ml-2 pt-4 font-russo text-center text-2xl uppercase leading-[1em] tracking-wide text-black">
            {audioTitle}
          </p>
        </div>

        {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
        <audio controls className="w-full pt-2" src={audioFileUrl}>
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

const AudioRefBlock = ({ audioTitle, audioFileUrl }) => {
  return <AudioPlayer audioTitle={audioTitle} audioFileUrl={audioFileUrl} />;
};

export default React.memo(AudioRefBlock);
