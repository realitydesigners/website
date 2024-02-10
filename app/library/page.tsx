import { getCategoryPositions } from "@/components/library/Postions";
import { InteractiveProvider } from "@/components/library/context/InteractiveContext";
import AllStations from "@/components/library/stations/AllStations";
import Navigation from "@/components/library/stations/Navigation";
import { sanityFetch } from "@/sanity/lib/client";
import { categoryQuery } from "@/sanity/lib/queries";
import { CategoryPayload } from "@/types";

export default async function CategoryPage(): Promise<JSX.Element> {
	const categories: CategoryPayload[] = await sanityFetch({
		query: categoryQuery,
		tags: ["category"],
	});

	const categoryPositions = getCategoryPositions(categories.length);

	console.log(categories);
	return (
		<InteractiveProvider categoryPositions={categoryPositions}>
			<div className="w-screen h-screen relative">
				<Navigation
					categories={categories}
					categoryPositions={categoryPositions}
				/>
				<AllStations categories={categories} />
			</div>
		</InteractiveProvider>
	);
}
