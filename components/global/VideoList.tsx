"use client";
import Link from "next/link";
import { FC } from "react";
import { SanityImage } from "@/components/global/Images";
import { jura, staatliches } from "@/fonts";
import { VideoPayload } from "@/types";

interface VideoitemProps {
	videos: VideoPayload;
}

export const VideoItem: FC<VideoitemProps> = ({ videos }) => {
	const { title, image, slug } = videos;

	return (
		<article className="mb-4 h-auto border border-gray-800 p-1">
			{videos && (
				<div className="relative h-60 w-full">
					<SanityImage
						width={500}
						height={500}
						priority={true}
						image={videos.image}
						alt={`Cover Image for ${title}`}
						classesWrapper="w-full h-full w-full object-cover "
					/>
				</div>
			)}
			<div>
				<Link href={`/videos/${slug?.current}`}>
					<h2
						className={`${staatliches.className} p-2 text-4xl uppercase leading-none text-black cursor-pointer`}
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
		<div className="grid grid-cols-1 gap-4 p-4 pt-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{videos.map((video) => (
				<VideoItem key={video.slug?.current} videos={video} />
			))}
		</div>
	);
};

export default VideoList;
