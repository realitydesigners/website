import PostsList from "@/components/items/PostsList";
import SectionPosts from "@/components/items/SectionPosts";
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
	const topPostData = posts.slice(9, 13);
	const postsListData = posts.slice(13, 40);

	return (
		<main className="flex w-full flex-col bg-black">
			<Navbar />
			<SectionPosts
				topPostData={topPostData}
				sidePostData={sidePostData}
				mainPostData={mainPostData}
				rightPostData={rightPostData}
			/>
			<div className="flex-cols flex h-auto w-full px-2 py-4 lg:px-16">
				<PostsList post={postsListData} />
			</div>
			<Footer />
		</main>
	);
}
