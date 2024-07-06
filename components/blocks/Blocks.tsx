import {
	ContentBlock,
	HeadingBlock,
	HeadingSplineBlock,
	TeamBlock,
} from "@/components/blocks/index";

import React from "react";
import type { PortableTextBlock } from "@portabletext/types";
export type LayoutTheme = "dark" | "light" | "team" | "video" | "transparent";

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
