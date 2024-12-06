"use client";
import { SanityImage } from "@/components/global/Images";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React from "react";

const HeadingSplineBlock = ({ block }) => {
  const { className, url } = block;

  switch (className) {
    case "dark": {
      let publicationDate = block.publicationDate;

      if (!publicationDate && block.block) {
        const blockWithDate = block.block.find(
          (blockItem) => blockItem.publicationDate
        );
        if (blockWithDate) {
          publicationDate = blockWithDate.publicationDate;
        }
      }

      const formattedDate = publicationDate
        ? new Date(publicationDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Date not available";

      const renderCategory = block.category ? (
        <span className="my-1 flex font-kodemono text-[10px] uppercase tracking-widest text-black items-center rounded-full justify-center bg-gray-400 p-1 pl-2 pr-2">
          {block.category.title}
        </span>
      ) : null;

      return (
        <div className="h-auto w-full pt-20 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex w-full flex-wrap justify-center">
              <div className="w-full lg:w-3/4">
                <div className="flex w-full mb-6 flex-wrap items-center justify-between">
                  <span className="font-kodemono ml-2 w-auto text-xs uppercase tracking-wider text-gray-400">
                    {formattedDate}
                  </span>
                  {renderCategory}
                </div>
                {block.heading && (
                  <h1 className="font-russo p-4 text-5xl text-gray-200 md:text-7xl leading-none">
                    {block.heading}
                  </h1>
                )}
                {block.subheading && (
                  <h2 className="font-kodemono w-full p-4 text-xl text-gray-400 leading-normal">
                    {block.subheading}
                  </h2>
                )}
              </div>

              {/* Author Section */}
              <div className="w-full pb-2 pl-2 lg:w-3/4 ">
                {block.team && (
                  <Link
                    href={`/team/${block.team.slug.current}`}
                    className="hover:text-gray-200 transition-colors"
                  >
                    <div className="flex w-auto p-2">
                      {block.team?.image && (
                        <div className="flex items-center space-x-3">
                          <SanityImage
                            image={block.team.image}
                            alt={`Team member image for ${block.team.name}`}
                            width={80}
                            height={80}
                            priority={true}
                            classesWrapper="h-[30px] w-[30px] object-cover rounded-full"
                          />
                          {block.team.name && (
                            <span className="font-kodemono text-sm text-gray-400 hover:text-gray-200 transition-colors">
                              {block.team.name}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                )}
              </div>

              {/* Spline Section */}
              <div className="h-[70vh] w-full overflow-hidden p-2 lg:w-3/4">
                <Spline scene={url} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};

export default React.memo(HeadingSplineBlock);
