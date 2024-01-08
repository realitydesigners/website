"use server";

import PostPage from "@/app/posts/page";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";

export default async function PostPageServer() {
	const posts: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	const mainPostData = posts[0];
	const sidePostData = posts.slice(1, 3);
	const rightPostData = posts.slice(4, 9);
	const postsListData = posts.slice(9, 20);

	return (
		<PostPage
			mainPostData={mainPostData}
			sidePostData={sidePostData}
			rightPostData={rightPostData}
			postsListData={postsListData}
		/>
	);
}
