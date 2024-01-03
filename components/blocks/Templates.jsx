import InternalLink from "@/components/blocks/InternalLink";
import { cairo, staatliches } from "@/fonts";
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

const withWrapper = (template, wrapperClass) => {
	return Object.keys(template).reduce((wrappedTemplate, key) => {
		wrappedTemplate[key] = ({ children, ...rest }) => (
			<div className={wrapperClass}>
				{React.createElement(template[key], { children, ...rest })}
			</div>
		);
		return wrappedTemplate;
	}, {});
};

export const DarkTemplate = {
	block: {
		normal: ({ children }) => (
			<div className="w-full flex justify-center ">
				<div
					className={`${cairo.className} w-11/12 text-gray-300 leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl my-3 `}
				>
					{children}
				</div>
			</div>
		),
		h1: ({ children }) => (
			<div className="w-full flex justify-center ">
				<h1
					className={`${staatliches.className} my-3 w-10/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}
				>
					{children}
				</h1>
			</div>
		),

		h2: ({ children }) => (
			<div className="w-full  flex justify-center ">
				<h2
					className={`${staatliches.className} my-3 w-11/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}
				>
					{children}
				</h2>
			</div>
		),
		h3: ({ children }) => (
			<div className="w-full flex justify-center">
				<h2
					className={`${staatliches.className} my-5  w-11/12 text-4xl text-gray-200  font-bold  leading-none tracking-wide md:w-3/4   lg:w-1/2 lg:text-5xl`}
				>
					{children}
				</h2>
			</div>
		),
	},
	list: {
		bullet: ({ children }) => (
			<div className="w-screen flex justify-center">
				<ul
					className={`${cairo.className} w-11/12  text-black leading-7  text-lg md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`}
				>
					{children}
				</ul>
			</div>
		),
		number: ({ children }) => (
			<div className="w-screen flex justify-center">
				<ol
					className={`${cairo.className} w-11/12 text-black leading-7 text-2xl md:w-3/4 lg:w-1/2 lg:text-2xl list-decimal list-inside space-y-6 mb-6`}
				>
					{children}
				</ol>
			</div>
		),
	},

	marks: {
		internalLink: ({ value, children }) => {
			const { slug = {} } = value;
			return <InternalLink slug={slug?.current}>{children}</InternalLink>;
		},
	},
	types: {
		iframe: iFrame,
		postsRef: PostsRefBlock,
		articleRef: ArticleRefBlock,
		videoRef: VideoRefBlock,
		spline: SplineRefBlock,
		imageRef: ImageRefBlock,
		audioRef: AudioRefBlock,
		quoteRef: QuoteRefBlock,
	},
};

export const LightTemplate = {
	block: {
		normal: ({ children }) => (
			<div className="w-full flex justify-center">
				<div
					className={`${cairo.className} w-11/12  text-black leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl my-3`}
				>
					{children}
				</div>
			</div>
		),
		h1: ({ children }) => (
			<div className="w-screen flex justify-center">
				<h1
					className={`${staatliches.className} my-3 w-10/12 text-black text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}
				>
					{children}
				</h1>
			</div>
		),

		h2: ({ children }) => (
			<div className="w-screen flex justify-center">
				<h2
					className={`${staatliches.className} my-3 w-11/12 text-black text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}
				>
					{children}
				</h2>
			</div>
		),
		h3: ({ children }) => (
			<div className="w-screen flex justify-center">
				<h2
					className={`${staatliches.className} my-5  w-11/12 text-4xl font-bold  leading-none tracking-wide md:w-3/4   lg:w-1/2 lg:text-5xl`}
				>
					{children}
				</h2>
			</div>
		),
	},
	list: {
		bullet: ({ children }) => (
			<div className="w-screen flex justify-center">
				<ul
					className={`${cairo.className} w-11/12  text-black leading-7 text-lg md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`}
				>
					{children}
				</ul>
			</div>
		),
		number: ({ children }) => (
			<div className="w-screen flex justify-center">
				<ol
					className={`${cairo.className} w-11/12 text-black leading-7 text-2xl md:w-3/4 lg:w-1/2 lg:text-2xl list-decimal list-inside space-y-6 mb-6`}
				>
					{children}
				</ol>
			</div>
		),
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
		iframe: iFrame,
		postsRef: PostsRefBlock,
		articleRef: ArticleRefBlock,
		videoRef: VideoRefBlock,
		spline: SplineRefBlock,
		imageRef: ImageRefBlock,
		audioRef: AudioRefBlock,
		quoteRef: QuoteRefBlock,
	},
};

export const VideoTemplate = {
	block: {
		normal: ({ children }) => (
			<div className="w-full flex justify-center ">
				<p
					className={`${cairo.className} w-11/12 font-bold text-gray-400 leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-6 `}
				>
					{children}
				</p>
			</div>
		),
		h1: ({ children }) => (
			<div className="w-screen flex justify-center">
				<h1
					className={`${staatliches.className} mb-6 w-10/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}
				>
					{children}
				</h1>
			</div>
		),

		h2: ({ children }) => (
			<div className="w-screen flex justify-center">
				<h2
					className={`${staatliches.className} mb-6 w-11/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}
				>
					{children}
				</h2>
			</div>
		),
		h3: ({ children }) => (
			<div className="w-screen flex justify-center">
				<h2
					className={`${staatliches.className} mb-6  w-11/12 text-4xl text-gray-200  font-bold  leading-none tracking-wide md:w-3/4   lg:w-1/2 lg:text-5xl`}
				>
					{children}
				</h2>
			</div>
		),
	},

	marks: {
		internalLink: ({ value, children }) => {
			const { slug = {} } = value;
			const href = `/blog/${slug?.current}`;

			return (
				<Link className="font-extrabold text-black underline " href={href}>
					{children}
				</Link>
			);
		},
	},
};

export const TeamTemplate = {
	block: {
		normal: ({ children }) => (
			<div className="w-full flex justify-center ">
				<div
					className={`${cairo.className} w-11/12 font-bold text-gray-200 leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-6 `}
				>
					{children}
				</div>
			</div>
		),
		h1: ({ children }) => (
			<div className="w-screen flex justify-center">
				<h1
					className={`${staatliches.className} mb-6 w-10/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}
				>
					{children}
				</h1>
			</div>
		),

		h2: ({ children }) => (
			<div className="w-screen flex justify-center">
				<h2
					className={`${staatliches.className} mb-6 w-11/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}
				>
					{children}
				</h2>
			</div>
		),
		h3: ({ children }) => (
			<div className="w-screen flex justify-center">
				<h2
					className={`${staatliches.className} mb-6  w-11/12 text-4xl text-gray-200  font-bold  leading-none tracking-wide md:w-3/4   lg:w-1/2 lg:text-5xl`}
				>
					{children}
				</h2>
			</div>
		),
	},

	list: {
		bullet: ({ children }) => (
			<div className="w-screen flex justify-center">
				<ul
					className={`${cairo.className} w-11/12  text-black leading-7  text-lg md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`}
				>
					{children}
				</ul>
			</div>
		),
		number: ({ children }) => (
			<div className="w-screen flex justify-center">
				<ol
					className={`${cairo.className} w-11/12 text-black leading-7 text-2xl md:w-3/4 lg:w-1/2 lg:text-2xl list-decimal list-inside space-y-6 mb-6`}
				>
					{children}
				</ol>
			</div>
		),
	},
	marks: {
		internalLink: ({ value, children }) => {
			const { slug = {} } = value;
			return <InternalLink slug={slug?.current}>{children}</InternalLink>;
		},
	},
};
