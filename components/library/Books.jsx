"use client";
import { useLoader } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Books = ({ emissiveIntensity = 0.3 }) => {
	const meshRef = useRef(null);

	// Load the GLTF model
	const gltf = useLoader(GLTFLoader, "models/books.gltf");

	// Define the custom shader material
	const material = useMemo(() => {
		return new THREE.ShaderMaterial({
			vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }`,
			fragmentShader: `
                uniform float emissiveIntensity;
                varying vec2 vUv;

                float interferencePattern(float value) {
                    return mix(0.8, 1.0, sin(value * 1.0) * 0.1 + 0.1);
                }

                void main() {
                    float interferenceValue = interferencePattern(vUv.y * gl_FragCoord.y);
                    vec3 color = vec3(vUv.x, vUv.y, 1.0) * interferenceValue;
                    color *= emissiveIntensity;
                    gl_FragColor = vec4(color, 0.1); // Adjust alpha value here
                }`,
			uniforms: {
				emissiveIntensity: { value: emissiveIntensity },
			},
			transparent: true,
			blending: THREE.AdditiveBlending,
			side: THREE.DoubleSide,
		});
	}, [emissiveIntensity]);

	// Apply the custom material to the loaded model
	useEffect(() => {
		if (gltf) {
			gltf.scene.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.material = material;
				}
			});
		}
	}, [gltf, material]);

	useEffect(() => {
		if (material.uniforms.emissiveIntensity) {
			material.uniforms.emissiveIntensity.value = emissiveIntensity;
		}
	}, [emissiveIntensity, material]);

	return (
		<primitive
			ref={meshRef}
			object={gltf.scene}
			scale={[0.1, 0.1, 0.1]}
			position={[0, 10, 0]}
		/>
	);
};

export default Books;
