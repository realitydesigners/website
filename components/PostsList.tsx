import { FC } from 'react';
import Link from 'next/link';
import ImageBox from '@/components/shared/ImageBox';
import { PostsPayload } from '@/types/index';
import { staatliches, jura } from '@/app/fonts'; // Assuming these are valid class names

interface PostItemProps {
   post: PostsPayload;
}

export const PostItem: FC<PostItemProps> = ({ post }) => {
   let publicationDate = post.publicationDate;

   // If there's no top-level publicationDate, try to get one from the block array
   if (!publicationDate && post.block) {
      const blockWithDate = post.block.find(blockItem => blockItem.publicationDate);
      if (blockWithDate) {
         publicationDate = blockWithDate.publicationDate;
      }
   }

   const formattedDate = publicationDate
      ? new Date(publicationDate).toLocaleDateString('en-US', {
           year: 'numeric',
           month: 'long',
           day: 'numeric',
        })
      : 'Date not available';

   const { title, image, slug, excerpt } = post;

   return (
      <article className="mb-4 h-auto border border-gray-800 p-1">
         {image && (
            <div className="relative h-48">
               <ImageBox image={image} alt={`Cover Image for ${title}`} classesWrapper="w-full h-full object-cover object-contain" />
            </div>
         )}
         <div>
            <p className={`${jura.className} w-10/12 p-2 text-sm text-black`}>{formattedDate}</p>
            <Link href={`/posts/${slug.current}`}>
               <h2 className={`${staatliches.className} p-2 text-4xl uppercase leading-none text-black cursor-pointer`}>{title}</h2>
            </Link>
            <p className={`${jura.className} p-2 text-md font-bold leading-tight text-black`}>{excerpt}</p>
         </div>
      </article>
   );
};

interface PostsListProps {
   post: PostsPayload[];
}
export const PostsList: FC<PostsListProps> = ({ post }) => {
   if (!post) {
      return null;
   }

   return (
      <div className="grid grid-cols-1 gap-4 p-4 pt-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {post.map(post => (
            <PostItem key={post.slug.current} post={post} />
         ))}
      </div>
   );
};

export default PostsList;
