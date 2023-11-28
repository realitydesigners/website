import { loadPostsPage } from '@/sanity/loader/loadQuery';
import SlugPage from '@/app/(site)/posts/[slug]/SlugPage';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';

type Props = {
   params: { slug: string };
};

export function generateStaticParams() {
   return generateStaticSlugs('posts');
}

export default async function PageSlugRoute({ params }: Props) {
   const post = await loadPostsPage(params.slug);

   return <SlugPage data={post} />;
}
