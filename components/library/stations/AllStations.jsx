"use client";

import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
	useThree,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import LibraryScene from "../LibraryScene";
import { useInteractiveContext } from "../context/InteractiveContext";
import { MainStation } from "./MainStation";
import Navigation from "./Navigation";
import SciFiStation from "./SciFiStation";

const AllStations = ({ categories }) => {
	const { moveTo, cameraState } = useInteractiveContext();
	const [currentCameraState, setCurrentCameraState] = useState(cameraState);

	useEffect(() => {
		setCurrentCameraState(cameraState); // Update currentCameraState when cameraState changes
	}, [cameraState]);
	return (
		<>
			<Canvas style={{ height: "100vh", width: "100vw", color: "black" }}>
				<PerspectiveCamera
					makeDefault
					position={currentCameraState.position}
					rotation={currentCameraState.rotation}
					zoom={0.8}
				/>
				<OrbitControls />
				<hemisphereLight />
				<Environment preset="sunset" />
				<MainStation />
				<SciFiStation />
				<LibraryScene category={categories} />
			</Canvas>
			<Navigation />
		</>
	);
};

export default AllStations;
