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
	const ogImage = urlForOpenGraphImage(post?.block?.[0]?.image);
	const metadataBase = new URL(metadataBaseUrl);

	return {
		title: post?.block?.[0]?.heading,
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
	const currentPost = await sanityFetch<PostsPayload>({
		query: postsBySlugQuery,
		tags: ["post"],
		qParams: { slug: params.slug },
	});

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
							<div className="w-full pb-6 flex flex-col h-auto flex-cols p-2  lg:px-6 bg-black">
								<h4
									className={`${monomaniac.className} text-gray-200  text-4xl `}
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
