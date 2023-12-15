const AudioPlayer = ({ audioTitle, audioFileUrl }) => {
   if (!audioFileUrl) {
      return <p>Audio file not found.</p>;
   }

   return (
      <div className="w-full flex justify-center">
         <div className="mb-8 w-4/5 md:w-3/4 lg:w-1/2">
            <p className="mb-2 font-bold text-gray-200 p-2 hidden">{audioTitle}</p>
            {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
            <audio controls className="w-full" src={audioFileUrl}>
               Your browser does not support the audio element.
            </audio>
         </div>
      </div>
   );
};

export default AudioPlayer;
