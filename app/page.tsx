import MainPost from "@/components/items/MainPost";
import PostsList from "@/components/items/PostsList";
import RightSideBar from "@/components/items/RightSideBar";
import SideBar from "@/components/items/SideBar";
import TopBar from "@/components/items/TopBar";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";

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
		<main className="flex flex-col w-full bg-black">
			<Navbar />
			<div className="w-full pt-[80px] h-auto flex flex-cols p-4 lg:p-20 flex-wrap">
				<TopBar post={topPostData} />
				<SideBar post={sidePostData} />
				<MainPost post={mainPostData} />
				<RightSideBar post={rightPostData} />
			</div>
			<div className="w-full   p-4  py-12  flex h-auto flex-cols px-2 lg:px-6">
				<PostsList post={postsListData} />
			</div>
			<Footer />
		</main>
	);
}
