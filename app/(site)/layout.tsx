import 'tailwindcss/tailwind.css';

import { Suspense } from 'react';
import Navbar from '@/components/global/Navbar';

export default async function PostsPage({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex min-h-screen flex-col bg-white text-black">
         <Suspense>
            <Navbar />
         </Suspense>

         <div className="flex min-h-screen flex-col bg-gray-200">
            <Suspense>{children}</Suspense>
         </div>
      </div>
   );
}
