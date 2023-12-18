import { createClient } from '@sanity/client/stega';
import { apiVersion, dataset, projectId, revalidateSecret, studioUrl } from '@/sanity/lib/api';
import { token } from '@/sanity/lib/token';
import { type QueryParams } from '@sanity/client';

export const client = createClient({
   projectId,
   token,
   dataset,
   apiVersion,
   useCdn: process.env.NODE_ENV === 'development' ? true : false,
   perspective: 'published',
   stega: {
      studioUrl,
   },
});

export async function sanityFetch<QueryResponse>({ query, qParams, tags }: { query: string; qParams?: QueryParams; tags: string[] }): Promise<QueryResponse> {
   return client.fetch<QueryResponse>(query, qParams, {
      cache: process.env.NODE_ENV === 'development' ? 'no-cache' : 'force-cache',
      next: { tags },
   });
}
