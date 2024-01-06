import { monomaniac } from "@/fonts";

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
							className={`${monomaniac.className} ml-2 uppercase text-2xl leading-[1em] text-center tracking-wide pt-4 font-mono text-black`}
						>
							{videoTitle}
						</p>
					</div>
				</div>
			);
		case "dark":
			return (
				<div className="flex p-2  justify-center w-full mb-6">
					<div className=" w-full bg-[#111] p-2 pb-4 rounded-[.7em]  items-end flex flex-col lg:w-3/4 shadow-lg ">
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
							className={`${monomaniac.className} ml-2 uppercase text-2xl leading-[1em] text-center tracking-wide pt-4 font-mono text-gray-200`}
						>
							{videoTitle}
						</p>
					</div>
				</div>
			);
		default:
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
							className={`${monomaniac.className} ml-2 uppercase text-2xl leading-[1em] text-center tracking-wide pt-4 font-mono text-black`}
						>
							{videoTitle}
						</p>
					</div>
				</div>
			);
	}
};

export default VideoRefBlock;
