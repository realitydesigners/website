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

const Page: React.FC<PageProps> = ({ data, encodeDataAttribute }) => {
	//console.log(data);

	const { block } = data ?? {};

	return (
		<main>
			{/* HEADING BLOCK */}
			{block?.map((block, index) => {
				if (block._type === "headingBlock") {
					return block.layout === "dark" ? (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<HeadingBlockDark key={index} block={block} />
					) : (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<HeadingBlockLight key={index} block={block} />
					);
				}
				return null;
			})}

			{/* CONTENT BLOCK */}
			{data?.block?.map(
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(contentBlock: any, index: number) =>
					contentBlock?.content &&
					(contentBlock.layout === "dark" ? (
						<div className="w-full h-auto bg-black lg:pt-24">
							<PortableTextComponent
								content={contentBlock.content}
								template="dark"
							/>
						</div>
					) : contentBlock.layout === "light" ? (
						<div className="w-full h-auto bg-gray-200  lg:pt-24">
							<PortableTextComponent
								content={contentBlock.content}
								template="light"
							/>
						</div>
					) : null),
			)}
			{/* CONTENT BLOCK */}
			{data?.block?.map((block, index) => (
				<div>
					{block._type === "teamBlock" && (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<TeamBlock key={index} block={block} />
					)}
				</div>
			))}
		</main>
	);
};

export default Page;
