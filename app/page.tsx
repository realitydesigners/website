import "tailwindcss/tailwind.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import { loadPosts } from "@/sanity/loader/loadQuery";
import { PostsList } from "@/components/global/PostsList";

export default async function IndexPage() {
	const response = await loadPosts();
	const post = response.data;

	return (
		<main className="flex flex-col w-full bg-gray-200">
			<Navbar pageBackground="light" />
			<Suspense fallback={<Loading />}>
				<PostsList post={post} />
			</Suspense>
			<Footer />
		</main>
	);
}
