import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc';
import { CustomPortableText } from '@/components/shared/CustomPortableText';
import { Header } from '@/components/shared/Header';
import { staatliches } from '@/app/fonts'; //
import type { PostsPayload } from '@/types';

export interface PageProps {
   data: PostsPayload | null;
   encodeDataAttribute?: EncodeDataAttributeCallback;
}

export function Page({ data, encodeDataAttribute }: PageProps) {
   const { title, category, excerpt, image, content } = data ?? {};

   return (
      <div>
         <div className="w-full h-full flex justify-center">
            <h2 className={`${staatliches.className} text-black p-4 text-3xl `}>{title}</h2>
         </div>
         <div className="text-md md:text-lg">
            <span data-sanity={encodeDataAttribute?.('duration.start')}>{title}</span>
         </div>
         <div className="absolute left-0 w-screen border-t" />
      </div>
   );
}

export default Page;
