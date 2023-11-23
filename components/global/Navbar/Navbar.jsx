'use client';
import { useState } from 'react';

export default function Navbar() {
   const [isNavOpen, setIsNavOpen] = useState(false);

   // Function to toggle the navigation menu
   const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
      document.body.style.overflow = isNavOpen ? 'auto' : 'hidden';
   };

   // Function to handle the SVG path change
   const getMenuIconPath = () => {
      return isNavOpen ? 'M3 3l18 18M3 21L21 3' : 'M3 12h18M3 6h18M3 18h18';
   };
   const getIcon = name => {
      const icons = {
         logo: (
            <svg width="30" height="30" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M47.1279 70.8731L33.5967 55.3087M43.4729 23.3416L10.6978 28.9689L33.5967 55.3087M43.4729 23.3416L33.5967 55.3087M43.4729 23.3416L68.3831 51.4708L33.5967 55.3087M43.4729 23.3416L30.6805 9.58502" stroke="black" strokeWidth="5" />
            </svg>
         ),
         menu: (
            <svg width="30" height="30" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M47.1279 70.8731L33.5967 55.3087M43.4729 23.3416L10.6978 28.9689L33.5967 55.3087M43.4729 23.3416L33.5967 55.3087M43.4729 23.3416L68.3831 51.4708L33.5967 55.3087M43.4729 23.3416L30.6805 9.58502" stroke="black" strokeWidth="5" />
            </svg>
         ),
         // Placeholder icon for 'library'
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
         feed: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
               <path d="M4 14H10" stroke="currentColor" strokeWidth="2" />
               <path d="M4 17H10" stroke="currentColor" strokeWidth="2" />
               <path d="M14 7H20" stroke="currentColor" strokeWidth="2" />
               <path d="M14 14H20" stroke="currentColor" strokeWidth="2" />
               <path d="M14 17H20" stroke="currentColor" strokeWidth="2" />
            </svg>
         ),
         team: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2" />
               <path d="M17 14H7C5.34315 14 4 15.3431 4 17V20H20V17C20 15.3431 18.6569 14 17 14Z" stroke="currentColor" strokeWidth="2" />
            </svg>
         ),
         assets: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" strokeWidth="2" />
               <path d="M12 2V22" stroke="currentColor" strokeWidth="2" />
               <path d="M4 7L20 17" stroke="currentColor" strokeWidth="2" />
               <path d="M20 7L4 17" stroke="currentColor" strokeWidth="2" />
            </svg>
         ),
      };
      return icons[name] || <path />;
   };

   return (
      <nav role="navigation" id="navbar" className="flex items-center justify-between z-80 border-b border-gray-200 bg-gray-200/75 fixed w-full z-50 h-12">
         <div className="ml-2 relative z-80 logo">
            <a href="/" className="flex-cols z-80 p-2 items-center flex">
               {getIcon('logo')}
            </a>
         </div>
         <a href="/" className="flex lg:flex text-black pt-2 pb-2 flex-col">
            <span className="text-md font-bold tracking-wide leading-none">REALITY</span>
            <span className="text-xs font-bold leading-none">DESIGNERS</span>
         </a>

         <div className="flex relative">
            <button id="nav-toggle" className="flex items-center justify-center items-center relative p-2 z-20" aria-label="Toggle Menu" onClick={toggleNav}>
               {getIcon('menu')}
            </button>
         </div>

         <div id="nav-content" role="menu" className={`absolute right-2 top-2 rounded-2xl border border-gray-200/20 bg-black/50 lg:w-1/3 sm:w-2/3 w-[96vw] h-[97vh] overflow-y-auto flex-grow flex items-center ${isNavOpen ? 'flex' : 'hidden'}`}>
            <div class="w-full h-full backdrop-blur-xl p-2 relative ">
               <div class="w-full h-[250px]">
                  <a href="/">
                     <script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js"></script>
                     <spline-viewer url="https://prod.spline.design/HeD0BAam-X2SBMf3/scene.splinecode"></spline-viewer>
                  </a>
               </div>

               <ul class="flex font-bold relative  p-2 gap-2 h-auto lg:h-auto flex-col  lg:justify-end uppercase text-black text-5xl lg:text-6xl">
                  <li>
                     <a href="/library" className="block flex items-center px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           {getIcon('library')}
                        </svg>
                        Library
                     </a>
                  </li>
                  <li>
                     <a href="/story" className="block flex items-center px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           {getIcon('story')}
                        </svg>
                        Story
                     </a>
                  </li>

                  <li>
                     <a href="/feed" className="block flex items-center px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           {getIcon('feed')}
                        </svg>
                        Feed
                     </a>
                  </li>
                  <li>
                     <a href="/team" className="block flex items-center px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           {getIcon('team')}
                        </svg>
                        Team
                     </a>
                  </li>
                  <li>
                     <a href="/assets" className="block flex items-center px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg">
                        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           {getIcon('assets')}
                        </svg>
                        3D
                     </a>
                  </li>
               </ul>
               <div class="w-full h-auto justify-center flex  p-2 bottom-0 rounded-xl relative ">
                  <ul class="flex uppercase font-bold flex-row flex-wrap h-auto text-sm ">
                     <li class="px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg ">
                        <a href="/become-a-creator">Become A Creator</a>
                     </li>

                     <li class="px-3 py-1 text-white hover:bg-gray-200/30 rounded-lg ">
                        <a href="/team">Contact </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>
   );
}
