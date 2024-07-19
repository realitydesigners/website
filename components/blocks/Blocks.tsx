import React from "react";
import type { PortableTextBlock } from "@portabletext/types";
import HeadingBlock from "@/components/blocks/section/HeadingBlock";
import HeadingSplineBlock from "@/components/blocks/section/HeadingSplineBlock";
import TeamBlock from "@/components/blocks/section/TeamBlock";
import ContentBlock from "@/components/blocks/section/ContentBlock";

export type BlockType =
	| "headingBlock"
	| "headingSplineBlock"
	| "contentBlock"
	| "teamBlock";

export interface BlockProps {
	_type: BlockType;
	layout?: LayoutTheme;
	content?: PortableTextBlock[];
	className?: string;
}

export interface ContentBlockProps {
	block: {
		content: PortableTextBlock[];
		className?: string;
		layout?: LayoutTheme;
	};
	layout?: string | undefined;
	theme?: string | undefined;
}

export type LayoutTheme = "dark" | "light" | "team" | "video" | "transparent";

export type TemplateTheme = "dark" | "light" | "transparent";
export interface ThemeProps {
	textColor?: string;
	isInset?: boolean;
	containerBg?: string;
	tagBg?: string;
	tagText?: string;
	backgroundColor?: string;
	topBackgroundColor?: string;
	buttonTextColor?: string;
	buttonBackgroundColor?: string;
	containerBorder?: string;
}

const blockTypeComponents: Record<BlockType, React.ElementType> = {
	headingBlock: HeadingBlock,
	headingSplineBlock: HeadingSplineBlock,
	contentBlock: ContentBlock,
	teamBlock: TeamBlock,
};

const Blocks: React.FC<{ block: BlockProps }> = ({ block }) => {
	const BlockComponent = blockTypeComponents[block._type];
	if (!BlockComponent) return null;

	const BlockProps = {
		...block,
		block: { ...block, layout: block.layout, className: block.layout },
	};

	return (
		<div className="relative w-full">
			<BlockComponent {...BlockProps} />
		</div>
	);
};

export default Blocks;