import { monomaniac } from "@/fonts";
import React from "react";
const VideoRefBlock = ({ videoTitle, videoFileUrl, videoImage, className }) => {
	if (!videoFileUrl) {
		return <p>Video URL is not available.</p>;
	}

	switch (className) {
		case "light":
			return (
				<div className="flex p-2  justify-center w-full mb-6">
					<div className=" w-full bg-gray-300 p-2 pb-4 rounded-[.7em]  items-end flex flex-col lg:w-3/4 shadow-lg ">
						<span
							className={`${monomaniac.className} pt-[3px] pb-[5px] pr-2 pl-2 ml-2 text-[16px] bg-[#5eead4] rounded-full mb-2`}
						>
							VIDEO
						</span>
						<video
							controls
							poster={videoImage}
							preload="false"
							className="w-full h-aut rounded-[.7em] overflow-hidden shadow-xl bg-black/50 "
						>
							<source src={videoFileUrl} type="video/mp4" />
							<track src="captions.vtt" kind="captions" label="English" />
							Your browser does not support the video tag.
						</video>
						<p
							className={`${monomaniac.className} ml-2 uppercase text-2xl leading-[1em] text-center tracking-wide pt-4   text-black`}
						>
							{videoTitle}
						</p>
					</div>
				</div>
			);
		case "dark":
			return (
				<div className="flex p-2 justify-center w-full py-4">
					<div className=" w-full p-2 pb-4 rounded-[.7em]  items-start flex flex-col lg:w-2/3 shadow-lg ">
						<div className="flex flex-wrap w-full justify-between  items-center">
							<span
								className={`${monomaniac.className} my-4 pt-[3px] pb-[5px] pr-2 pl-2 ml-2 text-[16px] bg-[#5eead4] rounded-full `}
							>
								VIDEO
							</span>
							<p className=" font-bold uppercase text-md leading-[1.3em] text-center tracking-wide py-2   text-blue-100">
								{videoTitle}
							</p>
						</div>
						<video
							controls
							poster={videoImage}
							preload="false"
							className="w-full h-auto rounded-[.7em] overflow-hidden shadow-xl border border-blue-100/25"
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
				<div className="flex p-2  justify-center w-full mb-6 shadow-[3em]">
					<div className=" w-full bg-gray-600/25 p-2 pb-4 rounded-[.7em]  items-end flex flex-col lg:w-3/4 shadow-lg ">
						<span
							className={`${monomaniac.className} pt-[3px] pb-[5px] pr-2 pl-2 ml-2 text-[16px] bg-[#5eead4] rounded-full mb-2`}
						>
							VIDEO
						</span>
						<video
							controls
							poster={videoImage}
							preload="false"
							className="w-full h-aut rounded-[.7em] overflow-hidden shadow-xl bg-{#111}"
						>
							<source src={videoFileUrl} type="video/mp4" />
							<track src="captions.vtt" kind="captions" label="English" />
							Your browser does not support the video tag.
						</video>
						<p
							className={`${monomaniac.className} ml-2 uppercase text-2xl leading-[1em] text-center tracking-wide pt-4   text-gray-200`}
						>
							{videoTitle}
						</p>
					</div>
				</div>
			);
		default:
			return (
				<div className="flex p-2 justify-center w-full py-4">
					<div className=" w-full p-2 pb-4 rounded-[.7em]  items-start flex flex-col lg:w-2/3 shadow-lg ">
						<div className="flex flex-wrap w-full justify-between  items-center">
							<span
								className={`${monomaniac.className} my-4 pt-[3px] pb-[5px] pr-2 pl-2 ml-2 text-[16px] bg-[#5eead4] rounded-full `}
							>
								VIDEO
							</span>
							<p className=" font-bold uppercase text-md leading-[1.3em] text-center tracking-wide py-2   text-blue-100">
								{videoTitle}
							</p>
						</div>
						<video
							controls
							poster={videoImage}
							preload="false"
							className="w-full h-auto rounded-[.7em] overflow-hidden shadow-xl bg-{#111}"
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
