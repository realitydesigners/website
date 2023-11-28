import Link from 'next/link';
import SmallImage from '../shared/SmallImage';
import { staatliches, jura } from '@/fonts';

import ImageBox from '@/components/shared/ImageBox';

const HeadingBlockLight = ({ block }) => {
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
                        <span key={index} className={`${staatliches.className} text-xs h-auto flex uppercase font-mono font-semibold bg-black items-center justify-center p-1 pl-2 pr-2  tracking-widest text-white mr-1`}>
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
                              <span key={index} className={`${staatliches.className} text-xs h-auto flex uppercase font-mono font-semibold p-1 pl-2 pr-2  bg-black items-center justify-center p-2 border tracking-wide text-white mr-1`}>
                                 {tag}
                              </span>
                           ))}
                        </div>
                     )}
                  </div>
                  {block.heading && <h1 className={`${staatliches.className} text-5xl text-black leading-tightest mb-4 lg:text-6xl `}>{block.heading}</h1>}
                  {block.subheading && <p className={`${jura.className}  w-full font-bold text-2xl  text-black leading-7 tracking-wide `}>{block.subheading}</p>}
                  <div className="w-full h-auto flex items-center pt-4">
                     {block.team && (
                        <Link href={`/team/${block.team.slug.current}`}>
                           <div className="flex items-center p-2 rounded-lg border w-full ">
                              {block.team.image && <SmallImage image={block.team.image} alt={`Cover Image for ${block.title}`} classesWrapper="max-w-[50px] max-h-[50px] object-cover rounded-full" />}
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

export default HeadingBlockLight;
