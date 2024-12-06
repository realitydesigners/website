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
          <span
            className={` my-4 pt-[3px] pb-[5px] pr-2 pl-2 ml-2 text-[16px] bg-[#5eead4] rounded-full `}
          >
            PODCAST
          </span>
          <p className=" px-4 font-bold uppercase text-md leading-[1.3em] text-center tracking-wide  text-blue-100">
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
