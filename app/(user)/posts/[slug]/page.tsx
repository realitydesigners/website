import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/types";
import PostsList from "@/components/items/PostsList";
import { monomaniac } from "@/fonts";
import { postsBySlugQuery, postsQuery } from "@/sanity/lib//queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { PostsPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import React, { Suspense, useMemo } from "react";

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
	const ogImageUrl =
		post?.block?.[0]?.imageRef?.imageUrl ||
		(Array.isArray(post?.block?.[0]?.imageRef) &&
			(post?.block?.[0]?.imageRef[0]?.imageUrl ||
				post?.block?.[0]?.imageRef[0]?.image)) ||
		post?.block?.[0]?.imageRef?.image;

	const ogImageAlt =
		post?.block?.[0]?.imageRef?.imageAlt || "Your default alt text";

	const metadataBase = new URL(metadataBaseUrl);

	return {
		title: post?.block?.[0]?.heading,
		description: post?.block?.[0]?.subheading || (await parent).description,
		openGraph: ogImageUrl
			? {
					images: [
						{
							url: ogImageUrl,
							alt: ogImageAlt,
						},
						...((await parent).openGraph?.images || []),
					],
			  }
			: {},
		metadataBase,
	};
}

export default async function PageSlugRoute({ params }) {
	const currentPost = await sanityFetch<PostsPayload>({
		query: postsBySlugQuery,
		tags: ["post"],
		qParams: { slug: params.slug },
	});

	console.log(currentPost);
	let otherPosts;

	if (currentPost) {
		const allPosts = await sanityFetch<PostsPayload[]>({
			query: postsQuery,
			tags: ["post"],
		});

		otherPosts = allPosts.filter((post) => post.slug?.current !== params.slug);
	}

	const blocks = currentPost?.block || [];

	return (
		<>
			{currentPost && (
				<>
					<main>
						{blocks?.map((block) => (
							<Blocks block={block as BlockProps} />
						))}
					</main>
					<Suspense fallback={<div>Loading...</div>}>
						{otherPosts && (
							<div className="flex-cols flex h-auto w-full flex-col bg-black p-2  pb-6 lg:px-6">
								<h4
									className={`${monomaniac.className} text-4xl  text-gray-200 `}
								>
									More Posts
								</h4>
								<div className="w-full py-12 ">
									<PostsList post={otherPosts} />
								</div>
							</div>
						)}
					</Suspense>
				</>
			)}
		</>
	);
}
