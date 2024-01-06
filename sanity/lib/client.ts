import {
	apiVersion,
	dataset,
	hookSecret,
	projectId,
	studioUrl,
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
	useCdn: hookSecret ? false : true, // set CDN to live API when webhook secret is undefined
	token,
};

export const client = createClient(config);

export async function sanityFetch<QueryResponse>({
	query,
	qParams,
	tags,
}: {
	query: string;
	qParams?: QueryParams;
	tags: string[];
}): Promise<QueryResponse> {
	return client.fetch<QueryResponse>(query, qParams, {
		cache: hookSecret ? "no-cache" : "default",
		next: { revalidate: 5, tags },
	});
}
