import { getCategoryPositions } from "@/components/library/Postions";
import Scene from "@/components/library/Scene";
import { InteractiveProvider } from "@/components/library/context/InteractiveContext";
import Navigation from "@/components/library/stations/Navigation"; // Import Navigation component
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { categoryBySlugQuery } from "@/sanity/lib/queries";
import { CategoryPayload } from "@/types";
type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("category");
}

export default async function CategoryPage({ params }: Props) {
	const category = await sanityFetch<CategoryPayload>({
		query: categoryBySlugQuery,
		tags: ["category"],
		qParams: { slug: params.slug },
	});
	const categoryPositions = getCategoryPositions(1); // Adjust the argument here

	return (
		<InteractiveProvider categoryPositions={categoryPositions}>
			<div className="w-screen h-screen relative">
				<Navigation
					categories={[category]}
					categoryPositions={categoryPositions}
				/>
				<Scene category={category} />
			</div>
		</InteractiveProvider>
	);
}
