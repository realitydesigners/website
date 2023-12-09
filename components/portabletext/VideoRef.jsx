import { jura, staatliches } from '@/fonts';

const VideoRefWrapper = ({ value }) => {
   const { videoRefData, className } = value;

   if (!videoRefData) {
      return <p>Video file not found.</p>;
   }

   const videoFileUrl = videoRefData?.videoFileUrl;
   const videoTitle = videoRefData?.videoTitle;

   if (!videoFileUrl) {
      return <p>Video URL is not available.</p>;
   }

   switch (className) {
      case 'card-1':
         return (
            <div className="flex justify-center w-full mb-6">
               <div className=" w-full lg:w-3/4 ">
                  <video
                     controls
                     className="w-full h-auto rounded-x bg-black shadow-xl " // Ensure responsiveness and rounded corners at top
                  >
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
                  <video controls>
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
                  <video
                     controls
                     className="w-full h-auto rounded-x bg-black shadow-xl " // Ensure responsiveness and rounded corners at top
                  >
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
