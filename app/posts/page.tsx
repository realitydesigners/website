import { loadPosts } from "@/sanity/loader/loadQuery";
import { PostsList } from "@/components/global/PostsList";

export default async function PostPage() {
	const response = await loadPosts();
	const post = response.data;

	return (
		<>
			<PostsList post={post} />
		</>
	);
}
