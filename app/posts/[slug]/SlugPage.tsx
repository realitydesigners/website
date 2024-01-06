import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/types";
import type { PostsPayload } from "@/types";
import React, { useMemo } from "react";

export interface PageProps {
	data: PostsPayload | null;
}

const SlugPage: React.FC<PageProps> = ({ data }) => {
	const blocks = useMemo(() => {
		return data?.block;
	}, [data]);

	if (!data || !data.block) {
		return <div>Loading...</div>;
	}

	return (
		<main>
			{blocks?.map((block) => (
				<Blocks block={block as BlockProps} />
			))}
		</main>
	);
};

export default SlugPage;
