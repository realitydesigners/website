import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/types";
import { monomaniac } from "@/fonts";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { getVideoBySlugQuery } from "@/sanity/lib/queries";
import { fileUrlFor } from "@/sanity/lib/utils";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import type { PostsPayload, VideoPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import { useMemo } from "react";

type Props = {
	params: { slug: string };
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const metadataBaseUrl =
		process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000";
	const video = await sanityFetch<PostsPayload>({
		query: getVideoBySlugQuery,
		tags: ["video"],
		qParams: { slug: params.slug },
	});
	//@ts-ignore
	const ogImage = urlForOpenGraphImage(video?.block?.[0]?.image);
	const metadataBase = new URL(metadataBaseUrl);

	return {
		title: video?.block?.[0]?.heading,
		description: video?.block?.[0]?.subheading || (await parent).description,
		openGraph: ogImage
			? {
					images: [ogImage, ...((await parent).openGraph?.images || [])],
			  }
			: {},
		metadataBase,
	};
}

export default async function PageSlugRoute({ params }: Props) {
	const currentVideo = await sanityFetch<VideoPayload>({
		query: getVideoBySlugQuery,
		tags: ["video"],
		qParams: { slug: params.slug },
	});

	const videoUrl = currentVideo?.video?.asset
		? fileUrlFor(currentVideo.video.asset._ref)
		: "";

	const blocks = currentVideo?.block || [];

	const { title, video } = currentVideo || {};

	return (
		<>
			{currentVideo && (
				<div className="lg:flex-cols flex h-auto w-full flex-row flex-wrap items-start justify-center bg-black pt-24">
					<div className="hidden h-24 w-full p-2 lg:block lg:h-screen lg:w-1/6" />
					<div className="flex h-auto w-full flex-col justify-center lg:w-4/6">
						{videoUrl && (
							<div className="p-4">
								{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
								<video
									controls
									autoPlay={false}
									className="h-[50vw] w-full overflow-hidden rounded-lg border border-gray-600 lg:h-[33vw]"
								>
									<source src={videoUrl} type="video/mp4" />
									Your browser does not support this video player
								</video>
								<p
									className={`${monomaniac.className} my-2 pt-4 text-4xl font-bold uppercase tracking-wide text-gray-200`}
								>
									{title}
								</p>
							</div>
						)}
						<div className="flex w-full justify-center bg-gray-200">
							{blocks.map((block) => (
								<Blocks block={block as BlockProps} />
							))}
						</div>
					</div>
					<div className="h-screen w-full p-2 lg:w-1/6" />
				</div>
			)}
		</>
	);
}
