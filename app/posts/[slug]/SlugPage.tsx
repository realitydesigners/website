import Blocks from "@/components/blocks/Blocks";
import type { PostsPayload } from "@/types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader/rsc";
import React from "react";

export interface PageProps {
	data: PostsPayload | null;
	encodeDataAttribute?: EncodeDataAttributeCallback;
}

const SlugPage: React.FC<PageProps> = ({ data }) => {
	console.log(data);
	return (
		<main>
			{data?.block?.map((block, index) => (
				<Blocks key={`${block._type}-${index}`} block={block} />
			))}
		</main>
	);
};

export default SlugPage;
