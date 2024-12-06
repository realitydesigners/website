import { Metadata, ResolvingMetadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";

// Define a base interface for the block structure
interface BlockStructure {
  heading?: string;
  subheading?: string;
  imageRef?: {
    imageAlt?: string;
    [key: string]: any;
  };
}

// Define the possible data structures
interface BaseData {
  [key: string]: any;
  block?: BlockStructure[];
}

type MetadataParams = {
  query: string;
  slug: string;
  tags: string[];
  titleField?: string;
  descriptionField?: string;
  imageField?: string;
  imageAltField?: string;
};

export async function generatePageMetadata<T extends BaseData>(
  params: MetadataParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metadataBaseUrl =
    process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000";

  const data = await sanityFetch<T>({
    query: params.query,
    tags: params.tags,
    qParams: { slug: params.slug },
  });

  // Handle different data structures for posts and team
  const title = params.titleField
    ? data?.[params.titleField]
    : data?.block?.[0]?.heading;

  const description = params.descriptionField
    ? data?.[params.descriptionField]
    : data?.block?.[0]?.subheading;

  const imageRef = params.imageField
    ? data?.[params.imageField]
    : data?.block?.[0]?.imageRef;

  const imageAlt = params.imageAltField
    ? data?.[params.imageAltField]
    : data?.block?.[0]?.imageRef?.imageAlt;

  const ogImage = urlForOpenGraphImage(imageRef);
  const ogImageAlt = imageAlt || "Your default alt text";
  const metadataBase = new URL(metadataBaseUrl);

  return {
    title,
    description: description || (await parent).description,
    openGraph: ogImage
      ? {
          images: [
            {
              url: ogImage,
              alt: ogImageAlt,
            },
            ...((await parent).openGraph?.images || []),
          ],
        }
      : {},
    metadataBase,
  };
}
