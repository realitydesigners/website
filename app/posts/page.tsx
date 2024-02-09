import ScrollablePostList from "@/components/global/ScrollablePostList";

import AllStations from "@/components/library/stations/AllStations";
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
		<main className="flex justify-center items-center min-h-screen bg-black flex-col w-full">
			{/* <AllStations categories={categories} /> */}
			<ScrollablePostList post={postsListData} />
		</main>
	);
}
