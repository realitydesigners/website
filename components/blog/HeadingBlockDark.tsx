import Link from 'next/link';
import React from 'react';

import ImageBox from '@/components/shared/ImageBox';

const HeadingBlockDark = ({ block }) => {
   if (block?._type !== 'headingBlock') {
      return null;
   }

   return (
      <div className="w-full h-auto bg-gray-200 pt-20 lg:pt-32">
         <div className="w-full flex justify-center flex-wrap">
            <div className="w-11/12 flex items-center lg:hidden">
               <div className="flex w-full">
                  <span className="text-black ml-2 w-auto text-xs font-mono tracking-wide scramble">PUBLISHED ON {new Date(block.publicationDate).toLocaleDateString()}</span>
               </div>
               {block.tags && block.tags.length > 0 && (
                  <div className="flex">
                     {block.tags.map((tag, index) => (
                        <span key={index} className="text-xs h-6 flex uppercase font-mono font-semibold bg-black items-center justify-center p-2 border tracking-wide text-white mr-1">
                           {tag}
                        </span>
                     ))}
                  </div>
               )}
            </div>
            {block.image && (
               <div className="w-full flex-wrap lg:w-1/2 p-4 flex">
                  <ImageBox image={block.image} alt={`Cover Image for ${block.title}`} classesWrapper="w-full h-full object-cover object-contain" />
               </div>
            )}
            <div className="w-full lg:w-1/2 p-4 pr-4 lg:pr-20 flex pt-2 lg:pt-4 justify-center flex-cols">
               <div className="w-full">
                  <div className="w-full hidden items-center lg:flex mb-6">
                     <div className="flex w-full">
                        <span className="text-black font-mono w-auto text-xs tracking-wide scramble">PUBLISHED ON {block.publicationDate}</span>
                     </div>
                     {block.tags && block.tags.length > 0 && (
                        <div className="flex">
                           {block.tags.map((tag, index) => (
                              <span key={index} className="text-xs h-6 flex uppercase font-mono font-semibold bg-black items-center justify-center p-2 border tracking-wide text-white mr-1">
                                 {tag}
                              </span>
                           ))}
                        </div>
                     )}
                  </div>
                  {block.heading && <h1 className="text-3xl text-black leading-8 mb-4 lg:text-6xl scramble">{block.heading}</h1>}
                  {block.subheading && <p className="w-full text-md text-black leading-5 tracking-wide scramble">{block.subheading}</p>}
                  <div className="w-full flex items-center pt-4">
                     {block.team && (
                        <Link href={`/team/${block.team.slug.current}`}>
                           <div className="flex items-center pl-2 pr-3 p-4 h-8 bg-gray-300 rounded-lg border w-auto">
                              {block.team.image && <ImageBox image={block.team.image} alt={`Cover Image for ${block.title}`} classesWrapper="w-full h-full object-cover object-contain" />}
                              {block.team.name && <span className="ml-2 uppercase text-black font-semibold tracking-wide font-mono text-xs">By {block.team.name}</span>}
                           </div>
                        </Link>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HeadingBlockDark;
