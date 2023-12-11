import { loadPosts } from "@/sanity/loader/loadQuery";
import { PostsList } from "@/components/global/PostsList";

export default async function PostPage() {
	const post = await loadPosts();

	return (
		<div className="flex w-full">
			<PostsList post={post} />
		</div>
	);
}
