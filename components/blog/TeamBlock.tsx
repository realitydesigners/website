import Link from 'next/link';

import SmallImage from '@/components/shared/SmallImage';

const TeamBlock = ({ block }) => {
   if (block?._type !== 'teamBlock') {
      return null;
   }

   return (
      <div className="w-full h-auto bg-gray-200 pb-8 ">
         <div className="w-full flex justify-center">
            <div className="flex flex-col w-11/12 lg:w-1/3 bg-gray-300 mb-12 shadow-lg p-4 border border-gray-300 rounded-xl">
               <div className="flex justify-center items-center">
                  <SmallImage image={block?.team.image} alt="Team member image" classesWrapper="w-[5em] h-[5em] object-cover rounded-full shadow-2xl" />
                  <div className="ml-4 flex flex-col">
                     <p className="text-black uppercase leading-none font-bold font-mono tracking-wide text-lg">{block?.team.name}</p>
                     <span className="text-black font-mono leading-none uppercase text-xs tracking-widest">{block?.team.role}</span>
                  </div>
               </div>
               <p className="p-2 text-black text-sm font-mono mt-4">{block?.team.shortBio}</p>
               <div className="bg-black justify-center flex rounded-lg">
                  <Link href={`/team/${block.team.slug.current}`} className="text-sm uppercase text-white p-2 font-mono font-bold flex items-center">
                     <span>View Profile</span>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M14.707 9.293a1 1 0 0 0-1.414-1.414L10 11.586 6.707 8.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4z" />
                     </svg>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TeamBlock;
