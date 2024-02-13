"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac, play } from "@/fonts";
import { BlockItem, Image, PostsPayload } from "@/types";
import Link from "next/link";
import { FC } from "react";

interface PostItemProps {
	block: BlockItem;
	slug?: {
		current?: string;
	};
	dateString?: string;
}

interface PostsListProps {
	post: PostsPayload[];
	slug?: {
		current?: string;
	};
}

interface MainPostProps {
	post: PostsPayload;
}

interface PostImageProps {
	image?: Image;
	heading?: string;
}

interface FormattedDateProps {
	dateString?: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ dateString }) => {
	const formattedDate = dateString
		? new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
		  })
		: "Date not available";

	return <span>{formattedDate}</span>;
};

const Heading = ({ heading, headingClassName }) => {
	const displayHeading = heading || "no title";
	return <h2 className={headingClassName}>{displayHeading}</h2>;
};

const SubHeading = ({ heading, headingClassName }) => {
	const displayHeading = heading || "no title";
	return <h2 className={headingClassName}>{displayHeading}</h2>;
};

const PostImage: FC<PostImageProps> = ({ image, heading }) => {
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

export const PostItems: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading } = block;

	return (
		<div className="w-full lg:flex p-2 lg:flex-row lg:block border border-gray-600/50 lg:flex-row-reverse rounded-[.7em]">
			<PostImage image={image} heading={heading} />
			<div className="w-full flex items-center lg:pl-1 lg:pr-2">
				<Link href={`/posts/${slug?.current}`}>
					<Heading
						heading={block.heading}
						headingClassName={`${monomaniac.className} pl-2 text-lg capitalize leading-none text-gray-200 cursor-pointer`}
					/>
				</Link>
			</div>
		</div>
	);
};

const TopBar: FC<PostsListProps> = ({ post }) => {
	return (
		<div className="w-full h-auto gap-3 lg:gap-4 grid grid-cols-2 lg:grid-cols-4 mb-4">
			{post.map((postItem) =>
				postItem.block?.map((block, index) =>
					block.heading && block.image ? (
						<PostItems
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

//Sidebar
const SideBarPostImage: FC<PostImageProps> = ({ image, heading }) => {
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
	const { image, heading, publicationDate } = block;

	return (
		<div className="h-auto border flex flex-col border-gray-600/50 p-2 rounded-[1em]">
			<SideBarPostImage image={image} heading={heading} />
			<span
				className={`${monomaniac.className} w-full p-2 pt-4 h-auto  text-xs text-gray-400  uppercase tracking-widest`}
			>
				<FormattedDate dateString={publicationDate} />
			</span>
			<Link href={`/posts/${slug?.current}`}>
				<Heading
					heading={block.heading}
					headingClassName={`${monomaniac.className} p-2 text-3xl capitalize leading-none text-gray-200 cursor-pointer`}
				/>
			</Link>
			<SubHeading
				heading={block.subheading}
				headingClassName={`${play.className} p-2 text-md leading-tight text-gray-400`}
			/>
		</div>
	);
};

const SideBar: FC<PostsListProps> = ({ post }) => {
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

//Main Post
const MainPostImage: FC<PostImageProps> = ({ image, heading }) => {
	return (
		<div className="relative">
			<SanityImage
				width={1000}
				height={1000}
				priority={true}
				image={image}
				alt={`Cover Image for ${heading}`}
				classesWrapper="w-full h-[350px]  lg:h-[33vw] object-cover object-contain rounded-[.7em]"
			/>
		</div>
	);
};

export const MainPostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, subheading, publicationDate } = block;

	return (
		<div className="h-auto flex flex-col border border-gray-600/50 p-2 rounded-[1em]">
			<MainPostImage image={image} heading={heading} />
			<span
				className={`${monomaniac.className} w-full p-2 pt-4 h-auto  text-xs text-gray-400  uppercase tracking-widest`}
			>
				<FormattedDate dateString={publicationDate} />
			</span>
			<Link href={`/posts/${slug?.current}`}>
				<Heading
					heading={block.heading}
					headingClassName={`${monomaniac.className} p-2 text-5xl lg:text-6xl capitalize leading-none text-gray-200 cursor-pointer`}
				/>
			</Link>
			<SubHeading
				heading={block.subheading}
				headingClassName={`${play.className} p-2 text-xl leading-tight text-gray-400`}
			/>
		</div>
	);
};

export const MainPost: FC<MainPostProps> = ({ post }) => {
	if (!post || !post.block) {
		return <div>No post available</div>;
	}

	return (
		<div className="flex lg:w-1/2 w-full px-0 my-4 lg:my-0 lg:px-4">
			<MainPostItem block={post.block[0]} slug={post.slug} />
		</div>
	);
};

//Sidebar
const RightBarPostImage: FC<PostImageProps> = ({ image, heading }) => {
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

export const RightBarPostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, publicationDate } = block;

	return (
		<div className="h-auto w-full flex flex-row border border-gray-600/50 p-2 rounded-[1em]">
			<RightBarPostImage image={image} heading={heading} />
			<div className="pl-1 pr-2 w-full flex flex-col">
				<span
					className={`${monomaniac.className} w-full p-2  h-auto  text-xs text-gray-400  uppercase tracking-widest`}
				>
					<FormattedDate dateString={publicationDate} />
				</span>
				<Link href={`/posts/${slug?.current}`}>
					<Heading
						heading={block.heading}
						headingClassName={`${monomaniac.className} pl-2 text-xl capitalize leading-none text-gray-200 cursor-pointer`}
					/>
				</Link>
			</div>
		</div>
	);
};

const RightSideBar: FC<PostsListProps> = ({ post }) => {
	return (
		<div className="lg:w-1/4 w-full gap-4 flex flex-col">
			{post.map((postItem) =>
				postItem.block?.map((block, index) =>
					block.heading && block.image ? (
						<RightBarPostItem
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

const SectionPosts = ({
	topPostData,
	sidePostData,
	mainPostData,
	rightPostData,
}) => {
	return (
		<div className="w-full pt-[80px] h-auto flex flex-cols p-4 lg:p-20 flex-wrap">
			<TopBar post={topPostData} />
			<SideBar post={sidePostData} />
			<MainPost post={mainPostData} />
			<RightSideBar post={rightPostData} />
		</div>
	);
};

export default SectionPosts;
