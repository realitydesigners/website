"use client";
import { SanityImage } from "@/components/global/Images";
import { cairo, monomaniac } from "@/fonts";
import Link from "next/link";
import React from "react";

type Theme = "light" | "dark";
type ThemeStyle = {
	textColor: string;
	containerBg: string;
	tagBg: string;
	tagText: string;
};

const themeClasses: Record<Theme, ThemeStyle> = {
	light: {
		containerBg: "bg-gray-200",
		textColor: "text-black",
		tagBg: "bg-black",
		tagText: "text-gray-200",
	},
	dark: {
		containerBg: "bg-black",
		textColor: "text-gray-200",
		tagBg: "bg-gray-200",
		tagText: "text-black",
	},
};

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

const renderTags = (tags, tagBg, tagText) =>
	tags &&
	tags.length > 0 && (
		<div className="flex flex-wrap gap-2">
			{tags.map((tag, index) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={index}
					className={`${monomaniac.className} text-xs h-auto flex uppercase font-mono font-semibold ${tagBg} items-center justify-center p-1 pl-2 pr-2 tracking-widest ${tagText} `}
				>
					{tag}
				</span>
			))}
		</div>
	);

const TeamSection = ({ team, theme }) => {
	// Use theme prop instead of textColor
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
								classesWrapper="h-[50px] w-[50px] object-cover cover rounded-[2em]"
								theme={theme} // Pass theme to SanityImage
							/>
							<span
								className={`ml-2 uppercase tracking-wide text-sm ${themeClasses[theme].textColor}`}
							>
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
	if (block?._type !== "headingBlock") {
		return null;
	}

	const { className } = block;
	const style = themeClasses[className];
	const formattedDate = getPublicationDate(block);

	return (
		<div className={`w-full h-auto ${style.containerBg} pt-20 lg:pt-32`}>
			<div className="w-full flex justify-center flex-wrap">
				<div
					className={`w-11/12 flex items-center justify-between lg:hidden ${style.textColor}`}
				>
					<span
						className={`${monomaniac.className} ml-2 uppercase w-auto text-xs font-mono tracking-widest`}
					>
						PUBLISHED ON {formattedDate}
					</span>
					{renderTags(block.tags, style.tagBg, style.tagText)}
				</div>

				{block.image && (
					<div className="w-full flex-wrap lg:w-1/2 p-4 flex">
						<div className="w-full h-full object-cover object-contain">
							<SanityImage
								image={block.image}
								width={1000}
								height={1000}
								priority={true}
								alt={`Cover Image for ${block.title}`}
								classesWrapper="h-full w-full rounded-[1em]"
								theme={className}
							/>
						</div>
					</div>
				)}
				<div className="w-full lg:w-1/2 p-4 pr-4 lg:pr-20 flex pt-2 lg:pt-4 justify-center flex-cols">
					<div className="w-full">
						<div
							className={`w-full hidden justify-between items-center lg:flex mb-6 ${style.textColor}`}
						>
							<span
								className={`${monomaniac.className} font-mono w-auto text-xs tracking-widest`}
							>
								PUBLISHED ON {formattedDate}
							</span>
							{renderTags(block.tags, style.tagBg, style.tagText)}
						</div>
						{block.heading && (
							<h1
								className={`${monomaniac.className} text-5xl ${style.textColor} capitalize leading-tightest mb-4 lg:text-6xl`}
							>
								{block.heading}
							</h1>
						)}
						{block.subheading && (
							<p
								className={`${cairo.className} w-full text-2xl ${style.textColor} leading-7 tracking-wide`}
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
};

export default React.memo(HeadingBlock);
