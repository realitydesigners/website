import SlugPage from "@/app/library/[slug]/SlugPage";
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

	return (
		<div className="w-screen h-screen bg-black">
			<SlugPage category={category} />
		</div>
	);
}
