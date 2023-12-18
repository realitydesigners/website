import { PostsList } from "@/components/global/PostsList";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";

export default async function PostPage() {
	const post: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	return (
		<>
			<PostsList post={post} />
		</>
	);
}
