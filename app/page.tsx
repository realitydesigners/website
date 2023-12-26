import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import { PostsList } from "@/components/global/PostsList";
import { sanityFetch } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import { PostsPayload } from "@/types";
import { Suspense } from "react";
import "tailwindcss/tailwind.css";
import Loading from "./loading";

export default async function IndexPage() {
	const post: PostsPayload[] = await sanityFetch({
		query: postsQuery,
		tags: ["posts"],
	});

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
