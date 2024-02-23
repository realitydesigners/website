"use client";
import { SanityImage } from "@/components/global/Images";
import { Image } from "@/types"; // Corrected the quotes
import React, { FC } from "react";

export const ImageItem: FC<{ image: Image }> = ({ image }) => {
	return (
		<div className=" h-full w-full rounded-[1em] border border-gray-600/50 p-2">
			{image && (
				<div className="relative">
					<SanityImage
						width={800}
						height={800}
						priority={true}
						image={image.image}
						alt="image"
						classesWrapper="w-full h-full bg-black object-cover object-contain rounded-[.7em]"
					/>
				</div>
			)}
		</div>
	);
};

export default ImageItem;
