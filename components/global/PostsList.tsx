import Link from "next/link";
import { FC } from "react";
import { jura, staatliches } from "@/fonts";
import { PostsPayload } from "@/types";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

interface PostItemProps {
	post: PostsPayload;
}

interface PostsListProps {
	post: PostsPayload[];
}

interface ImageBoxProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	image?: { asset?: any };
	alt?: string;
	width?: number;
	height?: number;
	classesWrapper?: string;
	"data-sanity"?: string;
}

function SmallImage({
	image,
	alt = "Cover image",
	width = 600,
	height = 600,
	classesWrapper,
	...props
}: ImageBoxProps) {
	const imageUrl =
		image && urlForImage(image)?.height(height).width(width).fit("crop").url();

	return (
		<div
			className={`w-full h-[50vw] lg:h-[20vw] overflow-hidden ${classesWrapper}`}
			data-sanity={props["data-sanity"]}
		>
			{imageUrl && (
				<Image
					priority={true}
					className="object-cover cover h-full w-full"
					alt={alt}
					width={width}
					height={height}
					src={imageUrl}
				/>
			)}
		</div>
	);
}

export const PostItem: FC<PostItemProps> = ({ post }) => {
	let publicationDate = post.publicationDate;

	if (!publicationDate && post.block) {
		const blockWithDate = post.block.find(
			(blockItem) => blockItem.publicationDate,
		);
		if (blockWithDate) {
			publicationDate = blockWithDate.publicationDate;
		}
	}

	const formattedDate = publicationDate
		? new Date(publicationDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
		  })
		: "Date not available";

	const { title, image, slug, excerpt } = post;

	return (
		<article className=" h-auto border border-gray-300 p-2 rounded-[1em]">
			{image && (
				<div className="relative">
					<SmallImage
						image={image}
						alt={`Cover Image for ${title}`}
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
						{title}
					</h2>
				</Link>
				<p
					className={`${jura.className} p-2 text-md font-bold leading-tight text-black`}
				>
					{excerpt}
				</p>
			</div>
		</article>
	);
};

export const PostsList: FC<PostsListProps> = ({ post }) => {
	if (!post) {
		return null;
	}

	return (
		<div className="grid grid-cols-1 gap-4 p-4 pt-20 md:grid-cols-2 lg:grid-cols-3 ">
			{post.map((post) => (
				<PostItem key={post.slug?.current} post={post} />
			))}
		</div>
	);
};

export default PostsList;
