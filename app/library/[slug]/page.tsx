import SlugPage from "@/app/library/[slug]/SlugPage";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { categoryBySlugQuery } from "@/sanity/lib/queries";
import { CategoryPayload } from "@/types";
import { sanityFetch } from "@/sanity/lib/client";

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("category");
}

export default async function CategoryPage({ params }: Props) {
	const category = await sanityFetch<CategoryPayload>({
		query: categoryBySlugQuery,
		qParams: { slug: params.slug },
		tags: [`category:${params.slug}`],
	});

	return (
		<div className="w-screen h-screen bg-gray-200">
			<SlugPage category={category} />
		</div>
	);
}
