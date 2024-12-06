"use client";
import { SanityImage } from "@/components/global/Images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RenderCategory = ({ category }) => {
  if (!category) return null;

  return (
    <div className="my-1 flex text-[10px] font-semibold uppercase tracking-widest text-black flex items-center rounded-full justify-center bg-gray-400 p-1 pl-2 pr-2">
      {category.title}
    </div>
  );
};

const Heading = ({ heading, className }) => {
  if (!heading) return null;
  const displayHeading = heading || "No title";
  return <h1 className={className}>{displayHeading}</h1>;
};

const SubHeading = ({ heading, className }) => {
  if (!heading) return null;
  const displayHeading = heading || "No subtitle";
  return <h2 className={className}>{displayHeading}</h2>;
};

interface FormattedDateProps {
  date?: string;
  className?: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date, className }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Date not available";

  return <span className={className}>{formattedDate}</span>;
};

const TeamSection = ({ team, theme }) => {
  if (!team) return null;

  return (
    <div className="w-full items-center py-4">
      <Link href={`/team/${team.slug.current}`} className={` `}>
        <div className=" flex h-auto w-full justify-center p-1">
          {team.image && (
            <div className="flex w-full flex-row flex-wrap  items-center  ">
              <SanityImage
                image={team.image}
                alt={`Team member image for ${team.name}`}
                width={50}
                height={50}
                priority={true}
                classesWrapper=" max-w-[2em] max-h-[2em] object-cover cover rounded-full"
                theme={theme}
              />
              <span className="ml-2 text-white font-kodemono text-xs font-bold uppercase  leading-none tracking-wide  ">
                {team.name}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

const HeadingBlock = ({ block }) => {
  const { className, publicationDate } = block;

  const theme = block.className;
  const imageUrl = block.imageRef?.imageUrl;
  const imageAlt = block.imageRef?.imageAlt;

  switch (theme) {
    case "dark":
      return (
        <div className="h-auto w-full pt-20 lg:py-24">
          <div className="flex w-full flex-wrap justify-center">
            <div
              className={
                "flex-cols flex w-full flex-wrap   items-center justify-between px-2 lg:hidden"
              }
            >
              {block.category && <RenderCategory category={block.category} />}

              <FormattedDate
                date={publicationDate}
                className={` my-1 w-auto text-gray-200/50 font-kodemono text-xs uppercase tracking-widest  `}
              />
            </div>

            <div className="flex w-full flex-wrap p-2 lg:w-1/2">
              <div className="h-full w-full object-contain object-cover">
                <Image
                  src={imageUrl}
                  alt={"this"}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
                <p className=" flex  py-2 text-[8px] uppercase tracking-wide text-gray-200/50">
                  {imageAlt}
                </p>
              </div>
            </div>
            <div className="flex-cols flex w-full justify-center p-2 pr-4 pt-2 lg:w-1/2 lg:pr-20 lg:pt-4 ">
              <div className="w-full ">
                <div className="mb-6 hidden w-full items-center justify-between lg:flex">
                  {block.category && (
                    <RenderCategory category={block.category} />
                  )}

                  <FormattedDate
                    date={publicationDate}
                    className={` w-auto  text-gray-200/50 font-kodemono   text-xs uppercase tracking-widest`}
                  />
                </div>
                <Heading
                  heading={block.heading}
                  className={` font-russo text-white p-1 text-[10vw] font-bold uppercase leading-none  lg:text-[4vw]`}
                />
                <SubHeading
                  heading={block.subheading}
                  className={`text-gray-200/50 p-1 text-xl leading-tight`}
                />
                <div className="w-full ">
                  <TeamSection team={block.team} theme={className} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "light":
      return <div className="h-auto w-full bg-gray-200 pt-20 lg:pt-32"></div>;

    default:
      return null;
  }
};

export default HeadingBlock;
