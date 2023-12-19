"use client";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { useState, useEffect } from "react";

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

	// If the image fails to load, set an error flag
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
					width={width || undefined} // width and height can be undefined to let CSS handle sizing
					height={height || undefined}
					src={imageUrl}
					placeholder="empty" // This can be "blur" if you provide a blurDataURL
				/>
			)}
			{hasError && <p>Image failed to load.</p>}
		</div>
	);
}

const LoadingIndicator = () => (
	<div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
		<div className="animate-pulse w-16 h-10 bg-gray-300 rounded" />
		<p className="text-gray-400 font-mono text-sm uppercase tracking-widest mt-2">
			Loading...
		</p>
	</div>
);
