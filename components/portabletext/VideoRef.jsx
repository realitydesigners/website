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
            <div className="flex justify-center w-full p-0 lg:p-8 mb-8">
               <div className=" w-full lg:w-3/4 bg-black p-4 rounded-none lg:rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <video
                     controls
                     className="w-full h-auto rounded-xl" // Ensure responsiveness and rounded corners at top
                  >
                     <source src={videoFileUrl} type="video/mp4" />
                     Your browser does not support the video tag.
                  </video>
                  <p className=" ml-2 uppercase text-sm tracking-wide pt-4 font-mono text-white font-bold ">{videoTitle}</p>
               </div>
            </div>
         );
      case 'card-2':
         return (
            <div className="video-container mb-8 ">
               <video controls>
                  <source src={videoFileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
               </video>
               <p className="card-2-title">{videoTitle}</p>
            </div>
         );
      default:
         return (
            <div className="video-container mb-8">
               <video controls>
                  <source src={videoFileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
               </video>
               <p>{videoTitle}</p>
            </div>
         );
   }
};

export default VideoRefWrapper;
