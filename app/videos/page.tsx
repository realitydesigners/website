import { CanvasVideoList } from "@/components/global/CanvasVideoList";
import { VideoList } from "@/components/global/VideoList";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { getVideosQuery } from "@/sanity/lib/queries";
import { VideoPayload } from "@/types";

type Props = {
	params: { slug: string };
};

export function generateStaticParams() {
	return generateStaticSlugs("video");
}
export default async function VideoPage({ params }: Props) {
	const videos: VideoPayload[] = await sanityFetch({
		query: getVideosQuery,
		tags: ["video"],
		qParams: { slug: params },
	});
	return (
		<div className="flex w-full h-auto flex-cols flex-wrap">
			<VideoList videos={videos} />
			<div className="w-full h-full bg-gray-300 hidden">
				{" "}
				<CanvasVideoList videos={videos} />
			</div>
		</div>
	);
}
