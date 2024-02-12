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
				<div className="bg-black h-auto w-full flex lg:flex-cols flex-row flex-wrap items-start justify-center pt-24">
					<div className="w-full lg:w-1/6 h-24 lg:h-screen p-2 hidden lg:block" />
					<div className="w-full lg:w-4/6 h-auto flex flex-col justify-center">
						{videoUrl && (
							<div className="p-4">
								{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
								<video
									controls
									autoPlay={false}
									className="w-full h-[50vw] lg:h-[33vw] border-gray-600 border rounded-lg overflow-hidden"
								>
									<source src={videoUrl} type="video/mp4" />
									Your browser does not support this video player
								</video>
								<p
									className={`${monomaniac.className} uppercase text-4xl my-2 tracking-wide pt-4 text-gray-200 font-bold`}
								>
									{title}
								</p>
							</div>
						)}
						<div className="w-full flex justify-center bg-gray-200">
							{blocks.map((block) => (
								<Blocks block={block as BlockProps} />
							))}
						</div>
					</div>
					<div className="w-full lg:w-1/6 h-screen p-2" />
				</div>
			)}
		</>
	);
}
