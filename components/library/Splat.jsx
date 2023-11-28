import * as SPLAT from 'gsplat';
import React, { useEffect, useRef, useState } from 'react';

const SplatScene = ({ url }) => {
   const canvasRef = useRef(null);
   const [isLoading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      if (!canvasRef.current) return;

      const renderer = new SPLAT.WebGLRenderer(canvasRef.current);
      const scene = new SPLAT.Scene();
      const camera = new SPLAT.Camera();
      const controls = new SPLAT.OrbitControls(camera, canvasRef.current);
      let animationFrameId;

      async function loadScene() {
         try {
            await SPLAT.Loader.LoadAsync(url, scene, () => {});
            setLoading(false);
         } catch (e) {
            setError(e.message);
            setLoading(false);
         }

         const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
         };

         const frame = () => {
            controls.update();
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(frame);
         };

         window.addEventListener('resize', handleResize);
         handleResize();
         requestAnimationFrame(frame);

         return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
         };
      }

      loadScene();
   }, [url]);

   return (
      <div className="relative w-full h-full">
         <canvas ref={canvasRef} className="w-full h-full absolute top-0 left-0 z-0" />
         {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full  flex justify-center items-center text-white text-2xl z-10">
               <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
               </svg>
            </div>
         )}
         {!isLoading && error && <p className="text-red-500 text-center mt-4">{`Error loading scene: ${error}`}</p>}
      </div>
   );
};

export default SplatScene;
