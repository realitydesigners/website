import {
	AudioRefBlock,
	IframeBlock,
	ImageRefBlock,
	InternalLink,
	PostsRefBlock,
	QuoteRefBlock,
	SplineRefBlock,
	VideoRefBlock,
} from "@/components/blocks/index";
import { TemplateTheme } from "@/components/blocks/types";
import { space } from "@/fonts";
import React from "react";

const headingStyles: Record<TemplateTheme, string> = {
	dark: `${space.className} my-3  w-full  bg-gradient-to-r from-blue-100/90 to-blue-100/80 text-transparent bg-clip-text text-3xl font-bold uppercase leading-none tracking-wide md:w-3/4 lg:w-1/2 lg:text-5xl`,
	light: `${space.className} my-3 w-11/12 text-black text-4xl font-bold uppercase leading-none tracking-wide md:w-3/4 lg:w-1/2 lg:text-5xl`,
	transparent: `${space.className} my-3 w-11/12 text-gray-200 text-4xl font-bold uppercase leading-none tracking-wide md:w-3/4 lg:w-1/2 lg:text-5xl`,
};

const listStyles: Record<TemplateTheme, string> = {
	dark: `${space.className} w-full bg-gradient-to-r from-blue-100/75 to-blue-100/60 text-transparent bg-clip-text leading-7 md:w-3/4 lg:w-1/2 text-xl list-decimal list-inside space-y-6 mb-6`,
	light: `${space.className} w-11/12 text-black leading-7 md:w-3/4 text-xl lg:w-1/2  list-decimal list-inside space-y-6 mb-6`,
	transparent: `${space.className} w-11/12 text-gray-400 leading-7 md:w-3/4 text-xl lg:w-1/2  list-decimal list-inside space-y-6 mb-6`,
};

const normalTextStyles: Record<TemplateTheme, string> = {
	dark: `${space.className} w-full  bg-gradient-to-r from-blue-100/80 to-blue-100/70 text-transparent bg-clip-text leading-[1.4em] tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl`,
	light: `${space.className} text-black leading-[1.5em] tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl`,
	transparent: `${space.className} text-gray-400 leading-[1.5em] tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl`,
};

const Heading: React.FC<{
	level: number;
	children: React.ReactNode;
	theme: TemplateTheme;
}> = React.memo(({ level, children, theme }) => {
	const className = headingStyles[theme];
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;
	return (
		<div className="w-full p-3 flex justify-center">
			{React.createElement(Tag, { className }, children)}
		</div>
	);
});

const List: React.FC<{
	type: "bullet" | "number";
	children: React.ReactNode;
	theme: TemplateTheme;
}> = React.memo(({ type, children, theme }) => {
	const Tag = type === "bullet" ? "ul" : "ol";
	const className = listStyles[theme];
	return (
		<div className="w-screen flex justify-center">
			<Tag className={className}>{children}</Tag>
		</div>
	);
});

const NormalText: React.FC<{
	children: React.ReactNode;
	theme: TemplateTheme;
}> = React.memo(({ children, theme }) => {
	const className = normalTextStyles[theme];
	return (
		<div className="w-full p-3 flex justify-center">
			<div className={className}>{children}</div>
		</div>
	);
});

const DarkTemplate = {
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
		spline: SplineRefBlock,
		imageRef: ({ value }) => {
			const { image, className } = value;
			return <ImageRefBlock image={image} className={className} />;
		},
		audioRef: AudioRefBlock,
		quoteRef: QuoteRefBlock,
	},
};

const LightTemplate = {
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
		spline: SplineRefBlock,
		imageRef: ({ value }) => {
			const { image, className } = value;
			return <ImageRefBlock image={image} className={className} />;
		},
		audioRef: AudioRefBlock,
		quoteRef: QuoteRefBlock,
	},
};
const TransparentTemplate = {
	block: {
		normal: (props) => <NormalText {...props} theme="transparent" />,
		h1: (props) => <Heading level={1} {...props} theme="transparent" />,
		h2: (props) => <Heading level={2} {...props} theme="transparent" />,
		h3: (props) => <Heading level={3} {...props} theme="transparent" />,
	},
	list: {
		bullet: (props) => <List type="bullet" {...props} theme="transparent" />,
		number: (props) => <List type="number" {...props} theme="transparent" />,
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
		spline: SplineRefBlock,
		imageRef: ({ value }) => {
			const { image, className } = value;

			return <ImageRefBlock image={image} className={className} />;
		},

		audioRef: AudioRefBlock,
		quoteRef: QuoteRefBlock,
	},
};

const VideoTemplate = {
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

const TeamTemplate = {
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

export {
	DarkTemplate,
	LightTemplate,
	TransparentTemplate,
	TeamTemplate,
	VideoTemplate,
};
