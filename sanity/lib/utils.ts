import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "@/sanity/lib/api";

const imageBuilder = createImageUrlBuilder({
	projectId: projectId || "",
	dataset: dataset || "",
});

export const urlForImage = (source: Image | undefined) => {
	// Ensure that source image contains a valid reference
	if (!source?.asset?._ref) {
		return undefined;
	}

	return imageBuilder?.image(source).auto("format").fit("max");
};

export const fileUrlFor = (ref: string) => {
	const parts = ref.split("-");
	const fileId = parts[1];
	const fileExtension = parts[parts.length - 1];

	return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${fileExtension}`;
};

export function urlForOpenGraphImage(image: Image | undefined) {
	return urlForImage(image)?.width(1200).height(627).fit("crop").url();
}

export function resolveHref(
	documentType?: string,
	slug?: string,
): string | undefined {
	switch (documentType) {
		case "home":
			return "/";
		case "project":
			return slug ? `/projects/${slug}` : undefined;
		case "posts":
			return slug ? `/posts/${slug}` : undefined;
		case "videos":
			return slug ? `/videos/${slug}` : undefined;
		case "team":
			return slug ? `/team/${slug}` : undefined;

		default:
			console.warn("Invalid document type:", documentType);
			return undefined;
	}
}
