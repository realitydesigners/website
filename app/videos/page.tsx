import { CanvasVideoList } from "@/components/global/CanvasVideoList";
import { VideoList } from "@/components/global/VideoList";
import { sanityFetch } from "@/sanity/lib/client";
import { getVideosQuery } from "@/sanity/lib/queries";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";
import { VideoPayload } from "@/types";
import { CameraControls, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";

export default async function VideoPage() {
	const videos: VideoPayload[] = await sanityFetch({
		query: getVideosQuery,
		tags: ["video"],
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
