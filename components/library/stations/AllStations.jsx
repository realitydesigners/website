"use client";
import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, pointLight } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { MainStation } from "./MainStation";

const AllStations = () => {
	return (
		<Canvas style={{ height: "100vh", width: "100vw" }}>
			<PerspectiveCamera makeDefault position={[80, 20, 80]} zoom={0.8} />
			<OrbitControls />
			<Environment preset="sunset" />

			<MainStation />
		</Canvas>
	);
};

export default AllStations;
