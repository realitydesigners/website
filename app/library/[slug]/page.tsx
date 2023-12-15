import { loadCategorySlugPage } from "@/sanity/loader/loadQuery";
import SlugPage from "@/app/library/[slug]/SlugPage";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("category");
}

export default async function CategoryPage({ params }: Props) {
	const response = await loadCategorySlugPage(params.slug);
	const category = response.data;

	return (
		<div className="w-screen h-screen bg-gray-200">
			<SlugPage category={category} />
		</div>
	);
}
