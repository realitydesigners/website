import { loadVideos } from "@/sanity/loader/loadQuery";
import { VideoList } from "@/components/global/Videos";

export default async function VideoPage() {
	const response = await loadVideos();
	const videos = response.data;

	return (
		<div className="flex w-full">
			<VideoList video={videos} />
		</div>
	);
}
