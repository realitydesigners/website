import { monomaniac } from "@/fonts";
import React from "react";
const VideoRefBlock = ({ videoTitle, videoFileUrl, videoImage, className }) => {
	if (!videoFileUrl) {
		return <p>Video URL is not available.</p>;
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
						<video
							controls
							poster={videoImage}
							preload="false"
							className="h-aut w-full overflow-hidden rounded-[.7em] bg-black/50 shadow-xl "
						>
							<source src={videoFileUrl} type="video/mp4" />
							<track src="captions.vtt" kind="captions" label="English" />
							Your browser does not support the video tag.
						</video>
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
						<video
							controls
							poster={videoImage}
							preload="false"
							className="h-auto w-full overflow-hidden rounded-[.7em] border border-blue-100/25 shadow-xl"
						>
							<source src={videoFileUrl} type="video/mp4" />
							<track src="captions.vtt" kind="captions" label="English" />
							Your browser does not support the video tag.
						</video>
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
						<video
							controls
							poster={videoImage}
							preload="false"
							className="h-aut bg-{#111} w-full overflow-hidden rounded-[.7em] shadow-xl"
						>
							<source src={videoFileUrl} type="video/mp4" />
							<track src="captions.vtt" kind="captions" label="English" />
							Your browser does not support the video tag.
						</video>
						<p
							className={`${monomaniac.className} ml-2 pt-4 text-center text-2xl uppercase leading-[1em] tracking-wide   text-gray-200`}
						>
							{videoTitle}
						</p>
					</div>
				</div>
			);
		default:
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
						<video
							controls
							poster={videoImage}
							preload="false"
							className="bg-{#111} h-auto w-full overflow-hidden rounded-[.7em] shadow-xl"
						>
							<source src={videoFileUrl} type="video/mp4" />
							<track src="captions.vtt" kind="captions" label="English" />
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			);
	}
};

export default React.memo(VideoRefBlock);
