"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac, play, space } from "@/fonts";
import { BlockItem, Image, PostsPayload } from "@/types";
import Link from "next/link";
import { FC } from "react";

interface PostItemProps {
	block: BlockItem;
	slug?: {
		current?: string;
	};
	date?: string;
	className?: string;
}

interface PostsListProps {
	post: PostsPayload[];
	slug?: {
		current?: string;
	};
	className?: string;
}

interface MainPostProps {
	post: PostsPayload;
	className?: string;
}

interface PostImageProps {
	image?: Image;
	heading?: string;
}

interface FormattedDateProps {
	date?: string;
	className?: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date, className }) => {
	const formattedDate = date
		? new Date(date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
		  })
		: "Date not available";

	return <span className={className}>{formattedDate}</span>;
};

const Heading = ({ heading, className }) => {
	const displayHeading = heading || "no title";
	return <h2 className={className}>{displayHeading}</h2>;
};

const SubHeading = ({ heading, className }) => {
	const displayHeading = heading || "no title";
	return <h2 className={className}>{displayHeading}</h2>;
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
				classesWrapper="lg:w-[5em] lg:h-[5em] w-full h-[8em] object-cover object-contain  -[.7em]"
			/>
		</div>
	);
};

export const PostItems: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading } = block;

	return (
		<div className="group w-full lg:flex p-2 lg:flex-row lg:block border-gray-600/50 lg:flex-row-reverse transition duration-300 ease-in-out hover:shadow-lg">
			<div className="overflow-hidden">
				<div className="transform transition duration-300 ease-in-out group-hover:scale-105">
					<PostImage image={image} heading={heading} />
				</div>
			</div>
			<div className="w-full flex items-center lg:pl-1 lg:pr-2">
				<Link href={`/posts/${slug?.current}`}>
					<Heading
						heading={block.heading}
						className={`${space.className} p-2 text- font-bold capitalize leading-[1.3em] cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text`}
					/>
				</Link>
			</div>
		</div>
	);
};

const TopBar: FC<PostsListProps> = ({ post }) => {
	return (
		<div className="w-full h-auto gap-3 lg:gap-4 grid grid-cols-2 lg:grid-cols-4 ">
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
				classesWrapper="w-full h-[250px] lg:h-[175px] object-cover object-contain  "
			/>
		</div>
	);
};

export const PostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, publicationDate } = block;

	return (
		<div className="group h-auto flex flex-col p-1 transition duration-300 ease-in-out hover:shadow-lg">
			<div className="overflow-hidden">
				<div className="transform transition duration-300 ease-in-out group-hover:scale-105">
					<SideBarPostImage image={image} heading={heading} />
				</div>
			</div>
			<FormattedDate
				date={publicationDate}
				className={`${monomaniac.className} w-full p-1 pt-2 h-auto text-xs font-bold bg-gradient-to-r from-blue-100/50 to-blue-100/50 text-transparent bg-clip-text uppercase tracking-widest`}
			/>
			<Link href={`/posts/${slug?.current}`}>
				<Heading
					heading={block.heading}
					className={`${space.className} p-1 text-3xl font-bold capitalize leading-[1.2em] cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text`}
				/>
			</Link>
			<SubHeading
				heading={block.subheading}
				className={`${space.className} p-1 text-md leading-tight bg-gradient-to-r from-blue-100/50 to-blue-100/50 text-transparent bg-clip-text `}
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
				classesWrapper="w-full h-[350px]  lg:h-[33vw] object-cover object-contain  -[.7em]"
			/>
		</div>
	);
};

export const MainPostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, publicationDate } = block;

	return (
		<div className="group h-auto flex flex-col border-gray-600/50 p-1 transition duration-300 ease-in-out">
			<div className="overflow-hidden ">
				<div className="transform transition duration-300 ease-in-out group-hover:scale-105">
					<MainPostImage image={image} heading={heading} />
				</div>
			</div>
			<FormattedDate
				date={publicationDate}
				className={`${monomaniac.className} w-full p-1 pt-3 h-auto text-xs font-bold bg-gradient-to-r from-blue-100/50 to-blue-100/50 text-transparent bg-clip-text uppercase tracking-widest`}
			/>
			<Link href={`/posts/${slug?.current}`}>
				<Heading
					heading={block.heading}
					className={`${space.className} p-1 text-5xl lg:text-6xl font-bold uppercase leading-none cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text`}
				/>
			</Link>
			<SubHeading
				heading={block.subheading}
				className={`${space.className} p-1 text-xl leading-tight  bg-gradient-to-r from-blue-100/50 to-blue-100/50 text-transparent bg-clip-text `}
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
				classesWrapper="h-[6em] w-[5em]  object-cover object-contain  -[.7em]"
			/>
		</div>
	);
};

export const RightBarPostItem: FC<PostItemProps> = ({ block, slug }) => {
	const { image, heading, publicationDate } = block;

	return (
		<div className="group h-auto w-full flex flex-row p-1 transition duration-300 ease-in-out hover:shadow-lg">
			<div className="overflow-hidden">
				<div className="transform transition duration-300 ease-in-out group-hover:scale-105">
					<RightBarPostImage image={image} heading={heading} />
				</div>
			</div>
			<div className="pl-1 pr-2 w-full flex flex-col">
				<FormattedDate
					date={publicationDate}
					className={`${monomaniac.className} w-full p-1 pt-3 h-auto text-xs font-bold bg-gradient-to-r from-blue-100/50 to-blue-100/50 text-transparent bg-clip-text uppercase tracking-widest`}
				/>
				<Link href={`/posts/${slug?.current}`}>
					<Heading
						heading={block.heading}
						className={`${space.className} pl-2 text-lg   leading-[1.2em] font-bold capitalize leading-none cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text`}
					/>
				</Link>
			</div>
		</div>
	);
};

const RightSideBar: FC<PostsListProps> = ({ post }) => {
	return (
		<div className="lg:w-1/4 w-full gap-4 mb-4 lg:mb-0 flex flex-col">
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
		<div className="w-full pt-[80px] h-auto flex flex-cols p-2 lg:px-16 flex-wrap">
			<SideBar post={sidePostData} className="order-2 lg:order-2" />
			<MainPost post={mainPostData} className="order-1 lg:order-1" />
			<RightSideBar post={rightPostData} className="order-3 lg:order-3 " />
			<TopBar post={topPostData} className="order-4 lg:order-4" />
		</div>
	);
};

export default SectionPosts;
