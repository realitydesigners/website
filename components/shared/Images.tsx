import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";

export function SlugPostImage({
	image,
	alt = "Cover image",
	width = 1500,
	height = 1500,
	classesWrapper,
	...props
}) {
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
					src={imageUrl}
				/>
			)}
		</div>
	);
}

export function PostImage({
	image,
	alt = "Cover image",
	width = 800,
	height = 800,
	classesWrapper,
	...props
}) {
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
					src={imageUrl}
				/>
			)}
		</div>
	);
}

export function ImageBox({
	image,
	alt = "Cover image",
	width = 800,
	height = 800,
	classesWrapper,
	...props
}) {
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
					src={imageUrl}
				/>
			)}
		</div>
	);
}

export function TeamImageBox({
	image,
	alt = "Cover image",
	width = 100,
	height = 100,
	classesWrapper,
	...props
}) {
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
					src={imageUrl}
				/>
			)}
		</div>
	);
}
