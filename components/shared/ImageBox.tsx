import Image from "next/image";

import { urlForImage } from "@/sanity/lib/utils";

interface ImageBoxProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	image?: { asset?: any };
	alt?: string;
	width?: number;
	height?: number;
	size?: string;
	classesWrapper?: string;
	"data-sanity"?: string;
}

export default function ImageBox({
	image,
	alt = "Cover image",
	width = 1500,
	height = 1000,
	size = "100vw",
	classesWrapper,
	...props
}: ImageBoxProps) {
	const imageUrl =
		image && urlForImage(image)?.height(height).width(width).fit("crop").url();

	return (
		<div
			className={`w-full overflow-hidden ${classesWrapper}`}
			data-sanity={props["data-sanity"]}
		>
			{imageUrl && (
				<Image
					priority={true}
					className="object-cover cover h-full w-full"
					alt={alt}
					width={width}
					height={height}
					sizes={size}
					src={imageUrl}
				/>
			)}
		</div>
	);
}
