import dynamic from 'next/dynamic';

import Link from 'next/link';

import { HomePage } from '@/components/pages/home/HomePage';
import { studioUrl } from '@/sanity/lib/api';
import { loadPosts } from '@/sanity/loader/loadQuery';

export default async function IndexRoute() {
   return <div className="text-center"></div>;
}
