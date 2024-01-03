import SlugPage from "@/app/posts/[slug]/SlugPage";
import { sanityFetch } from "@/sanity/lib/client";
import { postsBySlugQuery, postsQuery } from "@/sanity/lib/queries";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { PostsPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

const PostsList = React.lazy(() => import("@/components/global/PostsList")); // Lazy import

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("posts");
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const metadataBaseUrl =
		process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000";
	const post = await sanityFetch<PostsPayload>({
		query: postsBySlugQuery,
		tags: ["post"],
		qParams: { slug: params.slug },
	});
	//@ts-ignore
	const ogImage = urlForOpenGraphImage(post?.block?.[0]?.image);
	const metadataBase = new URL(metadataBaseUrl);

	return {
		//@ts-ignore
		title: post?.block?.[0]?.heading,
		//@ts-ignore
		description: post?.block?.[0]?.subheading || (await parent).description,
		openGraph: ogImage
			? {
					images: [ogImage, ...((await parent).openGraph?.images || [])],
			  }
			: {},
		metadataBase,
	};
}

export default async function PageSlugRoute({ params }) {
	// Fetch the current post
	const currentPost = await sanityFetch<PostsPayload>({
		query: postsBySlugQuery,
		tags: ["post"],
		qParams: { slug: params.slug },
	});

	let otherPosts;

	// Conditionally fetch other posts only if current post is fetched
	if (currentPost) {
		const allPosts = await sanityFetch<PostsPayload[]>({
			query: postsQuery,
			tags: ["post"],
		});

		otherPosts = allPosts.filter((post) => post.slug?.current !== params.slug);
	}

	return (
		<>
			<SlugPage data={currentPost} />
			{currentPost && otherPosts && (
				<div className="w-full mb-6 flex h-auto flex-cols px-2 lg:px-6">
					<PostsList post={otherPosts} />
				</div>
			)}
		</>
	);
}
