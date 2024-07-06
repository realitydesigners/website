import {
	ContentBlock,
	HeadingBlock,
	HeadingSplineBlock,
	TeamBlock,
} from "@/components/blocks/index";
import { BlockProps, BlockType } from "@/components/blocks/types";
import React from "react";

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
