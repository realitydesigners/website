import { loadPosts } from "@/sanity/loader/loadQuery";
import { PostsList } from "@/components/global/PostsList";

export default async function IndexPage() {
	const response = await loadPosts();
	const post = response.data;

	return (
		<div className="flex w-full">
			<PostsList post={post} />
		</div>
	);
}
