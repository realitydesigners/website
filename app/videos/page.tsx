import { loadVideos } from "@/sanity/loader/loadQuery";
import { VideoList } from "@/components/global/VideoList";
import { CanvasVideoList } from "@/components/global/CanvasVideoList";
import { CameraControls, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { generateStaticSlugs } from "@/sanity/loader/generateStaticSlugs";

export default async function VideoPage() {
	const response = await loadVideos();
	const videos = response.data;

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
