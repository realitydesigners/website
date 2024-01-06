"use client";
import { SanityImage } from "@/components/global/Images";
import Link from "next/link";
import React from "react";

// Define default constants
const DEFAULT_IMAGE =
	"relative justify-center rounded-[1.2em] overflow-hidden items-center flex h-auto w-full lg:w-3/4";
const DEFAULT_SANITY_IMAGE_WRAPPER =
	"h-[325px] md:h-[600px] lg:h-[800px] w-full object-cover";
const DEFAULT_ARTIST_INFO =
	"relative pt-4 bottom-0 flex h-auto w-full pl-4 lg:w-3/4";
const DEFAULT_TEXT_COLOR = "text-black";
const INSET = "border border-t border-gray-600";
const INSET_ARTIST =
	"rounded-b-[1.2em] pl-2 -mt-[60px] pb-3 pt-1 bg-gradient-to-t from-black to-transparent";
const ARTIST_IMAGE_WRAPPER =
	"mr-2 max-h-[30px] max-w-[30px] rounded-full border";
const ARTIST_NAME_LINK = "font-mono font-bold text-md";
const ARROW = "ml-2 inline-block cursor-pointer text-md font-bold";
const IMAGE_REF_CARD = "flex justify-center items-center flex-col p-4";
const ARTIST_ROW =
	"flex flex-col items-start justify-center text-xs uppercase leading-none";

const ImageDisplay = ({ image, alt, isInset }) => {
	const insetStyles = isInset ? INSET : "";
	return (
		<div className={`${DEFAULT_IMAGE} ${insetStyles}`}>
			<SanityImage
				image={image}
				width={2000}
				height={2000}
				priority={false}
				alt={`Cover Image for ${alt}`}
				classesWrapper={DEFAULT_SANITY_IMAGE_WRAPPER}
			/>
		</div>
	);
};

const ArtistInfo = ({ artist, textColor = DEFAULT_TEXT_COLOR, isInset }) => {
	const insetStyles = isInset ? INSET_ARTIST : "";
	return (
		<div className={`${DEFAULT_ARTIST_INFO} ${textColor} ${insetStyles}`}>
			<SanityImage
				image={artist.image}
				alt={`Cover Image for ${artist.name}`}
				width={100}
				height={100}
				priority={false}
				classesWrapper={ARTIST_IMAGE_WRAPPER}
			/>
			<div className={ARTIST_ROW}>
				<Link
					href={`/team/${artist.slug.current}`}
					className={ARTIST_NAME_LINK}
				>
					{artist.name}
				</Link>
			</div>
			<p className={ARROW}>→</p>
		</div>
	);
};

const ImageRefCard = ({ title, image, className, theme }) => {
	let textColor = DEFAULT_TEXT_COLOR;
	let isInset = false;

	switch (className) {
		case "image-standard":
			textColor = "text-black";
			isInset = false;
			break;
		case "image-standard-dark":
			textColor = "text-gray-200";
			isInset = false;
			break;
		case "image-inset":
			textColor = "text-white";
			isInset = true;
			break;
		default:
			return null;
	}

	return (
		<div className={IMAGE_REF_CARD}>
			<ImageDisplay image={image.image} alt={title} isInset={isInset} />
			{image?.team && (
				<ArtistInfo
					artist={image.team}
					textColor={textColor}
					isInset={isInset}
				/>
			)}
		</div>
	);
};

const ImageRefBlock = ({ value }) => {
	const { image, className, theme = "light" } = value;

	return (
		<div className={className}>
			<ImageRefCard
				title={image.title}
				image={image}
				className={className}
				theme={theme}
			/>
		</div>
	);
};

export default React.memo(ImageRefBlock);
