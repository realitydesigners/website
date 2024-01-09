import LibraryScene from "@/components/library/LibraryScene";
import { sanityFetch } from "@/sanity/lib/client";
import { categoryQuery } from "@/sanity/lib/queries";
import { CategoryPayload } from "@/types";

export default async function CategoryPage() {
	const categories: CategoryPayload[] = await sanityFetch({
		query: categoryQuery,
		tags: ["category"],
	});

	return (
		<div className="w-screen h-screen bg-black">
			<LibraryScene category={categories} />
		</div>
	);
}
