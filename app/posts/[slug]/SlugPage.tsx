"use client";
import React from "react";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader/rsc";
import type { PostsPayload } from "@/types";
import Blocks from "@/components/blocks/Blocks";

export interface PageProps {
	data: PostsPayload | null;
	encodeDataAttribute?: EncodeDataAttributeCallback;
}

const SlugPage: React.FC<PageProps> = ({ data }) => {
	return (
		<main>
			{data?.block?.map((block, index) => (
				<Blocks key={`${block._type}-${index}`} block={block} />
			))}
		</main>
	);
};

export default SlugPage;
