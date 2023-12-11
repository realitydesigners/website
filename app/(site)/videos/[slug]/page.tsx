import { loadVideoSlugPage } from "@/sanity/loader/loadQuery";
import SlugPage from "./SlugPage";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("video");
}

export default async function PageSlugRoute({ params }: Props) {
	const video = await loadVideoSlugPage(params.slug);

	return <SlugPage data={video} />;
}
