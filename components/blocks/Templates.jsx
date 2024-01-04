import InternalLink from "@/components/blocks/InternalLink";
import { cairo, monomaniac, staatliches } from "@/fonts";
import React from "react";

import {
	ArticleRefBlock,
	AudioRefBlock,
	ImageRefBlock,
	PostsRefBlock,
	QuoteRefBlock,
	SplineRefBlock,
	VideoRefBlock,
} from "./index";

const iFrame = ({ value }) => {
	const { url, width, height } = value;

	return (
		<div className="iframe-container">
			<iframe
				title="iframe"
				src={url}
				width={width}
				height={height}
				allowFullScreen
			/>
		</div>
	);
};

const Heading = ({ level, children, theme }) => {
	const Tag = `h${level}`;
	let className;

	switch (theme) {
		case "dark":
			className = `${staatliches.className} my-3 w-10/12 text-gray-200 text-4xl font-bold uppercase leading-none tracking-wide md:w-3/4 lg:w-1/2 lg:text-5xl`;
			break;
		case "light":
			className = `${staatliches.className} my-3 w-10/12 text-black text-4xl font-bold uppercase leading-none tracking-wide md:w-3/4 lg:w-1/2 lg:text-5xl`;
			break;
		default:
			return null;
	}

	return (
		<div className="w-screen flex justify-center">
			<Tag className={className}>{children}</Tag>
		</div>
	);
};

const List = ({ type, children, theme }) => {
	const Tag = type === "bullet" ? "ul" : "ol";
	let className;

	switch (theme) {
		case "dark":
			className = `${cairo.className} w-11/12 text-gray-300 leading-7 ${
				type === "bullet" ? "text-lg" : "text-2xl"
			} md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`;
			break;
		case "light":
			className = `${cairo.className} w-11/12 text-black leading-7 ${
				type === "bullet" ? "text-lg" : "text-2xl"
			} md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`;
			break;
		default:
			return null;
	}

	return (
		<div className="w-screen flex justify-center">
			<Tag className={className}>{children}</Tag>
		</div>
	);
};

const NormalText = ({ children, theme }) => {
	let className;

	switch (theme) {
		case "dark":
			className = `${cairo.className} text-gray-300 leading-[1.5em] tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl`;

			break;
		case "light":
			className = `${cairo.className} text-black leading-[1.5em] tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl`;

			break;
		default:
			return null;
	}

	return (
		<div className="w-full p-4  flex justify-center">
			<div className={`${className}`}>{children}</div>
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
					image={videoImage}
					className={className}
				/>
			);
		},
		iframe: iFrame,
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
					image={videoImage}
					className={className}
				/>
			);
		},
		iframe: iFrame,
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
