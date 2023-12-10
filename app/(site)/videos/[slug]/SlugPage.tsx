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
   console.log(data);

   const { title, video, content } = data ?? {};
   //console.log('video', video);
   const videoUrl = video ? fileUrlFor(video.asset._ref) : '';

   return (
      <div className="bg-black min-h-screen w-full flex flex-row items-start justify-center pt-28">
         <div className="w-full flex ">
            {videoUrl && (
               <video controls autoPlay={true} className="w-full h-full">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
               </video>
            )}
         </div>

         <div className="w-full">
            <p className={`${staatliches.className} ml-2 uppercase text-4xl  tracking-wide pt-4 text-gray-200 font-bold`}>{title}</p>
            <PortableTextComponent content={content || []} template="dark" />
         </div>
      </div>
   );
};

export default Page;
