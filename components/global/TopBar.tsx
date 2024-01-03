"use client";
import { SanityImage } from "@/components/global/Images";
import { cairo, staatliches } from "@/fonts";
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
		<div className="flex w-full lg:w-auto h-full mb-3 lg:m-0 lg:h-[4em] m-0">
			<SanityImage
				width={500}
				height={500}
				priority={true}
				image={image}
				alt={`Cover Image for ${heading}`}
				classesWrapper="h-[8em] w-auto  h-full  lg:h-[4em] lg:w-[4em] object-cover rounded-[.7em] m-0"
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
		<div className=" w-full flex flex-col-reverse lg:flex-row border border-gray-300 p-2 rounded-[1em] lg:items-center ">
			<div className="w-full lg:pl-1 lg:pr-2">
				<Link href={`/posts/${slug?.current}`}>
					<h2
						className={`${staatliches.className} pl-2 text-xl uppercase leading-none text-black cursor-pointer`}
					>
						{renderHeading()}
					</h2>
				</Link>
			</div>
			<PostImage image={image} heading={heading} />
		</div>
	);
};

const TopBar: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return <div>No posts available</div>;
	}

	return (
		<div className="w-full gap-2 lg:gap-4 grid grid-cols-2 lg:grid-cols-4 mb-4">
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
