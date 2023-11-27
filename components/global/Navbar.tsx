'use client';
import React, { useState } from 'react';

import Link from 'next/link';
import { staatliches, inter, jura } from '@/app/fonts';

export default function Navbar() {
   const [isNavOpen, setIsNavOpen] = useState(false);

   const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
      document.body.style.overflow = isNavOpen ? 'auto' : 'hidden';
   };
   const closeNav = () => {
      setIsNavOpen(false); // Close the navigation
      document.body.style.overflow = 'auto'; // Enable scrolling
   };

   const getIcon = name => {
      const icons = {
         logo: (
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M47.1279 70.8731L33.5967 55.3087M43.4729 23.3416L10.6978 28.9689L33.5967 55.3087M43.4729 23.3416L33.5967 55.3087M43.4729 23.3416L68.3831 51.4708L33.5967 55.3087M43.4729 23.3416L30.6805 9.58502" stroke="black" strokeWidth="5" />
            </svg>
         ),
         menu: (
            <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isNavOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
         ),
         library: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M4 3H20V21H4V3ZM6 5V19H18V5H6Z" stroke="currentColor" strokeWidth="2" />
               <path d="M9 7H15" stroke="currentColor" strokeWidth="2" />
               <path d="M9 11H15" stroke="currentColor" strokeWidth="2" />
               <path d="M9 15H15" stroke="currentColor" strokeWidth="2" />
            </svg>
         ),
         story: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M4 4H14L20 10V20H4V4Z" stroke="currentColor" strokeWidth="2" />
               <path d="M14 4V10H20" stroke="currentColor" strokeWidth="2" />
               <path d="M6 12H12" stroke="currentColor" strokeWidth="2" />
               <path d="M6 16H12" stroke="currentColor" strokeWidth="2" />
            </svg>
         ),
      };
      return icons[name] || <path />;
   };

   return (
      <nav role="navigation" id="navbar" className="flex items-center h-16 p-2 justify-between fixed w-full z-50 bg-gradient-to-t from-transparent to-gray-200">
         <div className=" relative flex items-center z-10">
            <Link href="/posts" className="flex items-center h-12 w-12 w-auto p-2">
               {getIcon('logo')}
            </Link>
            <Link href="/" className={`${staatliches.className} text-black pt-2 pb-2 hidden lg:flex flex-col`}>
               <span className="text-md font-bold tracking-widest leading-none">REALITY</span>
               <span className="text-xs font-bold tracking-widest leading-none">DESIGNERS</span>
            </Link>
         </div>

         <div className="relative lg:pl-0">
            <button id="nav-toggle" className="flex items-center h-10 w-10  justify-center relative  z-20 lg:hidden" aria-label="Toggle Menu" onClick={toggleNav}>
               {getIcon('menu')}
            </button>
         </div>

         <div id="nav-content" role="menu" className={`absolute lg:relative top-0 left-0 w-full bg-gray-200 lg:bg-transparent lg:w-auto h-screen lg:h-auto overflow-y-auto lg:overflow-visible transition-transform duration-300 ease-in-out ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col lg:flex-row justify-start lg:justify-end p-8 lg:p-0`}>
            <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0">
               <li>
                  <Link href="/library" className={`${staatliches.className} text-black text-3xl lg:text-sm font-bold hover:bg-gray-600/30 hover:text-gray-200 p-3 rounded-lg transition-all duration-200 ease-in-out`} onClick={closeNav}>
                     Library
                  </Link>
               </li>
               <li>
                  <Link href="/posts" className={`${staatliches.className} text-black text-3xl lg:text-sm font-bold hover:bg-gray-600/30 hover:text-gray-200 p-3 rounded-lg transition-all duration-200 ease-in-out`} onClick={closeNav}>
                     Posts
                  </Link>
               </li>
            </ul>
         </div>
      </nav>
   );
}
