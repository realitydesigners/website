import 'tailwindcss/tailwind.css';

import { Suspense } from 'react';
import { Footer } from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar';

<script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js"></script>;

export default async function PostsPage({ children }: { children: React.ReactNode }) {
   return (
      <>
         <div className="flex min-h-screen flex-col bg-white text-black">
            <Suspense>
               <Navbar />
            </Suspense>

            <div className="flex min-h-screen flex-col bg-gray-200">
               <Suspense>{children}</Suspense>
            </div>

            <Suspense>
               <Footer />
            </Suspense>
         </div>
      </>
   );
}
