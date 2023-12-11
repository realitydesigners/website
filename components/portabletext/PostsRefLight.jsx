import Link from 'next/link';

import ImageBox from '@/components/shared/ImageBox';
import { jura, staatliches } from '@/fonts';

const PostsCardLight = ({ title, slug, image, excerpt }) => {
   return (
      <div className="flex w-full  items-center justify-center p-4 mb-6 lg:p-16">
         <div className=" bg-gray-300 w-full rounded-lg md:w-1/2 group flex h-auto flex-row p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl lg:w-3/5">
            {image && (
               <div className="relative w-1/3">
                  <ImageBox image={image} alt={`Cover Image for ${title}`} classesWrapper="h-full w-full transform rounded-md object-cover transition-transform duration-300 group-hover:scale-110" />
               </div>
            )}

            <div className="relative flex w-3/4 flex-col pl-4">
               <p className={`${staatliches.className}  pt-2 mb-2 font-rajdhani text-xs uppercase leading-none tracking-wide text-black`}>Related Post</p>
               <Link className={`${staatliches.className} duration-3 font-rajdhani leading-none text-2xl md:text-2xl tracking-wide text-black transition-colors group-hover:text-gray-800 group-hover:underline`} href={`/posts/${slug}`}>
                  {title}
               </Link>
               <p className="text-white"> {excerpt}</p>
            </div>
         </div>
      </div>
   );
};

const PostsRefWrapper = ({ value }) => {
   const { postsRef } = value;

   if (!postsRef || !postsRef.postsTitle || !postsRef.postsSlug) return null;

   return <PostsCardLight title={postsRef.postsTitle} slug={postsRef.postsSlug} image={postsRef.postsImage} />;
};

export default PostsRefWrapper;
