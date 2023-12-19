"use client";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import { jura, staatliches } from "@/fonts";
import { useState } from "react";

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
	const imageUrl =
		image && urlForImage(image)?.height(height).width(width).fit("crop").url();

	return (
		<div
			className={`w-full overflow-hidden ${classesWrapper}`}
			data-sanity={props["data-sanity"]}
		>
			{isLoading && <LoadingIndicator />}
			{imageUrl && (
				<Image
					priority={priority}
					className="object-cover cover h-full w-full"
					alt={alt}
					width={width}
					height={height}
					src={imageUrl}
					onLoad={() => setIsLoading(false)}
				/>
			)}
		</div>
	);
}
const LoadingIndicator = () => (
	<div className="flex items-center justify-center w-full h-full">
		<div className="flex flex-col items-center justify-center">
			<div className="animate-pulse w-16 h-10 bg-gray-300 rounded" />
			<p
				className={`${staatliches.className} text-gray-400 font-mono text-sm uppercase tracking-widest mt-2`}
			>
				Loading...
			</p>
		</div>
	</div>
);
