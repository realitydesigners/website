import Link from 'next/link';

import ImageBox from '@/components/shared/ImageBox';

const MediaCard = ({ title, slug, image, media, className }) => {
   switch (className) {
      case 'card-1':
         return (
            <div className="relative p-4 ">
               <div style={{ clipPath: 'polygon(1% 5%, 95% 0%, 90% 95%, 5% 90%)' }} className="relative flex h-auto w-full">
                  {media?.image && <ImageBox image={media.image} alt={`Cover Image for ${title}`} classesWrapper="relative h-full w-full" />}
               </div>
               {media?.team && (
                  <div className="relative -mt-4 lg:-mt-12 bottom-0 flex h-auto w-full  bg-gradient-to-t from-black to-transparent pl-4 lg:pl-16 text-white">
                     <ImageBox image={media.team.image} alt={`Cover Image for ${media.team.name}`} classesWrapper="mr-2 h-6 w-6 rounded-full" />

                     <div className="font-rajdhani relative flex flex-col items-start text-xs uppercase leading-none">
                        <Link href="/" className="text-gray-400">
                           Artist
                        </Link>
                        <Link href="/" className="text-white">
                           {media.team.name}
                        </Link>
                     </div>
                     <Link href={`/media/${slug}`} className=" ml-4 inline-block cursor-pointer text-2xl font-bold text-white">
                        →
                     </Link>
                  </div>
               )}
            </div>
         );
      default:
         return null;
   }
};

const MediaRefWrapper = ({ value }) => {
   const { media, className } = value;

   if (!media || media.type !== 'image') {
      return null;
   }

   return <MediaCard media={media} slug={media.slug.current} className={className} />;
};

export default MediaRefWrapper;
