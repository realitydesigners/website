import { loadPostsPage } from '@/sanity/loader/loadQuery';

import { toPlainText } from '@portabletext/react';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { Page } from '@/components/pages/posts/Page';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs';

type Props = {
   params: { slug: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const { data: page } = await loadPostsPage(params.slug);

   return {
      title: page?.title,
      description: page?.content ? toPlainText(page.content) : (await parent).description,
   };
}

export function generateStaticParams() {
   return generateStaticSlugs('page');
}

export default async function PageSlugRoute({ params }: Props) {
   const initial = await loadPostsPage(params.slug);

   // console.log(initial);

   if (!initial.data) {
      notFound();
   }

   return <Page data={initial.data} />;
}
