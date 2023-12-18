import LibraryScene from "@/components/library/LibraryScene";
import { categoryQuery } from "@/sanity/lib/queries";
import { CategoryPayload } from "@/types";
import { sanityFetch } from "@/sanity/lib/client";

export default async function CategoryPage() {
	const categories: CategoryPayload[] = await sanityFetch({
		query: categoryQuery,
		tags: ["category"],
	});

	return (
		<div className="w-screen h-screen bg-gray-200">
			<LibraryScene category={categories} />
		</div>
	);
}
