"use client";
import Link from "next/link";
import { FC } from "react";
import { SanityImage } from "@/components/global/Images";
import { cairo, staatliches } from "@/fonts";
import { VideoPayload } from "@/types";

interface VideoitemProps {
	videos: VideoPayload;
}

export const VideoItem: FC<VideoitemProps> = ({ videos }) => {
	const { title, image, slug } = videos;

	return (
		<article className=" mb-4 h-auto border  p-4">
			{videos && (
				<div className="relative h-auto w-full">
					<SanityImage
						width={800}
						height={500}
						priority={true}
						image={videos.image}
						alt={`Cover Image for ${title}`}
						classesWrapper="w-full h-full w-full object-cover rounded-[1em] "
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

export default VideoItem;
