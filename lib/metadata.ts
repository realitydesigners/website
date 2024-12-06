import { Metadata, ResolvingMetadata } from "next";
import { sanityFetch } from "@/sanity/lib/client";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";

// Define a base interface for the block structure
interface BlockStructure {
  heading?: string;
  subheading?: string;
  imageRef?: {
    imageUrl?: string;
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

  console.log("Metadata Data:", { data });

  // Check if data uses block structure or direct fields
  const hasBlockStructure = data?.block?.[0];

  // Get title from block or direct field
  const title = hasBlockStructure 
    ? data?.block[0]?.heading 
    : data?.name || data?.title;

  // Get description from block or direct field
  const description = hasBlockStructure
    ? data?.block[0]?.subheading
    : data?.shortBio || data?.description;

  // Get image from block or direct field
  const imageRef = hasBlockStructure
    ? {
        imageUrl: data?.block[0]?.imageRef?.imageUrl,
        imageAlt: data?.block[0]?.imageRef?.imageAlt,
      }
    : data?.image;

  const ogImage = imageRef?.imageUrl || urlForOpenGraphImage(imageRef);
  const ogImageAlt = imageRef?.imageAlt || "Your default alt text";
Hi  const metadataBase = new URL(metadataBaseUrl);

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
