import 'tailwindcss/tailwind.css';

import { Suspense } from 'react';
import { Footer } from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar/Navbar';

export default async function IndexRoute({ children }: { children: React.ReactNode }) {
   return (
      <>
         <body>
            <Navbar />
            <div className="flex min-h-screen flex-col bg-gray-200">
               <div className="mt-20 flex-grow min-h-screen">
                  <Suspense>{children}</Suspense>
               </div>
            </div>
            <Suspense>
               <Footer />
            </Suspense>
         </body>
      </>
   );
}
