"use client";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader/rsc";
import type { PostsPayload } from "@/types";
import PortableTextComponent from "@/components/portabletext/PortableTextComponent";
import HeadingBlockLight from "@/components/blog/HeadingBlockLight";
import HeadingBlockDark from "@/components/blog/HeadingBlockDark";
import TeamBlock from "@/components/blog/TeamBlock";

export interface PageProps {
	data: PostsPayload | null;
	encodeDataAttribute?: EncodeDataAttributeCallback;
}

const Page: React.FC<PageProps> = ({ data }) => {
	const renderHeadingBlock = (block, key) => {
		return block.layout === "dark" ? (
			<HeadingBlockDark key={key} block={block} />
		) : (
			<HeadingBlockLight key={key} block={block} />
		);
	};

	const renderContentBlock = (content, key) => {
		if (!content.content) return null;
		return content.layout === "dark" ? (
			<div className="w-full h-auto bg-black lg:pt-24" key={key}>
				<PortableTextComponent content={content.content} template="dark" />
			</div>
		) : content.layout === "light" ? (
			<div className="w-full h-auto bg-gray-200 lg:pt-24" key={key}>
				<PortableTextComponent content={content.content} template="light" />
			</div>
		) : null;
	};

	const renderTeamBlock = (block, key) =>
		block._type === "teamBlock" && <TeamBlock key={key} block={block} />;

	return (
		<main>
			{data?.block?.map((block, index) => {
				const key = index; // Prefer unique identifier, fallback to index
				switch (block._type) {
					case "headingBlock":
						return renderHeadingBlock(block, key);
					case "contentBlock":
						return renderContentBlock(block, key);
					case "teamBlock":
						return renderTeamBlock(block, key);
					default:
						return null;
				}
			})}
		</main>
	);
};

export default Page;
