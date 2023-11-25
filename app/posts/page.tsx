import { loadPosts } from '@/sanity/loader/loadQuery';
import { PostsList } from '@/components/PostsList';

export default async function PostPage() {
   const response = await loadPosts();

   const post = response.data;

   // console.log('posts', post);

   return (
      <div className="flex w-full">
         <PostsList post={post} />
      </div>
   );
}
