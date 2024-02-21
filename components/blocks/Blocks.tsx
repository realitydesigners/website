import {
	ContentBlock,
	HeadingBlock,
	HeadingSplineBlock,
	ImageCanvasBlock,
	TeamBlock,
} from "@/components/blocks/index";
import { BlockProps, BlockType } from "@/components/blocks/types";

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
					<BlockComponent {...block} layout={block.layout} />
				</div>
			) : null}
		</>
	);
};

export default Blocks;
