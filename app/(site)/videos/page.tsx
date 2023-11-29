import { loadVideos } from '@/sanity/loader/loadQuery';
import { VideoList } from '@/components/global/Videos';

export default async function VideoPage() {
   const videos = await loadVideos();

   return (
      <div className="flex w-full">
         <VideoList video={videos} />
      </div>
   );
}
