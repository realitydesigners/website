'use client';

import { type QueryResponseInitial } from '@sanity/react-loader/rsc';

import { postsBySlugQuery } from '@/sanity/lib/queries';
import { useQuery } from '@/sanity/loader/useQuery';
import { PostsPayload } from '@/types';

import PostSlugPage from './SlugPage';

type Props = {
   params: { slug: string };
   initial: QueryResponseInitial<PostsPayload | null>;
};

export default function ProjectPreview(props: Props) {
   const { params, initial } = props;
   const { data, encodeDataAttribute } = useQuery<PostsPayload | null>(postsBySlugQuery, params, { initial });

   return <PostSlugPage data={data!} encodeDataAttribute={encodeDataAttribute} />;
}
