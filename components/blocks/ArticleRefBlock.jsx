'use client';
import { ImageBox } from '@/components/global/Images';

const ArticleCard = ({ title, slug, image, excerpt }) => {
   return (
      <div className="flex w-full  items-center justify-center p-8">
         <div className="transition-border w-full  md:w-1/2 group flex h-auto flex-row border border-gray-500 p-4 transition-shadow duration-300 hover:border-gray-200 hover:shadow-xl lg:w-1/2">
            {image && (
               <div className="relative w-1/4">
                  <ImageBox image={image} alt={`Cover Image for ${title}`} classesWrapper="h-full w-full transform  rounded-md object-cover transition-transform duration-300 group-hover:scale-110" />
               </div>
            )}

            <div className="relative flex w-3/4 flex-col pl-4">
               <p className="mb-2 font-rajdhani text-sm uppercase leading-none tracking-wide text-gray-500">Article</p>
               <p className="duration-3 font-rajdhani text-xl tracking-wide text-gray-300 transition-colors group-hover:text-gray-200 group-hover:underline" href={`/article/${slug}`}>
                  {title}
               </p>
               <p className="text-gray-200"> {excerpt}</p>
            </div>
         </div>
      </div>
   );
};

const ArticleRefWrapper = ({ value }) => {
   const { articleRef } = value;

   if (!articleRef || !articleRef.articleTitle || !articleRef.articleSlug) return null;

   return <ArticleCard title={articleRef.articleTitle} slug={articleRef.articleSlug} image={articleRef.articleImage} />;
};

export default ArticleRefWrapper;
