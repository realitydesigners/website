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
		<div className="flex lg:w-auto w-full lg:m-0 mb-3">
			<SanityImage
				width={500}
				height={500}
				priority={true}
				image={image}
				alt={`Cover Image for ${heading}`}
				classesWrapper="lg:w-[5em] lg:h-[5em] w-full h-[8em] object-cover object-contain rounded-[.7em]"
			/>
		</div>
	);
};

export const PostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, subheading, publicationDate } = block;

	const renderHeading = () => {
		return heading || "no title";
	};

	return (
		<div className="w-full lg:flex p-2 lg:flex-row lg:block border border-gray-600/50 lg:flex-row-reverse rounded-[.7em]">
			<PostImage image={image} heading={heading} />
			<div className="w-full flex items-center lg:pl-1 lg:pr-2">
				<Link href={`/posts/${slug?.current}`}>
					<h2
						className={`${monomaniac.className} pl-2 text-lg capitalize leading-none text-gray-200 cursor-pointer`}
					>
						{renderHeading()}
					</h2>
				</Link>
			</div>
		</div>
	);
};

const TopBar: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return <div>No posts available</div>;
	}

	return (
		<div className="w-full h-auto gap-3 lg:gap-4 grid grid-cols-2 lg:grid-cols-4 mb-4">
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

export default TopBar;
