"use client";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import MainCategories from "../MainCategories";
import { useInteractiveContext } from "../context/InteractiveContext";
import CustomCamera from "./CustomCamera";
import { MainStation } from "./MainStation";

import SciFiStation from "./SciFiStation";

const AllStations = ({ categories }) => {
	const { cameraState } = useInteractiveContext(); // Access camera state from context

	return (
		<Canvas style={{ height: "100vh", width: "100vw", color: "black" }}>
			<CustomCamera cameraState={cameraState} />
			<Environment preset="sunset" />
			<MainStation />
			<SciFiStation />
			<MainCategories category={categories} />
		</Canvas>
	);
};

export default AllStations;
