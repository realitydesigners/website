import dynamic from 'next/dynamic';

import Link from 'next/link';

import { HomePage } from '@/components/pages/home/HomePage';
import { studioUrl } from '@/sanity/lib/api';
import { loadPosts } from '@/sanity/loader/loadQuery';

export default async function IndexRoute() {
   const initial = await loadPosts();
   console.log(initial);

   if (!initial.data) {
      return (
         <div className="text-center">
            You don&rsquo;t have a homepage yet,{' '}
            <Link href={`${studioUrl}/desk/home`} className="underline text-4xl">
               create one now
            </Link>
            !
         </div>
      );
   }

   return <HomePage data={initial.data} />;
}
