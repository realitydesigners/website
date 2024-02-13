"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac, play } from "@/fonts";
import { VideoPayload } from "@/types";
import Link from "next/link";
import { FC } from "react";

interface VideoitemProps {
	videos: VideoPayload;
}

export const VideoItem: FC<VideoitemProps> = ({ videos }) => {
	const { title, image, slug } = videos;

	return (
		<article className=" mb-4 h-auto  p-2 border border-gray-600/50 rounded-[1em]">
			{videos && (
				<div className="relative h-auto w-full">
					<SanityImage
						width={800}
						height={500}
						priority={true}
						image={videos.image}
						alt={`Cover Image for ${title}`}
						classesWrapper="w-full h-full w-full object-cover rounded-[1em]  "
					/>
				</div>
			)}
			<div>
				<Link href={`/videos/${slug?.current}`}>
					<h2
						className={`${monomaniac.className} p-2 text-4xl capitalize leading-none text-gray-200 cursor-pointer`}
					>
						{title}
					</h2>
				</Link>
			</div>
		</article>
	);
};

export default VideoItem;