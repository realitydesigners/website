"use client";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Define the type for Theme and the Record for loading background colors
type Theme = "light" | "dark" | "transparent";

type LoadingBgColors = Record<Theme, string>;

const loadingBgColors: LoadingBgColors = {
	light: "bg-gray-300/50",
	dark: "bg-gradient-to-r from-blue-200/10 to-blue-200/5 animate-pulse ",
	transparent: "",
};

type SanityImageProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	image: any;
	alt: string;
	width: number;
	height: number;
	classesWrapper: string;
	priority?: boolean;
	theme?: Theme;
};
export function SanityImage({
	image,
	alt,
	width,
	height,
	classesWrapper,
	priority = false,
	theme = "transparent",
}: SanityImageProps) {
	const [isLoading, setIsLoading] = useState(true);
	const imageUrl =
		image && urlForImage(image)?.height(height).width(width).fit("crop").url();
	const loadingBgColor = loadingBgColors[theme];

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	return (
		<div className={`relative w-full overflow-hidden ${classesWrapper}`}>
			{isLoading && <LoadingIndicator bgColor={loadingBgColor} />}
			{imageUrl && (
				<Image
					priority={priority}
					className="cover h-full w-full object-cover"
					alt={alt || "A cool image"}
					width={width || undefined}
					height={height || undefined}
					src={imageUrl}
					onLoad={handleImageLoad}
				/>
			)}
		</div>
	);
}

const LoadingIndicator = ({ bgColor }: { bgColor: string }) => (
	<div
		className={`absolute inset-0 flex items-center justify-center ${bgColor}`}
	>
		<div className="h-full w-full animate-pulse rounded" />
	</div>
);
