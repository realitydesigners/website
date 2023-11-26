import 'tailwindcss/tailwind.css';

import { Suspense } from 'react';
import { Footer } from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar/Navbar';

export default async function IndexPage({ children }: { children: React.ReactNode }) {
   return (
      <body>
         <div className="flex min-h-screen flex-col bg-gray-200">
            <div className="">{children}</div>
         </div>
         <Suspense>
            <Footer />
         </Suspense>
      </body>
   );
}
