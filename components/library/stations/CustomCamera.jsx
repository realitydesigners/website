"use client";
import { PerspectiveCamera } from "@react-three/drei";
import React, { useEffect } from "react";
import { useInteractiveContext } from "../context/InteractiveContext";

const CustomCamera = () => {
	const { cameraState } = useInteractiveContext();

	// Update camera position when cameraState changes
	useEffect(() => {
		console.log("Camera state changed:", cameraState);
	}, [cameraState]);

	return (
		<PerspectiveCamera
			makeDefault
			position={cameraState.position}
			rotation={cameraState.rotation}
			zoom={1}
		/>
	);
};

export default CustomCamera;
