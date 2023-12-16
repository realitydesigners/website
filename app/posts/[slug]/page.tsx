import { loadPosts, loadPostsPage } from "@/sanity/loader/loadQuery";
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
