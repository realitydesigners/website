import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { getVideoBySlugQuery } from "@/sanity/lib/queries";
import { VideoPayload } from "@/types";
import SlugPage from "./SlugPage";

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("video");
}

export default async function PageSlugRoute({ params }: Props) {
	const video = await sanityFetch<VideoPayload>({
		query: getVideoBySlugQuery,
		tags: ["video"],
		qParams: { slug: params.slug },
	});
	return <SlugPage data={video} />;
}
