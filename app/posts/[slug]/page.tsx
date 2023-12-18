import { toPlainText } from "@portabletext/react";
import { Metadata, ResolvingMetadata } from "next";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import SlugPage from "@/app/posts/[slug]/SlugPage";
import { PostsList } from "@/components/global/PostsList";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { Suspense } from "react";
import { postsBySlugQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";
import { sanityFetch } from "@/sanity/lib/client";

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
export default async function PageSlugRoute({ params }: Props) {
	// Fetch the current post using the new sanityFetch
	const currentPost = await sanityFetch<PostsPayload>({
		query: postsBySlugQuery,
		tags: ["post"],
		qParams: { slug: params.slug },
	});

	// Fetch all posts using the new sanityFetch
	const allPosts = await sanityFetch<PostsPayload[]>({
		query: postsBySlugQuery,
		tags: ["post"],
		qParams: { slug: params.slug },
	});

	// Filter out the current post from the list of all posts
	const otherPosts =
		allPosts && Array.isArray(allPosts)
			? allPosts.filter((post) => post.slug?.current !== params.slug)
			: [];

	return (
		<>
			<SlugPage data={currentPost} />
			<Suspense fallback={<div>Loading more posts...</div>}>
				<PostsList post={otherPosts} />
			</Suspense>
		</>
	);
}
