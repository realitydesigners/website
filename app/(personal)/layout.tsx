import 'styles/index.css';

import { toPlainText } from '@portabletext/react';
import { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { Suspense } from 'react';

import { Footer } from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar/Navbar';

import { urlForOpenGraphImage } from '@/sanity/lib/utils';
import { loadHomePage, loadSettings, loadPosts } from '@/sanity/loader/loadQuery';

const VisualEditing = dynamic(() => import('@/sanity/loader/VisualEditing'));

export async function generateMetadata(): Promise<Metadata> {
   const [{ data: settings }, { data: homePage }] = await Promise.all([loadSettings(), loadHomePage(), loadPosts()]);

   const ogImage = urlForOpenGraphImage(settings?.ogImage);
   return {
      title: homePage?.title
         ? {
              template: `%s | ${homePage.title}`,
              default: homePage.title || 'Personal website',
           }
         : undefined,
      description: homePage?.overview ? toPlainText(homePage.overview) : undefined,
      openGraph: {
         images: ogImage ? [ogImage] : [],
      },
   };
}
<script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js"></script>;

export const viewport: Viewport = {
   themeColor: '#000',
};

export default async function IndexRoute({ children }: { children: React.ReactNode }) {
   return (
      <>
         <div className="flex min-h-screen flex-col bg-gray-200">
            <Suspense>
               <Navbar />
            </Suspense>
            <div className="mt-20 flex-grow min-h-screen">
               <Suspense>{children}</Suspense>
            </div>
            <Suspense>
               <Footer />
            </Suspense>
         </div>
         {draftMode().isEnabled && <VisualEditing />}
      </>
   );
}
