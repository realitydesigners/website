import {
	ContentBlock,
	HeadingBlock,
	HeadingSplineBlock,
	ImageCanvasBlock,
	TeamBlock,
} from "@/components/blocks/index";
import { BlockProps, BlockType } from "@/components/blocks/types";
import React from "react";

const blockTypeComponents: Record<BlockType, React.ElementType> = {
	headingBlock: HeadingBlock,
	headingSplineBlock: HeadingSplineBlock,
	contentBlock: ContentBlock,
	teamBlock: TeamBlock,
	imageCanvasBlock: ImageCanvasBlock,
};

const Blocks: React.FC<{ block: BlockProps }> = ({ block }) => {
	const BlockComponent = blockTypeComponents[block._type];
	if (!BlockComponent) return null;

	const BlockProps = {
		...block,
		block: { ...block, layout: block.layout, className: block.layout },
	};

	// ...props,
	// layout: props.layout,
	// content: props.content || [],

	return (
		<div className="relative w-full">
			<BlockComponent {...BlockProps} />
		</div>
	);
};

export default Blocks;
