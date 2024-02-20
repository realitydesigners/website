"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac } from "@/fonts";
import Link from "next/link";
import React from "react";

const PostsCardLight = ({ slug, heading, image }) => {
	return (
		<div className="flex w-full  items-center justify-center py-4 px-4">
			<div className=" bg-gradient-to-r from-blue-200/10 to-blue-200/5  w-full rounded-lg md:w-1/3 group flex h-auto flex-row p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl lg:w-1/3">
				{image && (
					<div className="relative w-1/3">
						<SanityImage
							image={image}
							width={250}
							height={250}
							priority={true}
							alt={`Cover Image for ${heading}`}
							classesWrapper="h-full w-full transform rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</div>
				)}

				<div className="relative flex w-3/4 flex-col pl-4">
					<p
						className={`${monomaniac.className}  pt-2 mb-2 text-xs uppercase leading-none tracking-wide bg-gradient-to-r from-blue-100/50 to-blue-100/50 text-transparent bg-clip-text `}
					>
						Related Post
					</p>

					<Link
						className="duration-3 font-bold leading-[1.2em] text-2xl  bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text transition-colors group-hover:text-gray-100 group-hover:underline"
						href={`/posts/${slug}`}
					>
						{heading}
					</Link>
				</div>
			</div>
		</div>
	);
};

const PostsRefBlock = ({ slug, heading, image }) => {
	if (!slug || !heading || !image) return null;

	return <PostsCardLight slug={slug} heading={heading} image={image} />;
};

export default React.memo(PostsRefBlock);
