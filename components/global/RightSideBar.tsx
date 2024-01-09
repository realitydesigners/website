"use client";
import { SanityImage } from "@/components/global/Images";
import { cairo, monomaniac } from "@/fonts";
import { BlockItem, PostsPayload } from "@/types";
import Link from "next/link";
import { FC } from "react";

interface PostItemProps {
	block: BlockItem;
	slug?: {
		current?: string;
	};
}

interface PostsListProps {
	post: PostsPayload[];
	slug?: {
		current?: string;
	};
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const PostImage: FC<{ image: any; heading: any }> = ({ image, heading }) => {
	if (!image) return null;

	return (
		<div className="flex">
			<SanityImage
				width={500}
				height={500}
				priority={true}
				image={image}
				alt={`Cover Image for ${heading}`}
				classesWrapper="h-[6em] w-[5em]  object-cover object-contain rounded-[.7em]"
			/>
		</div>
	);
};

export const PostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, publicationDate } = block;

	const formattedDate = publicationDate
		? new Date(publicationDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
		  })
		: "Date not available";

	const renderHeading = () => {
		return heading || "no title";
	};

	return (
		<div className="h-auto w-full flex flex-row border border-gray-600/50 p-2 rounded-[1em]">
			<PostImage image={image} heading={heading} />
			<div className="pl-1 pr-2 w-full flex flex-col">
				<span
					className={`${monomaniac.className} w-full p-2  h-auto  text-xs text-gray-400  uppercase tracking-widest`}
				>
					{formattedDate}
				</span>
				<div>
					<Link href={`/posts/${slug?.current}`}>
						<h2
							className={`${monomaniac.className} pl-2 text-xl capitalize leading-none text-gray-200 cursor-pointer`}
						>
							{renderHeading()}
						</h2>
					</Link>
				</div>
			</div>
		</div>
	);
};

const RightSideBar: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return <div>No posts available</div>;
	}

	return (
		<div className="lg:w-1/4 w-full gap-4 flex flex-col">
			{post.map((postItem) =>
				postItem.block?.map((block, index) =>
					block.heading && block.image ? (
						<PostItem
							key={`${postItem.slug?.current}-${index}`}
							block={block}
							slug={
								postItem.slug?.current
									? { current: postItem.slug.current }
									: undefined
							}
						/>
					) : null,
				),
			)}
		</div>
	);
};

export default RightSideBar;
