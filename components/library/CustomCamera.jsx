"use client";
import { useInteractiveContext } from "@/components/context/InteractiveContext";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

const CustomCamera = () => {
	const { cameraState } = useInteractiveContext();
	const controls = useRef();
	const { camera, gl } = useThree();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		camera.position.set(...cameraState.position);
		camera.rotation.set(...cameraState.rotation);
		controls.current.target.set(0, 0, 0);
		controls.current.update();
	}, [camera, cameraState.position, cameraState.rotation, gl.domElement]);

	console.log("Camera State:", cameraState);

	return (
		<>
			<OrbitControls
				ref={controls}
				args={[camera, gl.domElement]}
				dampingFactor={0.25}
				rotateSpeed={0.5}
				enablePan={false}
				enableZoom={true}
				enableRotate={true}
			/>
			<PerspectiveCamera
				makeDefault
				position={cameraState.position}
				rotation={cameraState.rotation}
				zoom={0.7}
			/>
		</>
	);
};

export default CustomCamera;
