import {
  apiVersion,
  dataset,
  hookSecret,
  projectId,
  token,
} from "@/sanity/lib/api";

import {
  type ClientConfig,
  type QueryParams,
  createClient,
} from "@sanity/client";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: hookSecret ? false : true,
  token,
};

export const client = createClient(config);

// Create a client with write permissions
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    next: { revalidate: 60, tags },
  });
}
