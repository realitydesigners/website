import { monomaniac } from "@/fonts";
import React from "react";

const YouTubeEmbed = ({ videoUrl, width, height }) => (
	<iframe
		width={width}
		height={height}
		src={videoUrl}
		title="YouTube video player"
		allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowFullScreen
	/>
);

const VideoRefBlock = ({ videoTitle, videoImage, className, videoUrl }) => {
	if (!videoUrl) {
		return null;
	}

	switch (className) {
		case "light":
			return (
				<div className="mb-6 flex  w-full justify-center p-2">
					<div className=" flex w-full flex-col items-end rounded-[.7em]  bg-gray-300 p-2 pb-4 shadow-lg lg:w-3/4 ">
						<span
							className={`${monomaniac.className} mb-2 ml-2 rounded-full bg-[#5eead4] pb-[5px] pl-2 pr-2 pt-[3px] text-[16px]`}
						>
							VIDEO
						</span>
						<div className="w-full h-[50vw] sm:h-[55vw] lg:h-[24em]">
							<YouTubeEmbed videoUrl={videoUrl} width="100%" height="100%" />
						</div>
						<p
							className={`${monomaniac.className} ml-2 pt-4 text-center text-2xl uppercase leading-[1em] tracking-wide   text-black`}
						>
							{videoTitle}
						</p>
					</div>
				</div>
			);
		case "dark":
			return (
				<div className="flex w-full justify-center p-2 py-4">
					<div className=" flex w-full flex-col items-start  rounded-[.7em] p-2 pb-4 shadow-lg lg:w-2/3 ">
						<div className="flex w-full flex-wrap items-center  justify-between">
							<span
								className={`${monomaniac.className} my-4 ml-2 rounded-full bg-[#5eead4] pb-[5px] pl-2 pr-2 pt-[3px] text-[16px] `}
							>
								VIDEO
							</span>
							<p className=" text-md py-2 text-center font-bold uppercase leading-[1.3em] tracking-wide   text-blue-100">
								{videoTitle}
							</p>
						</div>
						<div className="w-full h-[50vw] sm:h-[55vw] lg:h-[24em]">
							<YouTubeEmbed videoUrl={videoUrl} width="100%" height="100%" />
						</div>
					</div>
				</div>
			);
		case "transparent":
			return (
				<div className="mb-6 flex  w-full justify-center p-2 shadow-[3em]">
					<div className=" flex w-full flex-col items-end rounded-[.7em]  bg-gray-600/25 p-2 pb-4 shadow-lg lg:w-3/4 ">
						<span
							className={`${monomaniac.className} mb-2 ml-2 rounded-full bg-[#5eead4] pb-[5px] pl-2 pr-2 pt-[3px] text-[16px]`}
						>
							VIDEO
						</span>
						<div className="w-full h-[50vw] sm:h-[55vw] lg:h-[24em]">
							<YouTubeEmbed videoUrl={videoUrl} width="100%" height="100%" />
						</div>
						<p
							className={`${monomaniac.className} ml-2 pt-4 text-center text-2xl uppercase leading-[1em] tracking-wide   text-gray-200`}
						>
							{videoTitle}
						</p>
					</div>
				</div>
			);
		default:
			return null;
	}
};

export default React.memo(VideoRefBlock);
