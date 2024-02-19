"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac, play, space } from "@/fonts";
import Link from "next/link";
import React from "react";

const RenderCategory = ({ category }) => {
	if (!category) return null;

	return (
		<div className="flex items-center justify-center bg-gradient-to-r from-blue-100/100 to-blue-100/90 p-1 my-1 pl-2 pr-2">
			<span
				className={`${monomaniac.className} text-xs h-auto flex uppercase font-mono text-black font-semibold items-center justify-center tracking-widest whitespace-nowrap `}
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
				className={`${monomaniac.className}`}
			>
				<div className=" p-1 w-full flex justify-center h-auto">
					{team.image && (
						<div className="flex flex-row flex-wrap items-center  w-full  ">
							<SanityImage
								image={team.image}
								alt={`Team member image for ${team.name}`}
								width={50}
								height={50}
								priority={true}
								classesWrapper="h-[2em] w-[2em] max-w-[2em] max-h-[2em] object-cover cover rounded-lg"
								theme={theme}
							/>
							<span className="ml-2 uppercase tracking-wide text-sm  font-bold uppercase leading-none cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text ">
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

	switch (theme) {
		case "dark":
			return (
				<div className="w-full h-auto pt-16 lg:pt-32">
					<div className="w-full flex justify-center flex-wrap">
						<div
							className={
								"w-full px-2 flex flex-wrap   flex-cols items-center justify-between lg:hidden"
							}
						>
							{block.category && <RenderCategory category={block.category} />}

							<FormattedDate
								date={publicationDate}
								className={`${monomaniac.className} my-1 uppercase w-auto text-xs bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text  tracking-widest`}
							/>
						</div>
						{block.image && (
							<div className="w-full flex-wrap lg:w-1/2 p-2 flex">
								<div className={" w-full h-full object-cover object-contain "}>
									<SanityImage
										image={block.image}
										width={1000}
										height={1000}
										priority={true}
										alt={`Cover Image for ${block.title}`}
										classesWrapper="h-full w-full"
										theme={className}
									/>
								</div>
							</div>
						)}
						<div className="w-full lg:w-1/2 p-2 pr-4 lg:pr-20 flex pt-2 lg:pt-4 justify-center flex-cols ">
							<div className="w-full ">
								<div className="w-full hidden justify-between items-center lg:flex mb-6">
									{block.category && (
										<RenderCategory category={block.category} />
									)}

									<FormattedDate
										date={publicationDate}
										className={`${monomaniac.className} uppercase bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text w-auto text-xs tracking-widest`}
									/>
								</div>
								<Heading
									heading={block.heading}
									className={`${space.className} p-1 text-[10vw] lg:text-[4vw] font-bold uppercase leading-none cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text`}
								/>
								<SubHeading
									heading={block.subheading}
									className={`${space.className} p-1 text-xl leading-tight bg-gradient-to-r from-blue-100/80 to-blue-100/70 text-transparent bg-clip-text`}
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
			return (
				<div className="w-full h-auto bg-gray-200 pt-20 lg:pt-32">
					{/* Light theme layout */}
				</div>
			);
		case "transparent":
			return (
				<div className="w-full h-auto bg-transparent pt-20 lg:pt-32">
					{/* Transparent theme layout */}
				</div>
			);
		default:
			return (
				<div className="w-full h-auto pt-16 lg:pt-32">
					<div className="w-full flex justify-center flex-wrap">
						<div
							className={
								"w-11/12 flex flex-wrap   flex-cols items-center justify-between lg:hidden"
							}
						>
							{block.category && <RenderCategory category={block.category} />}
							<FormattedDate
								date={publicationDate}
								className={`${monomaniac.className} ml-2 my-1 uppercase w-auto text-xs bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text  tracking-widest`}
							/>
						</div>

						{block.image && (
							<div className="w-full flex-wrap lg:w-1/2 p-2 flex">
								<div className={" w-full h-full object-cover object-contain "}>
									<SanityImage
										image={block.image}
										width={1000}
										height={1000}
										priority={true}
										alt={`Cover Image for ${block.title}`}
										classesWrapper="h-full w-full"
										theme={className}
									/>
								</div>
							</div>
						)}
						<div className="w-full lg:w-1/2 p-2 pr-4 lg:pr-20 flex pt-2 lg:pt-4 justify-center flex-cols">
							<div className="w-full">
								<div className="w-full hidden justify-between items-center lg:flex mb-6">
									{block.category && (
										<RenderCategory category={block.category} />
									)}
									<FormattedDate
										date="2023-01-30"
										className={`${monomaniac.className} uppercase bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text w-auto text-xs tracking-widest`}
									/>
								</div>
								<Heading
									heading={block.heading}
									className={`${space.className} p-1 text-[9vw] lg:text-[4vw] font-bold uppercase leading-none cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text`}
								/>
								<SubHeading
									heading={block.subheading}
									className={`${space.className} p-1 text-xl leading-tight bg-gradient-to-r from-blue-100/50 to-blue-100/50 text-transparent bg-clip-text`}
								/>
								<div className="w-full ">
									<TeamSection team={block.team} theme={className} />
								</div>
							</div>
						</div>
					</div>
				</div>
			);
	}
};

export default React.memo(HeadingBlock);
