import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Define the type for Theme and the Record for loading background colors
type Theme = "light" | "dark";

type LoadingBgColors = Record<Theme, string>;

const loadingBgColors: LoadingBgColors = {
	light: "bg-gray-300",
	dark: "bg-gray-600/20", // Adjust this value as needed for the dark theme
};

type SanityImageProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	image: any; // Replace with the correct type
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
	theme = "light",
}: SanityImageProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const imageUrl =
		image && urlForImage(image)?.height(height).width(width).fit("crop").url();

	// Use the record to get the loading background color
	const loadingBgColor = loadingBgColors[theme];

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	return (
		<div className={`relative w-full overflow-hidden ${classesWrapper}`}>
			{isLoading && !hasError && <LoadingIndicator bgColor={loadingBgColor} />}
			{imageUrl && !hasError && (
				<Image
					priority={priority}
					className="object-cover cover h-full w-full"
					alt={alt || "A cool image"}
					width={width || undefined}
					height={height || undefined}
					src={imageUrl}
					onLoad={handleImageLoad}
				/>
			)}
			{hasError && <p>Image failed to load.</p>}
		</div>
	);
}

const LoadingIndicator = ({ bgColor }: { bgColor: string }) => (
	<div
		className={`absolute inset-0 flex items-center justify-center ${bgColor}`}
	>
		<div className="animate-pulse w-full h-full rounded" />
	</div>
);

export default SanityImage;
