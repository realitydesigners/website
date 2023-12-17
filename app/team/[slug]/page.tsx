import { loadTeamSlugPage } from "@/sanity/loader/loadQuery";
import SlugPage from "./SlugPage";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { Metadata, ResolvingMetadata } from "next";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("team");
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const metadataBaseUrl =
		process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000";
	const { data: team } = await loadTeamSlugPage(params.slug);
	//@ts-ignore
	const ogImage = urlForOpenGraphImage(team?.image);
	const metadataBase = new URL(metadataBaseUrl);

	return {
		title: team?.name,
		description: team?.shortBio || (await parent).description,
		openGraph: ogImage
			? {
					images: [ogImage, ...((await parent).openGraph?.images || [])],
			  }
			: {},
		metadataBase,
	};
}

export default async function PageSlugRoute({ params }: Props) {
	const response = await loadTeamSlugPage(params.slug);
	const team = response.data;

	return <SlugPage data={team} />;
}
