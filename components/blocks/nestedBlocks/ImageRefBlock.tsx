import { SanityImage } from "@/components/global/Images";
import Link from "next/link";
import React from "react";

import { ThemeProps } from "@/components/blocks/types";

const themeClasses: Record<string, ThemeProps> = {
	"image-standard": {
		textColor: "text-black",
		isInset: false,
	},
	"image-standard-dark": {
		textColor: "text-gray-200",
		isInset: false,
	},
	"image-inset": {
		textColor: "text-gray-200",
		isInset: true,
	},
};

const ImageDisplay = ({ image, alt, className }) => {
	const { isInset } = themeClasses[className] || themeClasses["image-standard"];
	const insetStyles = isInset ? "border border-t border-gray-600" : "";

	return (
		<div
			className={`relative justify-center rounded-[1.2em] overflow-hidden items-center flex h-auto w-full lg:w-3/4 ${insetStyles}`}
		>
			<SanityImage
				image={image}
				width={2000}
				height={2000}
				priority={false}
				alt={alt}
				classesWrapper="h-[325px] md:h-[600px] lg:h-[800px] w-full object-cover"
			/>
		</div>
	);
};

const ArtistInfo = ({ artist, className }) => {
	const { isInset, textColor } =
		themeClasses[className] || themeClasses["image-standard"];
	const insetStyles = isInset
		? "rounded-b-[1.2em] pl-2 -mt-[60px] pb-3 pt-1 bg-gradient-to-t from-black to-transparent"
		: "";

	return (
		<div
			className={`relative pt-4 bottom-0 flex h-auto w-full pl-4 lg:w-3/4 ${textColor} ${insetStyles}`}
		>
			<SanityImage
				image={artist.image}
				alt={`Cover Image for ${artist.name}`}
				width={100}
				height={100}
				priority={false}
				classesWrapper="mr-2 max-h-[30px] max-w-[30px] rounded-full border"
			/>
			<div className="flex flex-col items-start justify-center text-xs uppercase leading-none">
				<Link
					href={`/team/${artist.slug.current}`}
					className="font-mono font-bold text-md"
				>
					{artist.name}
				</Link>
			</div>
			<p className="ml-2 inline-block cursor-pointer text-md font-bold">→</p>
		</div>
	);
};

const ImageRefCard = ({ title, image, className }) => {
	return (
		<div className="flex justify-center items-center flex-col p-4">
			<ImageDisplay image={image.image} alt={title} className={className} />
			{image?.team && <ArtistInfo artist={image.team} className={className} />}
		</div>
	);
};

const ImageRefBlock = ({ image, className }) => {
	return (
		<div className={className}>
			<ImageRefCard title={image.title} image={image} className={className} />
		</div>
	);
};

export default React.memo(ImageRefBlock);
