import { loadPosts } from "@/sanity/loader/loadQuery";
import { PostsList } from "@/components/global/PostsList";
import Loading from "./loading";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { Suspense } from "react";

export default async function PostPage() {
	const response = await loadPosts();
	const post = response.data;

	return (
		<>
			<PostsList post={post} />
		</>
	);
}
