import { SanityImage } from "@/components/global/Images";
import { russo } from "@/app/fonts";
import React from "react";

const QuoteRefBlock = ({ quote, className, image }) => {
  if (!quote) {
    return null;
  }

  return <QuoteCard quote={quote} image={image} className={className} />;
};

const QuoteCard = ({ quote, image, className }) => {
  switch (className) {
    case "card-1":
      return (
        <div className="flex w-full items-center justify-center py-6">
          <div className="rounded-2xl block w-11/12 overflow-hidden rounded-[1em] border border-gray-600 bg-black md:w-4/5 lg:w-2/3">
            {image && (
              <div className="relative w-full">
                <SanityImage
                  image={image}
                  alt={`Cover Image for ${quote}`}
                  width={800}
                  height={800}
                  classesWrapper="absolute inset-0 w-full h-full opacity-50 object-cover z-0"
                  priority={true}
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <h4
                    className={`flex items-center justify-center p-4 text-center text-2xl font-bold uppercase leading-none tracking-wide text-blue-100 sm:text-5xl lg:text-6xl  `}
                  >
                    {quote}
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    case "card-2":
      return (
        <div className="flex w-full items-center justify-center p-2 py-4">
          <div className="relative h-full w-full rounded-2xl border border-gray-600 bg-black md:w-1/2 lg:w-1/2">
            {image && (
              <div className="relative flex h-full w-full flex-col">
                <div className="absolute h-full w-full">
                  <SanityImage
                    image={image}
                    alt={`Cover Image for ${quote}`}
                    width={800}
                    height={800}
                    classesWrapper="inset-0 w-full h-full object-cover z-0 rounded-[1em] opacity-25"
                    priority={true}
                  />
                </div>
                <div className="z-10 h-full w-full items-center justify-center p-4">
                  <h4
                    className={`text-center text-2xl font-bold uppercase leading-[1.2em] tracking-wide text-blue-100 lg:text-3xl  `}
                  >
                    {quote}
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    default:
      return (
        <div className="flex w-full items-center justify-center py-6">
          <div className="rounded-2xl block w-11/12 overflow-hidden rounded-[1em] border border-gray-600 bg-black md:w-4/5 lg:w-2/3">
            {image && (
              <div className="relative w-full">
                <SanityImage
                  image={image}
                  alt={`Cover Image for ${quote}`}
                  width={800}
                  height={800}
                  classesWrapper="absolute inset-0 w-full h-full opacity-30 object-cover z-0"
                  priority={true}
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <h4
                    className={`flex items-center justify-center p-4 text-center text-2xl font-bold uppercase leading-none tracking-wide text-blue-100 sm:text-4xl lg:text-5xl  `}
                  >
                    {quote}
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
      );
  }
};

export default React.memo(QuoteRefBlock);
