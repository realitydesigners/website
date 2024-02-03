import LibraryScene from "@/components/library/LibraryScene";
import AllStations from "@/components/library/stations/AllStations";
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
			<AllStations />
		</div>
	);
}
