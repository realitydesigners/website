import { loadPosts } from "@/sanity/loader/loadQuery";
import { PostsList } from "@/components/global/PostsList";
import Loading from "./loading";

import { Suspense } from "react";

export default async function PostPage() {
	const response = await loadPosts();
	const post = response.data;

	return (
		<Suspense fallback={<Loading />}>
			<div className="flex w-full">
				<PostsList post={post} />
			</div>
		</Suspense>
	);
}
