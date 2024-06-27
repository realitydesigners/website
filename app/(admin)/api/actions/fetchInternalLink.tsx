"use server";

import { sanityFetch } from "@/sanity/lib/client";
import { postsBySlugQuery } from "@/sanity/lib/queries";

export async function getPostData(slug: string) {
	return sanityFetch({ query: postsBySlugQuery, qParams: { slug }, tags: [] });
}
