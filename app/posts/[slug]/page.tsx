import { loadPosts, loadPostsPage } from "@/sanity/loader/loadQuery";
import { toPlainText } from "@portabletext/react";
import { Metadata, ResolvingMetadata } from "next";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import SlugPage from "@/app/posts/[slug]/SlugPage";
import { PostsList } from "@/components/global/PostsList";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { Suspense } from "react";

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
	const { data: post } = await loadPostsPage(params.slug);
	const ogImage = urlForOpenGraphImage(post?.image?.asset);

	return {
		title: post?.title,
		description: post?.excerpt || (await parent).description,
		openGraph: ogImage
			? {
					images: [ogImage, ...((await parent).openGraph?.images || [])],
			  }
			: {},
	};
}

export default async function PageSlugRoute({ params }: Props) {
	const currentPostResponse = await loadPostsPage(params.slug);
	const currentPost = await currentPostResponse.data;

	const allPostsResponse = await loadPosts();
	const allPosts = allPostsResponse.data;

	const otherPosts = allPosts.filter(
		(post) => post.slug?.current !== params.slug,
	);

	return (
		<>
			<SlugPage data={currentPost} />
			<Suspense fallback={<div>Loading more posts...</div>}>
				<PostsList post={otherPosts} />
			</Suspense>
		</>
	);
}
