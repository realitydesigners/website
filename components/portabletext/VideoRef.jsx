import { jura, staatliches } from '@/fonts';
import { urlForImage } from '@/sanity/lib/utils';

const VideoRefWrapper = ({ value }) => {
   const { videoRef, className, image } = value;

   if (!videoRef) {
      return <p>Video file not found.</p>;
   }

   const videoFileUrl = videoRef?.videoFileUrl;
   const videoTitle = videoRef?.videoTitle;
   const videoThumbnail = videoRef?.image?.asset?.url;

   if (!videoFileUrl) {
      return <p>Video URL is not available.</p>;
   }

   switch (className) {
      case 'card-1':
         return (
            <div className="flex justify-center w-full mb-6">
               <div className=" w-full lg:w-3/4 ">
                  <video controls poster={videoThumbnail} autoPlay={true} className="w-full h-auto ">
                     <source src={videoFileUrl} type="video/mp4" />
                     Your browser does not support the video tag.
                  </video>
                  <p className={`${staatliches.className} ml-2 uppercase text-4xl text-center tracking-wide pt-4 font-mono text-black font-bold`}>{videoTitle}</p>
               </div>
            </div>
         );
      case 'card-2':
         return (
            <div className="flex justify-center w-full mb-6">
               <div className=" w-full lg:w-3/4 ">
                  <video controls poster={videoThumbnail} autoPlay={true} className="w-full h-auto ">
                     <source src={videoFileUrl} type="video/mp4" />
                     Your browser does not support the video tag.
                  </video>
                  <p className={`${staatliches.className} ml-2 uppercase text-4xl text-center tracking-wide pt-4 font-mono text-gray-200 font-bold`}>{videoTitle}</p>
               </div>
            </div>
         );
      default:
         return (
            <div className="flex justify-center w-full mb-6">
               <div className=" w-full lg:w-3/4 ">
                  <video controls poster={videoThumbnail} className="w-full h-auto rounded-x bg-black shadow-xl ">
                     <source src={videoFileUrl} type="video/mp4" />
                     Your browser does not support the video tag.
                  </video>
                  <p className={`${staatliches.className} ml-2 uppercase text-4xl text-center tracking-wide pt-4 font-mono text-black font-bold`}>{videoTitle}</p>
               </div>
            </div>
         );
   }
};

export default VideoRefWrapper;
