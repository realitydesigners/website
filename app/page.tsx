import Footer from "@/components/global/Footer";
import MainPost from "@/components/global/MainPost";
import Navbar from "@/components/global/Navbar";
import PostsList from "@/components/global/PostsList";
import RightSideBar from "@/components/global/RightSideBar";
import SideBar from "@/components/global/SideBar";
import TopBar from "@/components/global/TopBar";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";
import { Suspense } from "react";
import Loading from "./loading";

export default async function IndexPage() {
	const posts: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

	const mainPostData = posts[0];
	const sidePostData = posts.slice(1, 3);
	const rightPostData = posts.slice(4, 9);
	const postsListData = posts.slice(13, 30);
	const topPostData = posts.slice(9, 13);

	return (
		<main className="flex flex-col w-full bg-gray-200">
			<Navbar pageBackground="light" />
			<Suspense fallback={<Loading />}>
				<div className="w-full pt-[80px] h-auto flex flex-cols px-2 lg:px-6  flex-wrap">
					<TopBar post={topPostData} />
					<SideBar post={sidePostData} />
					<MainPost post={mainPostData} />
					<RightSideBar post={rightPostData} />
				</div>
				<div className="w-full   mb-6  flex h-auto flex-cols px-2 lg:px-6">
					<PostsList post={postsListData} />
				</div>
			</Suspense>
			<Footer />
		</main>
	);
}
