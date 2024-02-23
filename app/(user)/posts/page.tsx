import ScrollablePostList from "@/components/items/ScrollablePostList";

import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { categoryQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";
import { CategoryPayload } from "@/types";

export default async function PostsPage() {
	const posts: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	const postsListData = posts.slice(0, 30);

	// const categories: CategoryPayload[] = await sanityFetch({
	// 	query: categoryQuery,
	// 	tags: ["category"],
	// });

	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
			<ScrollablePostList post={postsListData} />
		</main>
	);
}
