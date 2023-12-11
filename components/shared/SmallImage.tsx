import Image from "next/image";

import { urlForImage } from "@/sanity/lib/utils";

interface ImageBoxProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	image?: { asset?: any };
	alt?: string;
	width?: number;
	height?: number;
	classesWrapper?: string;
	"data-sanity"?: string;
}

export default function SmallImage({
	image,
	alt = "Cover image",
	width = 600,
	height = 600,
	classesWrapper,
	...props
}: ImageBoxProps) {
	const imageUrl =
		image && urlForImage(image)?.height(height).width(width).fit("crop").url();

	return (
		<div
			className={`w-full h-full overflow-hidden ${classesWrapper}`}
			data-sanity={props["data-sanity"]}
		>
			{imageUrl && (
				<Image
					priority={true}
					className="object-cover cover h-full w-full"
					alt={alt}
					width={width}
					height={height}
					src={imageUrl}
				/>
			)}
		</div>
	);
}
