import { loadPostsPage } from "@/sanity/loader/loadQuery";
import SlugPage from "@/app/(site)/posts/[slug]/SlugPage";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import Loading from "./loading";

import { Suspense } from "react";

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("posts");
}

export default async function PageSlugRoute({ params }: Props) {
	const response = await loadPostsPage(params.slug);
	const post = await response.data;

	return (
		<Suspense fallback={<Loading />}>
			<SlugPage data={post} />
		</Suspense>
	);
}
