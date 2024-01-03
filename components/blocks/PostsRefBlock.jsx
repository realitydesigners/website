"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac, staatliches } from "@/fonts";
import Link from "next/link";

const PostsCardLight = ({ slug, heading, image }) => {
	return (
		<div className="flex w-full  items-center justify-center p-4 mb-2 lg:p-16">
			<div className=" bg-gray-300 w-full rounded-lg md:w-1/2 group flex h-auto flex-row p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl lg:w-3/5">
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
						className={`${monomaniac.className}  pt-2 mb-2 font-rajdhani text-xs uppercase leading-none tracking-wide text-black`}
					>
						Related Post
					</p>

					<Link
						className={`${monomaniac.className} duration-3 font-rajdhani leading-none text-2xl md:text-3xl tracking-wide text-black transition-colors group-hover:text-gray-800 group-hover:underline`}
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

export default PostsRefBlock;
