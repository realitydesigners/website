import { CustomPortableText } from '@/components/shared/CustomPortableText';
import { Header } from '@/components/shared/Header';
import { staatliches, jura } from '@/app/fonts'; //
import type { PostsPayload } from '@/types';

export interface PageProps {
   data: PostsPayload | null;
}

export function Page({ data }: PageProps) {
   // Default to an empty object to allow previews on non-existent documents
   const { title } = data ?? {};

   return (
      <div>
         <div className="w-full h-full flex justify-center">
            <h2 className={`${staatliches.className} text-black p-4 text-3xl `}>{title}</h2>
         </div>
         <div className="absolute left-0 w-screen border-t" />
      </div>
   );
}

export default Page;
