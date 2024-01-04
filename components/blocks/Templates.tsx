import InternalLink from "@/components/blocks/InternalLink";
import { cairo, monomaniac, staatliches } from "@/fonts";
import React from "react";

import {
	ArticleRefBlock,
	AudioRefBlock,
	IframeBlock,
	ImageRefBlock,
	PostsRefBlock,
	QuoteRefBlock,
	SplineRefBlock,
	VideoRefBlock,
} from "./index";

type Theme = "dark" | "light";

const headingStyles: Record<Theme, string> = {
	dark: `${staatliches.className} my-3 w-10/12 text-gray-200 text-4xl font-bold uppercase leading-none tracking-wide md:w-3/4 lg:w-1/2 lg:text-5xl`,
	light: `${staatliches.className} my-3 w-10/12 text-black text-4xl font-bold uppercase leading-none tracking-wide md:w-3/4 lg:w-1/2 lg:text-5xl`,
};

const listStyles: Record<Theme, string> = {
	dark: `${cairo.className} w-11/12 text-gray-300 leading-7 md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`,
	light: `${cairo.className} w-11/12 text-black leading-7 md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`,
};

const normalTextStyles: Record<Theme, string> = {
	dark: `${cairo.className} text-gray-300 leading-[1.5em] tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl`,
	light: `${cairo.className} text-black leading-[1.5em] tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl`,
};

const Heading = ({
	level,
	children,
	theme = "light",
}: { level: number; children: React.ReactNode; theme: Theme }) => {
	const Tag = `h${level}`;
	const className = headingStyles[theme];

	return (
		<div className="w-screen flex justify-center">
			<Tag className={className}>{children}</Tag>
		</div>
	);
};

const List = ({
	type,
	children,
	theme = "light",
}: { type: "bullet" | "number"; children: React.ReactNode; theme: Theme }) => {
	const Tag = type === "bullet" ? "ul" : "ol";
	const className = listStyles[theme];

	return (
		<div className="w-screen flex justify-center">
			<Tag className={className}>{children}</Tag>
		</div>
	);
};

const NormalText = ({
	children,
	theme = "light",
}: { children: React.ReactNode; theme: Theme }) => {
	const className = normalTextStyles[theme];

	return (
		<div className="w-full p-4 flex justify-center">
			<div className={className}>{children}</div>
		</div>
	);
};

export const DarkTemplate = {
	block: {
		normal: (props) => <NormalText {...props} theme="dark" />,
		h1: (props) => <Heading level={1} {...props} theme="dark" />,
		h2: (props) => <Heading level={2} {...props} theme="dark" />,
		h3: (props) => <Heading level={3} {...props} theme="dark" />,
	},
	list: {
		bullet: (props) => <List type="bullet" {...props} theme="dark" />,
		number: (props) => <List type="number" {...props} theme="dark" />,
	},
	marks: {
		internalLink: ({ value, children }) => {
			const { slug = {}, theme } = value;
			return (
				<InternalLink slug={slug?.current} theme={theme}>
					{children}
				</InternalLink>
			);
		},
	},
	types: {
		postsRef: ({ value }) => {
			const { postsHeading, postsSlug, postsImage } = value.postsRef;
			return (
				<PostsRefBlock
					slug={postsSlug}
					heading={postsHeading}
					image={postsImage}
				/>
			);
		},
		videoRef: ({ value }) => {
			const { videoTitle, videoFileUrl, videoImage, className } =
				value.videoRef;

			return (
				<VideoRefBlock
					videoTitle={videoTitle}
					videoFileUrl={videoFileUrl}
					videoImage={videoImage}
					className={className}
				/>
			);
		},
		iframe: IframeBlock,
		articleRef: ArticleRefBlock,
		spline: SplineRefBlock,
		imageRef: ImageRefBlock,
		audioRef: AudioRefBlock,
		quoteRef: QuoteRefBlock,
	},
};

export const LightTemplate = {
	block: {
		normal: (props) => <NormalText {...props} theme="light" />,
		h1: (props) => <Heading level={1} {...props} theme="light" />,
		h2: (props) => <Heading level={2} {...props} theme="light" />,
		h3: (props) => <Heading level={3} {...props} theme="light" />,
	},
	list: {
		bullet: (props) => <List type="bullet" {...props} theme="light" />,
		number: (props) => <List type="number" {...props} theme="light" />,
	},
	marks: {
		internalLink: ({ value, children }) => {
			const { slug = {}, theme } = value;
			return (
				<InternalLink slug={slug?.current} theme={theme}>
					{children}
				</InternalLink>
			);
		},
	},
	types: {
		postsRef: ({ value }) => {
			const { postsHeading, postsSlug, postsImage } = value.postsRef;
			return (
				<PostsRefBlock
					slug={postsSlug}
					heading={postsHeading}
					image={postsImage}
				/>
			);
		},
		videoRef: ({ value }) => {
			const { videoTitle, videoFileUrl, videoImage, className } =
				value.videoRef;

			return (
				<VideoRefBlock
					videoTitle={videoTitle}
					videoFileUrl={videoFileUrl}
					videoImage={videoImage}
					className={className}
				/>
			);
		},
		iframe: IframeBlock,
		articleRef: ArticleRefBlock,
		spline: SplineRefBlock,
		imageRef: ImageRefBlock,
		audioRef: AudioRefBlock,
		quoteRef: QuoteRefBlock,
	},
};

export const VideoTemplate = {
	block: {
		normal: (props) => <NormalText {...props} theme="light" />,
		h1: (props) => <Heading level={1} {...props} theme="light" />,
		h2: (props) => <Heading level={2} {...props} theme="light" />,
		h3: (props) => <Heading level={3} {...props} theme="light" />,
	},
	list: {
		bullet: (props) => <List type="bullet" {...props} theme="light" />,
		number: (props) => <List type="number" {...props} theme="light" />,
	},
};

export const TeamTemplate = {
	block: {
		normal: (props) => <NormalText {...props} theme="dark" />,
		h1: (props) => <Heading level={1} {...props} theme="dark" />,
		h2: (props) => <Heading level={2} {...props} theme="dark" />,
		h3: (props) => <Heading level={3} {...props} theme="dark" />,
	},
	list: {
		bullet: (props) => <List type="bullet" {...props} theme="dark" />,
		number: (props) => <List type="number" {...props} theme="dark" />,
	},
};
