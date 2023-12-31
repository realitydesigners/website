import MainPost from "@/components/global/MainPost";
import PostsList from "@/components/global/PostsList";
import RightSideBar from "@/components/global/RightSideBar";
import SideBar from "@/components/global/SideBar";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";

export default async function PostPage() {
	const posts: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	const mainPostData = posts[0];
	const sidePostData = posts.slice(1, 3);
	const rightPostData = posts.slice(4, 9);
	const postsListData = posts.slice(9, 20);

	return (
		<>
			<div className="w-full pt-[80px] h-auto flex flex-cols px-2 lg:px-6  flex-wrap">
				<SideBar post={sidePostData} />
				<MainPost post={mainPostData} />
				<RightSideBar post={rightPostData} />
			</div>

			<div className="w-full flex h-auto flex-cols px-2 lg:px-6">
				<PostsList post={postsListData} />
			</div>
		</>
	);
}
