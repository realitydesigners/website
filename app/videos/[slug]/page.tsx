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
	const response = await loadVideoSlugPage(params.slug);
	const video = response.data;

	return <SlugPage data={video} />;
}
