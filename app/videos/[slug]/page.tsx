import SlugPage from "./SlugPage";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { getVideoBySlugQuery } from "@/sanity/lib/queries";
import { VideoPayload } from "@/types";
import { sanityFetch } from "@/sanity/lib/client";

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("video");
}

export default async function PageSlugRoute({ params }: Props) {
	const video = await sanityFetch<VideoPayload>({
		query: getVideoBySlugQuery,
		qParams: { slug: params.slug },
		tags: [`video:${params.slug}`],
	});
	return <SlugPage data={video} />;
}
