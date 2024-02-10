"use client";
import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
	useThree,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import MainCategories from "../MainCategories";
import { useInteractiveContext } from "../context/InteractiveContext";
import { MainStation } from "./MainStation";

import SciFiStation from "./SciFiStation";

const AllStations = ({ categories }) => {
	const { cameraState } = useInteractiveContext();

	return (
		<Canvas style={{ height: "100vh", width: "100vw", color: "black" }}>
			<PerspectiveCamera
				makeDefault
				position={cameraState.position}
				rotation={cameraState.rotation}
				zoom={0.8}
			/>
			<OrbitControls />
			<hemisphereLight />
			<Environment preset="sunset" />
			<MainStation />
			<SciFiStation />
			<MainCategories category={categories} />
		</Canvas>
	);
};

export default AllStations;
