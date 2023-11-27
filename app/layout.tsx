import 'tailwindcss/tailwind.css';

import { Suspense } from 'react';
import { Footer } from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar';

export default function IndexPage({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Navbar />
         {/* Using <main> for the main content */}
         <main className="flex-grow bg-gray-200">
            {/* Suspense will display the fallback while children (pages/components) are loading */}
            <Suspense
               fallback={
                  <div className="flex justify-center items-center min-h-screen">
                     <p>Loading...</p>
                  </div>
               }
            >
               {children}
            </Suspense>
         </main>
         {/* Assuming Footer component contains <footer> tag */}
         <Footer />
      </>
   );
}
