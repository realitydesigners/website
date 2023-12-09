import 'tailwindcss/tailwind.css';

import { IBM_Plex_Mono, Inter, PT_Serif } from 'next/font/google';

import { Suspense } from 'react';
import Navbar from '@/components/global/Navbar';

const serif = PT_Serif({
   variable: '--font-serif',
   style: ['normal', 'italic'],
   subsets: ['latin'],
   weight: ['400', '700'],
});
const sans = Inter({
   variable: '--font-sans',
   subsets: ['latin'],
   // @todo: understand why extrabold (800) isn't being respected when explicitly specified in this weight array
   // weight: ['500', '700', '800'],
});
const mono = IBM_Plex_Mono({
   variable: '--font-mono',
   subsets: ['latin'],
   weight: ['500', '700'],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   <script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js"></script>;
   return (
      <html lang="en" className={`${mono.variable} ${sans.variable} ${serif.variable} bg-gray-200`}>
         <body>
            {' '}
            <Navbar pageBackground="light" />
            {children}
         </body>
      </html>
   );
}
