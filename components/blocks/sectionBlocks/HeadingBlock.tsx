"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac, play, space } from "@/fonts";
import Link from "next/link";
import React from "react";

const getPublicationDate = (block) => {
	let publicationDate = block.publicationDate;
	if (!publicationDate && block.block) {
		const blockWithDate = block.block.find(
			(blockItem) => blockItem.publicationDate,
		);
		if (blockWithDate) {
			publicationDate = blockWithDate.publicationDate;
		}
	}
	return publicationDate
		? new Date(publicationDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
		  })
		: "Date not available";
};

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

const TeamSection = ({ team, theme }) => {
	if (!team) return null;

	return (
		<div className="w-auto h-auto flex items-center pt-4">
			<Link
				href={`/team/${team.slug.current}`}
				className={`${monomaniac.className}`}
			>
				<div className="flex items-center p-2 w-full">
					{team.image && (
						<div className="flex items-center">
							<SanityImage
								image={team.image}
								alt={`Team member image for ${team.name}`}
								width={100}
								height={100}
								priority={true}
								classesWrapper="h-[40px] w-[40px] object-cover cover rounded-[2em]"
								theme={theme} // Pass theme to SanityImage
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
	const { className } = block;
	const formattedDate = getPublicationDate(block);
	const theme = block.className;

	switch (theme) {
		case "dark":
			return (
				<div className={"w-full h-auto pt-16 lg:pt-32"}>
					<div className="w-full flex justify-center flex-wrap">
						<div
							className={
								"w-11/12 flex flex-wrap   flex-cols items-center justify-between lg:hidden"
							}
						>
							{block.category && <RenderCategory category={block.category} />}
							<span
								className={`${monomaniac.className} ml-2 my-1 uppercase w-auto text-xs bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text  tracking-widest`}
							>
								POSTED ON {formattedDate}
							</span>
						</div>

						{block.image && (
							<div className="w-full flex-wrap lg:w-1/2 p-4 flex">
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
						<div className="w-full lg:w-1/2 p-4 pr-4 lg:pr-20 flex pt-2 lg:pt-4 justify-center flex-cols">
							<div className="w-full">
								<div className="w-full hidden justify-between items-center lg:flex mb-6">
									{block.category && (
										<RenderCategory category={block.category} />
									)}
									<span
										className={`${monomaniac.className} uppercase bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text w-auto text-xs tracking-widest`}
									>
										POSTED {formattedDate}
									</span>
								</div>
								{block.heading && (
									<h1
										className={`${space.className} p-1 text-[9vw] lg:text-[4vw] font-bold uppercase leading-none cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text`}
									>
										{block.heading}
									</h1>
								)}
								{block.subheading && (
									<p
										className={`${space.className} p-1 text-xl leading-tight  bg-gradient-to-r from-blue-100/50 to-blue-100/50 text-transparent bg-clip-text `}
									>
										{block.subheading}
									</p>
								)}
								<TeamSection team={block.team} theme={className} />
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
				<div className={"w-full h-auto pt-16 lg:pt-32"}>
					<div className="w-full flex justify-center flex-wrap">
						<div
							className={
								"w-11/12 flex flex-wrap   flex-cols items-center justify-between lg:hidden"
							}
						>
							{block.category && <RenderCategory category={block.category} />}
							<span
								className={`${monomaniac.className} ml-2 my-1 uppercase w-auto text-xs bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text  tracking-widest`}
							>
								POSTED ON {formattedDate}
							</span>
						</div>

						{block.image && (
							<div className="w-full flex-wrap lg:w-1/2 p-4 flex">
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
						<div className="w-full lg:w-1/2 p-4 pr-4 lg:pr-20 flex pt-2 lg:pt-4 justify-center flex-cols">
							<div className="w-full">
								<div className="w-full hidden justify-between items-center lg:flex mb-6">
									{block.category && (
										<RenderCategory category={block.category} />
									)}
									<span
										className={`${monomaniac.className} uppercase bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text w-auto text-xs tracking-widest`}
									>
										POSTED {formattedDate}
									</span>
								</div>
								{block.heading && (
									<h1
										className={`${space.className} p-1 text-[9vw] lg:text-[4vw] font-bold uppercase leading-none cursor-pointer bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text`}
									>
										{block.heading}
									</h1>
								)}
								{block.subheading && (
									<p
										className={`${space.className} p-1 text-xl leading-tight  bg-gradient-to-r from-blue-100/50 to-blue-100/50 text-transparent bg-clip-text `}
									>
										{block.subheading}
									</p>
								)}
								<TeamSection team={block.team} theme={className} />
							</div>
						</div>
					</div>
				</div>
			);
	}
};

export default React.memo(HeadingBlock);
