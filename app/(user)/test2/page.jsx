"use client";
import Navbar from "@/components/navigation/Navbar";
import React, { useRef } from "react";
import SplineScene from "./SplineScene";

const Home = () => {
  const sphere = useRef(null);

  function onLoad(spline) {
    const obj = spline.findObjectByName('Sphere');
    // save it in a ref for later use
    sphere.current = obj;
  }

  function moveObj() {
    if (sphere.current) {
      console.log(sphere.current); // Spline Object => { name: 'Sphere', id: '8E8C2DDD-18B6-4C54-861D-7ED2519DE20E', position: {}, ... }
      // move the object in 3D space
      sphere.current.position.x += 10000;
    }
  }

  return (
    <main className="w-screen h-screen">
      <Navbar />
      <div className="relative w-screen h-screen">
        <SplineScene onLoad={onLoad} />
        <button
          onClick={moveObj}
          className="absolute bottom-10 left-40 bg-green-500 text-white px-4 py-2 rounded"
        >
          Move Sphere
        </button>
      </div>
    </main>
  );
};

export default Home;
