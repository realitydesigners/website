import Link from 'next/link';

import ImageBox from '@/components/shared/ImageBox';

const QuoteCard = ({ quote, media, image }) => {
   switch (className) {
      case 'card-1':
         return (
            <div className="flex w-full items-center justify-center mb-8 ">
               <div className="relative md:w-4/5 lg:w-1/2 w-11/12 border bg-black rounded-2xl border-gray-600">
                  <div className="absolute inset-0 z-10">{media?.image && <ImageBox image={media.image} alt={`Cover Image`} classesWrapper="h-full w-full opacity-40  object-cover rounded-2xl" />}</div>
                  <div className="relative p-3 z-20">
                     <div className="flex w-full justify-end mb-4">
                        <p className="tag tracking-wide uppercase text-pink-200 flex w-auto p-[.2em] pl-2 pr-2 text-xs backdrop-blur-lg  rounded-2xl border border-pink-200 bg-pink-200/20 transition-all duration-300 ease-in hover:bg-pink-400 hover:border-pink-400 hover:text-white">Quote</p>
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 -mt-8 w-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 10h2V5h5V3H5zM11 10h2V5h5V3h-7z" />
                     </svg>
                     <h4 className=" text-3xl text-center lg:text-4xl pl-6 pr-6 pt-0 pb-6 font-bold uppercase leading-none text-gray-200 flex items-center">{quote}</h4>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 -mb-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 10h2V5h5V3H5zM11 10h2V5h5V3h-7z" />
                     </svg>
                  </div>
               </div>
            </div>
         );
      case 'card-2':
      default:
         return (
            <div className="flex w-full items-center justify-center mb-8 ">
               <div className="relative md:w-4/5 lg:w-1/2 w-11/12 border bg-black rounded-2xl border-gray-600">
                  <div className="absolute inset-0 z-10">{media?.image && <ImageBox image={media.image} alt={`Cover Image`} classesWrapper="h-full w-full opacity-40  object-cover rounded-2xl" />}</div>
                  <div className="relative p-3 z-20">
                     <div className="flex w-full justify-end mb-4">
                        <p className="tag tracking-wide uppercase text-pink-200 flex w-auto p-[.2em] pl-2 pr-2 text-xs backdrop-blur-lg  rounded-2xl border border-pink-200 bg-pink-200/20 transition-all duration-300 ease-in hover:bg-pink-400 hover:border-pink-400 hover:text-white">Quote</p>
                     </div>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 -mt-8 w-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 10h2V5h5V3H5zM11 10h2V5h5V3h-7z" />
                     </svg>
                     <h4 className=" text-3xl text-center lg:text-4xl pl-6 pr-6 pt-0 pb-6 font-bold uppercase leading-none text-gray-200 flex items-center">{quote}</h4>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 -mb-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 10h2V5h5V3H5zM11 10h2V5h5V3h-7z" />
                     </svg>
                  </div>
               </div>
            </div>
         );
   }
};

const QuoteRefWrapper = ({ value }) => {
   const { quote } = value;

   if (!quote) {
      return null;
   }

   return <QuoteCard quote={quote.quote} media={quote.mediaRef} />;
};

export default QuoteRefWrapper;
