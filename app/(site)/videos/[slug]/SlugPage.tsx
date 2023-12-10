import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc';
import type { PostsPayload, VideoPayload } from '@/types';
import PortableTextComponent from '@/components/portabletext/PortableTextComponent';
import { jura, staatliches } from '@/fonts';

import { fileUrlFor } from '@/sanity/lib/utils';

export interface PageProps {
   data: VideoPayload | null;
   encodeDataAttribute?: EncodeDataAttributeCallback;
}

const Page: React.FC<PageProps> = ({ data, encodeDataAttribute }) => {
   // console.log(data);

   const { title, video, content } = data ?? {};
   //console.log('video', video);
   const videoUrl = video ? fileUrlFor(video.asset._ref) : '';

   return (
      <div className="bg-black h-auto  w-full flex lg:flex-cols flex-row flex-wrap items-start justify-center pt-24">
         <div className="w-full lg:w-1/6  h-24 lg:h-screen p-2 hidden lg:block "></div>
         <div className="w-11/12 lg:w-4/6 h-auto  p-2">
            {videoUrl && (
               <video controls autoPlay={true} className="w-full h-full border-gray-600 border rounded-lg overflow-hidden">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support this video player
               </video>
            )}
            <p className={`${staatliches.className}  uppercase text-4xl my-4 tracking-wide pt-4 text-gray-200 font-bold`}>{title}</p>
            <div className="w-full p-2 lg:p-6 ">
               <PortableTextComponent content={content || []} template="video" />
            </div>
         </div>

         <div className="w-full lg:w-1/6 h-screen  p-2"></div>
      </div>
   );
};

export default Page;
