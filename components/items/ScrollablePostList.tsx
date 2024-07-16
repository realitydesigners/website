"use client";
import { SanityImage } from "@/components/global/Images";
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

const baseClipPath = "polygon(10% 0, 100% 0, 100% 96%, 90% 100%, 0 100%, 0 3%)";
const mdClipPath = "polygon(3% 0, 100% 0, 100% 94%, 96% 100%, 0 100%, 0 4%)";

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
				classesWrapper="w-full h-[50vw] md:h-[33vw] lg:h-[15vw] object-cover object-contain rounded-[.7em]"
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

	const renderHeading = () => {
		return heading || "no title";
	};

	const renderSubheading = () => {
		return subheading || "no subheading";
	};

	return (
		<div
			className={
				"group flex h-auto w-full transform flex-col  overflow-hidden bg-gray-600/20 p-3 transition-transform hover:scale-105 hover:bg-gray-600/30"
			}
			style={{
				clipPath: "polygon(8% 0, 100% 0, 100% 93%, 92% 100%, 0 100%, 0 6%)",
			}}
		>
			<div className="flex h-auto w-full items-center justify-between">
				<span
					className={` h-auto w-full  p-2  text-xs uppercase  tracking-widest text-gray-400`}
				>
					{formattedDate}
				</span>

				<span className="text-blackflex rounded-full border border-gray-600/25 bg-gray-600/50 px-2 py-1 text-xs font-bold uppercase">
					post
				</span>
			</div>

			<div>
				<Link href={`/posts/${slug?.current}`}>
					<h2
						className={` cursor-pointer p-2 text-4xl capitalize leading-none tracking-wide text-gray-200 group-hover:text-gray-100`}
					>
						{renderHeading()}
					</h2>
				</Link>
				<p
					className={` text-md p-2 leading-tight text-gray-400 group-hover:text-gray-100`}
				>
					{renderSubheading()}
				</p>
			</div>
		</div>
	);
};
const ScrollablePostList: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return <div>No posts available</div>;
	}

	return (
		<div
			className="  custom-scrollbar fixed bottom-16 left-2 right-2 top-2 overflow-auto p-4 shadow-2xl  shadow-inner backdrop-blur-[30px] md:bottom-16 md:left-20 md:right-20 md:top-10 lg:p-4"
			style={{
				clipPath: window.innerWidth >= 768 ? mdClipPath : baseClipPath,
			}}
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{post.map((postItem, index) =>
					postItem.block?.map((block, index2) =>
						block.heading && block.image ? (
							<PostItem
								key={`${postItem.slug?.current}-${index}-${index2}`}
								block={block}
								slug={postItem.slug}
							/>
						) : null,
					),
				)}
			</div>
			<style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background-color: rgba(255, 255, 255, 0.05);
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    border: 2px solid transparent;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                }
            `}</style>
		</div>
	);
};

export default ScrollablePostList;
