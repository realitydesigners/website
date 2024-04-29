import { InteractiveProvider } from "@/components/context/InteractiveContext";
import { getCategoryPositions } from "@/components/context/Postions";
import AllStations from "@/components/library/AllStations";
import Navigation from "@/components/navigation/Navigation";
import { sanityFetch } from "@/sanity/lib/client";
import { categoryQuery } from "@/sanity/lib/queries";
import { CategoryPayload } from "@/types";

export default async function CategoryPage(): Promise<JSX.Element> {
	const categories: CategoryPayload[] = await sanityFetch({
		query: categoryQuery,
		tags: ["category"],
	});

	const mainCategoriess = categories;
	const mainCategories = categories.filter((category) => category.isMain);
	const categoryPositions = getCategoryPositions(mainCategories.length);

	return (
		<InteractiveProvider categoryPositions={categoryPositions}>
			<div className="relative h-screen w-screen">
				<Navigation
					categories={mainCategories}
					categoryPositions={categoryPositions}
				/>
				<AllStations categories={mainCategories} />
			</div>
		</InteractiveProvider>
	);
}
