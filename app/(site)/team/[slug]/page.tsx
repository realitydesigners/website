import { loadTeamSlugPage } from '@/sanity/loader/loadQuery';
import SlugPage from './SlugPage';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';

type Props = {
   params: { slug: string };
};

export function generateStaticParams() {
   return generateStaticSlugs('team');
}

export default async function PageSlugRoute({ params }: Props) {
   const team = await loadTeamSlugPage(params.slug);

   return <SlugPage data={team} />;
}
