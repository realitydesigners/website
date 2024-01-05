"use client";
import { BlockProps, BlockType, LayoutTheme } from "@/components/blocks/types";
import {
	ContentBlock,
	HeadingBlock,
	HeadingSplineBlock,
	ImageCanvasBlock,
	TeamBlock,
} from "@/components/blockstyles/index";
import { PortableTextComponents } from "@portabletext/react";
import {
	DarkTemplate,
	LightTemplate,
	TeamTemplate,
	VideoTemplate,
} from "./Templates";

const templateComponents: Record<LayoutTheme, PortableTextComponents> = {
	dark: DarkTemplate as PortableTextComponents,
	light: LightTemplate as PortableTextComponents,
	team: TeamTemplate as PortableTextComponents,
	video: VideoTemplate as PortableTextComponents,
};

const blockTypeComponents: Record<
	BlockType,
	(props: BlockProps) => JSX.Element | null
> = {
	headingBlock: (props) => (
		<HeadingBlock block={{ ...props, className: props.layout }} />
	),
	headingSplineBlock: (props) => (
		<HeadingSplineBlock block={{ ...props, className: props.layout }} />
	),
	contentBlock: ({ layout, content }) => (
		<ContentBlock
			content={content || []}
			className={layout === "dark" ? "bg-black" : "bg-gray-200"}
			components={templateComponents[layout || "light"]}
		/>
	),
	teamBlock: (props) => <TeamBlock block={props} />,
	imageCanvasBlock: (props) => (
		<ImageCanvasBlock block={{ ...props, className: props.layout }} />
	),
};

const Blocks: React.FC<{ block: BlockProps }> = ({ block }) => {
	const BlockComponent = blockTypeComponents[block._type];
	return <>{BlockComponent ? BlockComponent(block) : null}</>;
};

export default Blocks;
