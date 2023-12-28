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
		<div className="relative">
			<SanityImage
				width={500}
				height={500}
				priority={true}
				image={image}
				alt={`Cover Image for ${heading}`}
				classesWrapper="w-full h-[250px] lg:h-[175px] object-cover object-contain rounded-[.7em]"
			/>
		</div>
	);
};

export const PostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, subheading, publicationDate } = block;

	const formattedDate = publicationDate
		? new Date(publicationDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
		  })
		: "Date not available";

	const renderHeading = () => {
		return heading || "no title";
	};

	const renderSubheading = () => {
		return subheading || "no subheading";
	};

	return (
		<div className="h-auto border border-gray-300 p-2 rounded-[1em]">
			<PostImage image={image} heading={heading} />
			<span
				className={`${staatliches.className} w-10/12 p-2 text-xs text-black uppercase tracking-widest`}
			>
				{formattedDate}
			</span>
			<div>
				<Link href={`/posts/${slug?.current}`}>
					<h2
						className={`${staatliches.className} p-2 text-3xl uppercase leading-none text-black cursor-pointer`}
					>
						{renderHeading()}
					</h2>
				</Link>
				<p
					className={`${cairo.className} p-2 text-md leading-tight text-black`}
				>
					{renderSubheading()}
				</p>
			</div>
		</div>
	);
};

const SideBar: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return <div>No posts available</div>;
	}

	return (
		<div className="lg:w-1/4 gap-4 flex flex-col">
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

export default SideBar;
