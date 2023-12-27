import MainPost from "@/components/global/MainPost";
import PostsList from "@/components/global/PostsList";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";

export default async function PostPage() {
	const posts: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	const mainPostData = posts[0];
	const postsListData = posts.slice(1, 10);

	return (
		<>
			<MainPost post={mainPostData} />
			<PostsList post={postsListData} />
		</>
	);
}
