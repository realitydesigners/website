"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac, play } from "@/fonts";
import { BlockItem, PostsPayload } from "@/types";
import Link from "next/link";
import { FC } from "react";

interface PostItemProps {
	block: BlockItem;
	slug?: {
		current?: string;
	};
}

export const PostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, subheading, publicationDate } = block;

	const formattedDate = publicationDate
		? new Date(publicationDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
		  })
		: "Date not available";

	return (
		<div className=" w-full h-auto flex flex-col border border-gray-600/50 p-2 rounded-[1em]">
			{image && (
				<div className="relative">
					<SanityImage
						width={500}
						height={500}
						priority={true}
						image={image}
						alt={`Cover Image for ${heading}`}
						classesWrapper="w-full h-[50vw] md:h-[33vw] lg:h-[20vw] object-cover object-contain rounded-[.7em]"
					/>
				</div>
			)}
			<span
				className={`${monomaniac.className} w-full p-2 pt-4 h-auto  text-xs text-gray-400  uppercase tracking-widest`}
			>
				{formattedDate}
			</span>
			<div>
				<Link href={`/posts/${slug?.current}`}>
					<h2
						className={`${monomaniac.className} p-2 text-4xl capitalize leading-none text-gray-200 cursor-pointer`}
					>
						{heading || "no title"}
					</h2>
				</Link>
				<p
					className={`${play.className} p-2 text-md leading-tight text-gray-400`}
				>
					{subheading || "no subheading"}
				</p>
			</div>
		</div>
	);
};

export default PostItem;
