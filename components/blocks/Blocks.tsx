"use client";
import {
	ContentBlock,
	HeadingBlock,
	HeadingSplineBlock,
	ImageCanvasBlock,
	TeamBlock,
} from "@/components/blocks/sectionBlocks/index";
import { BlockProps, BlockType } from "@/components/blocks/types";
import Spline from "@splinetool/react-spline";
import { Suspense } from "react";

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
	contentBlock: (props) => (
		<ContentBlock
			block={{
				...props,
				layout: props.layout,
				content: props.content || [],
			}}
		/>
	),
	teamBlock: (props) => <TeamBlock block={props} />,
	imageCanvasBlock: (props) => (
		<ImageCanvasBlock block={{ ...props, className: props.layout }} />
	),
};
const Blocks: React.FC<{ block: BlockProps }> = ({ block }) => {
	const BlockComponent = blockTypeComponents[block._type];
	return (
		<>
			{BlockComponent ? (
				<div className="w-full relative ">
					{/* <Suspense>
						<Spline
							scene="https://prod.spline.design/3aeg01UBBMLQTJxZ/scene.splinecode"
							className="fixed  w-full h-screen z-[-10]"
						/>
					</Suspense> */}
					<BlockComponent {...block} layout={block.layout} />
				</div>
			) : null}
		</>
	);
};

export default Blocks;
