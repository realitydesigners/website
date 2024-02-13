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

interface MainPostProps {
	post: PostsPayload;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const PostImage: FC<{ image: any; heading: any }> = ({ image, heading }) => {
	if (!image) return null;

	return (
		<div className="relative">
			<SanityImage
				width={1000}
				height={1000}
				priority={true}
				image={image}
				alt={`Cover Image for ${heading}`}
				classesWrapper="w-full h-[350px]  lg:h-[33vw] object-cover object-contain rounded-[.7em]"
			/>
		</div>
	);
};

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
		<div className="h-auto flex flex-col border border-gray-600/50 p-2 rounded-[1em]">
			<PostImage image={image} heading={heading} />
			<span
				className={`${monomaniac.className} w-full p-2 pt-4 h-auto  text-xs text-gray-400  uppercase tracking-widest`}
			>
				{formattedDate}
			</span>
			<div>
				<Link href={`/posts/${slug?.current}`}>
					<h2
						className={`${monomaniac.className} p-2 text-5xl lg:text-6xl capitalize leading-none text-gray-200 cursor-pointer`}
					>
						{heading || "no title"}
					</h2>
				</Link>
				<p
					className={`${play.className} p-2 text-xl leading-tight text-gray-400`}
				>
					{subheading || "no subheading"}
				</p>
			</div>
		</div>
	);
};

export const MainPost: FC<MainPostProps> = ({ post }) => {
	if (!post || !post.block) {
		return <div>No post available</div>;
	}

	return (
		<div className="flex lg:w-1/2 w-full px-0 my-4 lg:my-0 lg:px-4">
			<PostItem block={post.block[0]} slug={post.slug} />
		</div>
	);
};

export default MainPost;
