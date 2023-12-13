import { loadTeamSlugPage } from "@/sanity/loader/loadQuery";
import SlugPage from "./SlugPage";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("team");
}

export default async function PageSlugRoute({ params }: Props) {
	const response = await loadTeamSlugPage(params.slug);
	const team = response.data;

	return <SlugPage data={team} />;
}
