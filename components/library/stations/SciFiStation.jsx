import { useLoader } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const SciFiStation = () => {
	const meshRef = useRef(null);
	const gltf = useLoader(GLTFLoader, "models/cubes.glb");

	return (
		<primitive
			ref={meshRef}
			object={gltf.scene}
			scale={[20, 20, 20]}
			position={[-30, -175, 30]}
		/>
	);
};

export default SciFiStation;
