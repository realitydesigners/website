import "server-only";

import { groq } from "next-sanity";

import { createClient } from "@sanity/client/stega";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { token } from "@/sanity/lib/token";

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: process.env.NODE_ENV === "development" ? true : false,
	perspective: "published",
	stega: {
		studioUrl,
	},
});

// Used in `generateStaticParams`
export function generateStaticSlugs(type: string) {
	// Not using loadQuery as it's optimized for fetching in the RSC lifecycle
	return client
		.withConfig({
			token,
			perspective: "published",
			useCdn: true,
			stega: false,
		})
		.fetch<string[]>(
			groq`*[_type == $type && defined(slug.current)]{"slug": slug.current}`,
			{ type },
		);
}
