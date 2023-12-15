import type { EncodeDataAttributeCallback } from "@sanity/react-loader/rsc";
import Scene from "@/components/library/Scene";
import type { CategoryPayload } from "@/types";

export interface PageProps {
	category: CategoryPayload | null;
	encodeDataAttribute?: EncodeDataAttributeCallback;
}

const SlugPage: React.FC<PageProps> = ({ category }) => {
	return (
		<main>
			<Scene category={category} />
		</main>
	);
};

export default SlugPage;
