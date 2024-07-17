"use client";
import { SanityImage } from "@/components/global/Images";
import { space, russo } from "@/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RenderCategory = ({ category }) => {
	if (!category) return null;

	return (
		<div className="my-1 flex items-center justify-center bg-gradient-to-r from-blue-100/100 to-blue-100/90 p-1 pl-2 pr-2">
			<span
				className={` flex h-auto items-center justify-center   whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-black `}
			>
				{category.title}
			</span>
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
			<Link
				href={`/team/${team.slug.current}`}
				className={` `}
			>
				<div className=" flex h-auto w-full justify-center p-1">
					{team.image && (
						<div className="flex w-full flex-row flex-wrap  items-center  ">
							<SanityImage
								image={team.image}
								alt={`Team member image for ${team.name}`}
								width={50}
								height={50}
								priority={true}
								classesWrapper="h-[2em] w-[2em] max-w-[2em] max-h-[2em] object-cover cover rounded-lg"
								theme={theme}
							/>
							<span className="ml-2 cursor-pointer bg-gradient-to-r from-blue-100/100  to-blue-100/90 bg-clip-text text-sm font-bold uppercase uppercase leading-none tracking-wide text-transparent ">
								Written by {team.name}
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
				<div className="h-auto w-full pt-16 lg:pt-32">
					<div className="flex w-full flex-wrap justify-center">
						<div
							className={
								"flex-cols flex w-full flex-wrap   items-center justify-between px-2 lg:hidden"
							}
						>
							{block.category && <RenderCategory category={block.category} />}

							<FormattedDate
								date={publicationDate}
								className={` my-1 w-auto bg-gradient-to-r from-blue-100/100 to-blue-100/90 bg-clip-text text-xs uppercase tracking-widest  text-transparent`}
							/>
						</div>

						<div className="flex w-full flex-wrap p-2 lg:w-1/2">
							<div className="h-full w-full object-contain object-cover">
								<Image
									src={imageUrl}
									alt={"this"}
									width={1000}
									height={1000}
									className="w-50 h-50"
								/>
								<p className=" flex  py-2 text-xs uppercase tracking-wide text-gray-400">
									Image Of: {imageAlt}
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
										className={` w-auto bg-gradient-to-r from-blue-100/100 to-blue-100/90 bg-clip-text text-xs uppercase tracking-widest text-transparent`}
									/>
								</div>
								<Heading
									heading={block.heading}
									className={`${russo.className} cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 bg-clip-text p-1 text-[10vw] font-bold uppercase leading-none text-transparent lg:text-[4vw]`}
								/>
								<SubHeading
									heading={block.subheading}
									className={`${space.className} bg-gradient-to-r from-blue-100/80 to-blue-100/70 bg-clip-text p-1 text-xl leading-tight text-transparent`}
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
