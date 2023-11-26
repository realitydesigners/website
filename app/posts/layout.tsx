import 'tailwindcss/tailwind.css';

import { Suspense } from 'react';
import { Footer } from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar/Navbar';

<script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js"></script>;

export default async function PostsPage({ children }: { children: React.ReactNode }) {
   return (
      <main>
         <Navbar />
         <div className="flex min-h-screen flex-col bg-gray-200">
            <div className="mt-20 flex-grow min-h-screen">
               <Suspense>{children}</Suspense>
            </div>
         </div>
         <Suspense>
            <Footer />
         </Suspense>
      </main>
   );
}
