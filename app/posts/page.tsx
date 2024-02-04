import ScrollablePostList from "@/components/global/ScrollablePostList";
import AllStations from "@/components/library/stations/AllStations";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";

export default async function PostsPage() {
	const posts: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	const postsListData = posts.slice(0, 30);

	return (
		<main className="flex justify-center items-center min-h-screen bg-black flex-col w-full">
			{/* Threejs background goes here */}

			<ScrollablePostList post={postsListData} />
		</main>
	);
}
