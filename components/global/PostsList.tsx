import Link from "next/link";
import { FC } from "react";
import { jura, staatliches } from "@/fonts";
import { PostsPayload, BlockItem } from "@/types";
import { PostImage } from "@/components/shared/Images";

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

export const PostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, subheading, publicationDate } = block;

	const formattedDate = publicationDate
		? new Date(publicationDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
		  })
		: "Date not available";

	return (
		<div className=" h-auto border border-gray-300 p-2 rounded-[1em]">
			{image && (
				<div className="relative">
					<PostImage
						image={image}
						alt={`Cover Image for ${heading}`}
						classesWrapper="w-full h-[50vw] md:h-[33vw] lg:h-[20vw] object-cover object-contain rounded-[.7em]"
					/>
				</div>
			)}
			<span
				className={`${staatliches.className} w-10/12 p-2 text-xs text-black uppercase tracking-widest`}
			>
				{formattedDate}
			</span>
			<div>
				<Link href={`/posts/${slug?.current}`}>
					<h2
						className={`${staatliches.className} p-2 text-4xl uppercase leading-none text-black cursor-pointer`}
					>
						{heading || "no title"}
					</h2>
				</Link>
				<p
					className={`${jura.className} p-2 text-md font-bold leading-tight text-black`}
				>
					{subheading || "no subheading"}
				</p>
			</div>
		</div>
	);
};

export const PostsList: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return <div>No posts available</div>;
	}

	return (
		<div className="grid grid-cols-1 gap-4 p-4 pt-20 md:grid-cols-2 lg:grid-cols-3">
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

export default PostsList;
