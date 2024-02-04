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
				"h-auto bg-gray-600/10 flex w-full flex-col p-3  overflow-hidden transition-transform transform group hover:scale-105 hover:bg-gray-600/20"
			}
			style={{
				clipPath: "polygon(8% 0, 100% 0, 100% 93%, 92% 100%, 0 100%, 0 6%)",
			}}
		>
			<div className="w-full flex justify-between h-auto items-center">
				<span
					className={`${monomaniac.className} w-full p-2  h-auto  text-xs text-gray-400  uppercase tracking-widest`}
				>
					{formattedDate}
				</span>

				<span className="uppercase px-2 rounded-full font-bold text-xs py-1 bg-gray-600/50 border border-gray-600/25 text-blackflex">
					post
				</span>
			</div>

			<div>
				<Link href={`/posts/${slug?.current}`}>
					<h2
						className={`${monomaniac.className} p-2 text-4xl tracking-wide capitalize leading-none text-gray-200 cursor-pointer group-hover:text-gray-100`}
					>
						{renderHeading()}
					</h2>
				</Link>
				<p
					className={`${play.className} p-2 text-md leading-tight text-gray-400 group-hover:text-gray-100`}
				>
					{renderSubheading()}
				</p>
			</div>
		</div>
	);
};

const baseClipPath = "polygon(10% 0, 100% 0, 100% 96%, 90% 100%, 0 100%, 0 3%)";
const mdClipPath = "polygon(3% 0, 100% 0, 100% 94%, 96% 100%, 0 100%, 0 4%)";

const ScrollablePostList: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return <div>No posts available</div>;
	}

	return (
		<div
			className="  fixed top-2 md:top-10 left-2 md:left-20 right-2 md:right-20 bottom-16 md:bottom-16  lg:p-4 p-4 overflow-auto custom-scrollbar backdrop-blur-[30px] shadow-2xl shadow-inner"
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
