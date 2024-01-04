"use client";
import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export function SanityImage({
	image,
	alt,
	width,
	height,
	classesWrapper,
	priority,
	...props
}) {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const imageUrl =
		image && urlForImage(image)?.height(height).width(width).fit("crop").url();

	useEffect(() => {
		if (imageUrl) {
			const img = document.createElement("img");
			img.src = imageUrl;
			img.onload = () => setIsLoading(false);
			img.onerror = () => {
				setIsLoading(false);
				setHasError(true);
			};
		}
	}, [imageUrl]);

	return (
		<div
			className={`relative w-full overflow-hidden ${classesWrapper}`}
			data-sanity={props["data-sanity"]}
		>
			{isLoading && !hasError && <LoadingIndicator />}
			{imageUrl && !hasError && (
				<Image
					priority={priority}
					className="object-cover cover h-full w-full"
					alt={alt}
					width={width || undefined}
					height={height || undefined}
					src={imageUrl}
				/>
			)}
			{hasError && <p>Image failed to load.</p>}
		</div>
	);
}

const LoadingIndicator = () => (
	<div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
		<div className="animate-pulse w-full h-full bg-gray-400 rounded" />
	</div>
);
