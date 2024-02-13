"use client";
import HologramMaterial from "@/public/materials/HologramMaterial";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const CustomDodecahedronGeometry = new THREE.DodecahedronGeometry(1, 0);

const Crystal = ({
	position,
	scale,
	onPointerOver,
	onPointerOut,
	onClick,
	emissiveIntensity = 1,
	shouldShowControls = false,
}) => {
	const { raycaster, camera, scene } = useThree();

	const meshRef = useRef(null);
	const [animatedFadeProgress, setAnimatedFadeProgress] = useState(0);

	useEffect(() => {
		let animationFrameId;
		const duration = 3000; // Duration of the animation
		const start = performance.now();

		const animate = (time) => {
			const delta = time - start; // Time elapsed since the animation started
			// Map the progress from 3.00 to -3.00 over the duration
			const progress = 3 - 6 * Math.min(delta / duration, 1);
			setAnimatedFadeProgress(progress); // Update the state

			if (delta < duration) {
				animationFrameId = requestAnimationFrame(animate); // Continue the animation loop
			}
		};

		animationFrameId = requestAnimationFrame(animate); // Start the animation loop

		return () => cancelAnimationFrame(animationFrameId); // Cleanup the animation frame on component unmount
	}, []);

	const controls = shouldShowControls
		? useControls({
				rimColor: { value: "#03aaff" },
				fresnelAmount: { value: 0.9, min: 0, max: 5, step: 0.1 },
				rimAlpha: { value: 1.0, min: 0, max: 1 },
				baseColor: { value: "#FF88FE" },
				animationSpeed: { value: 10, min: 1, max: 50, step: 1 },
				blinking: { value: true },
				blinkSpeed: { value: 5.8, min: 1, max: 20, step: 0.1 },
				blinkingAlpha: { value: 6, min: 0, max: 10, step: 0.1 },
				flashing: { value: true },
				flashSize: { value: 1, min: 1, max: 10 },
				flashSpeed: { value: 2, min: 1, max: 10, step: 0.1 },
				flashingAlpha: { value: 0.2, min: 0, max: 1, step: 0.1 },
				scanlineDirection: { options: ["up", "down"] },
				flashlineDirection: { options: ["up", "down"], value: "down" },
				intensity: { value: 1.7, min: 1, max: 5, step: 0.1 },
				colorAlpha: { value: 1, min: 0, max: 1, step: 0.1 },
				fadeProgress: {
					value: 0,
					min: 0,
					max: 1,
					step: 0.01,
				},
				fadeDirection: {
					options: ["up", "down"],
					value: "up",
				},
				fadePatternSize: {
					value: 50,
					min: 2,
					max: 100,
					step: 0.01,
				},
				fadeOffset: {
					value: 3,
					min: 2,
					max: 10,
					step: 0.01,
				},
				patternIntensity: {
					value: 20,
					min: 1,
					max: 50,
					step: 0.01,
				},
				side: {
					options: ["front", "back", "double"],
					value: "front",
				},
		  })
		: {};

	useFrame(({ clock }) => {
		if (meshRef.current) {
			meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.3;
			meshRef.current.rotation.y = Math.cos(clock.getElapsedTime()) * 0.2;
		}
	});

	useEffect(() => {
		const handleClick = (event) => {
			raycaster.setFromCamera(
				new THREE.Vector2(
					(event.clientX / window.innerWidth) * 2 - 1,
					-(event.clientY / window.innerHeight) * 2 + 1,
				),
				camera,
			);
			const intersects = raycaster.intersectObjects(scene.children, true);

			if (intersects.length > 0 && intersects[0].object === meshRef.current) {
				// biome-ignore lint/complexity/useOptionalChain: <explanation>
				onClick && onClick();
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [onClick, raycaster, camera, scene]);

	return (
		<mesh
			ref={meshRef}
			position={position}
			rotation={[Math.PI / 90, 0, 0]}
			scale={scale}
			onPointerOver={onPointerOver}
			onPointerOut={onPointerOut}
		>
			<primitive object={CustomDodecahedronGeometry} attach="geometry" />
			<HologramMaterial
				fresnelColor={controls.rimColor || "#03aaff"}
				scanLines="/textures/HologramLines_Cool.png"
				fresnelAmt={controls.fresnelAmount || 0.9}
				baseColor={controls.baseColor || "#FF88FE"}
				fresnelAlpha={controls.rimAlpha || 1.0}
				animateSpeed={controls.animationSpeed || 10}
				blinking={controls.blinking || true}
				blinkingSpeed={controls.blinkSpeed || 5.8}
				blinkAlpha={controls.blinkingAlpha || 6}
				flashLine={controls.flashing || true}
				flashSize={controls.flashSize || 1}
				flashingSpeed={controls.flashSpeed || 2}
				flashAlpha={controls.flashingAlpha || 0.2}
				scanlineDirection={controls.scanlineDirection || "up"}
				flashingDirection={controls.flashlineDirection || "down"}
				colorIntensity={controls.intensity || 1.7}
				colorAlpha={controls.colorAlpha || 1}
				emissiveIntensity={controls.emissiveIntensity}
				fadeAmount={animatedFadeProgress}
				fadeDirection={controls.fadeDirection}
				transitionPatternSize={controls.fadePatternSize}
				transitionSize={controls.fadeOffset}
				patternIntensity={controls.patternIntensity}
				side={controls.side}
			/>
		</mesh>
	);
};

export default Crystal;
