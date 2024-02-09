import { Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { useInteractiveContext } from "../context/InteractiveContext";

export const MainStation = () => {
	return (
		<group position={[-100, -25, 100]} scale={[2, 2, 2]}>
			<mesh position={[0, 0, -50]} rotation={[0, 0, 0]}>
				<boxGeometry args={[100, 10, 5]} />
				<meshStandardMaterial color="#333" />
			</mesh>
			<mesh position={[0, 0, 50]} rotation={[0, Math.PI, 0]}>
				<boxGeometry args={[100, 10, 5]} />
				<meshStandardMaterial color="#333" />
			</mesh>
			<mesh position={[-50, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
				<boxGeometry args={[100, 10, 5]} />
				<meshStandardMaterial color="#333" />
			</mesh>
			<mesh position={[50, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
				<boxGeometry args={[100, 10, 5]} />
				<meshStandardMaterial color="#333" />
			</mesh>

			<StationCircle position={[-50, 0, -50]} label="Station A" />
			<StationCircle position={[50, 0, -50]} label="Station B" />
			<StationCircle position={[-50, 0, 50]} label="Station C" />
			<StationCircle position={[50, 0, 50]} label="Station D" />
		</group>
	);
};

const StationCircle = ({ position, label }) => {
	const textRef = useRef(null);
	const { moveTo } = useInteractiveContext();
	const { camera } = useThree();

	const handleStationClick = () => {
		// Calculate the new camera position based on the clicked station circle's position
		const newPosition = [
			position[0] + offsetValueX, // Adjust the offset values as needed
			position[1] + offsetValueY,
			position[2] + offsetValueZ,
		];
		// Move the camera to the center of the clicked station circle
		moveTo(position, newPosition);
	};

	return (
		<>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<mesh position={position} onClick={handleStationClick}>
				<cylinderGeometry args={[20, 10, 10, 50]} />
				<meshStandardMaterial color="#333" />
			</mesh>
			<Text
				ref={textRef}
				position={[position[0], position[1] + 6, position[2]]}
				rotation={[0, 0, 0]}
				fontSize={1}
				font={"/Staatliches.ttf"}
				color="white"
				text={label}
			/>
		</>
	);
};

export default StationCircle;
