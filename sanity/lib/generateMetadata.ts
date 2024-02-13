// utils/generateMetadata.js
import { sanityFetch } from "@/sanity/lib/client";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";

export async function generateMetadata({ query, params, extractor }, parent) {
	const metadataBaseUrl =
		process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000";
	const data = await sanityFetch({
		query,
		qParams: { slug: params.slug },
		tags: [params.tag], // Adjust if necessary
	});

	// Extract title, description, and image using the extractor function
	const { title, description, image } = extractor(data);

	const ogImage = urlForOpenGraphImage(image);
	const metadataBase = new URL(metadataBaseUrl);

	return {
		title,
		description: description || parent.description,
		openGraph: ogImage
			? {
					images: [ogImage, ...(parent.openGraph?.images || [])],
			  }
			: {},
		metadataBase,
	};
}
