"use client";
import { urlForImage } from "@/sanity/lib/utils";
import { Billboard, Text, useTexture } from "@react-three/drei";
import { Center, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";

import HologramMaterial from "../materials/HologramMaterial";

import * as THREE from "three";

const ImageBlock = ({ block, className }) => {
	console.log("block", block);
	const [animatedFadeProgress, setAnimatedFadeProgress] = useState(0);

	useEffect(() => {
		let animationFrameId;
		const duration = 500;
		const start = performance.now();

		const animate = (time) => {
			const delta = time - start;

			const progress = 3 - 9 * Math.min(delta / duration, 1);
			setAnimatedFadeProgress(progress);

			if (delta < duration) {
				animationFrameId = requestAnimationFrame(animate);
			}
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrameId);
	}, []);

	const hologramMaterialProps = {
		fresnelColor: "#03aaff",
		fresnelAmt: 0.2,
		rimAlpha: 1.0,
		colorIntensity: 3,
		flashingDirection: "down",
		fadeAmount: animatedFadeProgress,
		fadeDirection: "down",
		side: "front",
	};

	if (block?.image?.image) {
		const [windowWidth, setWindowWidth] = useState(
			typeof window !== "undefined" ? window.innerWidth : 0,
		);

		const texture = useTexture(urlForImage(block.image?.image).url());
		const altText = block?.image?.alt || "No description available";
		const textColor = className === "dark" ? "white" : "white";

		if (texture) {
			const textureWidth = texture.image.width;
			const textureHeight = texture.image.height;

			const aspectRatio = textureWidth / textureHeight;

			return (
				<mesh>
					<Text
						name="tag"
						position={[0, -16, 0]}
						fontSize={1}
						color={textColor}
						font="/Staatliches.ttf"
						anchorX="center"
						anchorY="middle"
						depth={0.1}
					>
						{altText}
					</Text>

					<mesh>
						<boxGeometry args={[aspectRatio * 28, 28, 0.1]} />
						<meshBasicMaterial attach="material" map={texture} transparent />
					</mesh>
					<mesh>
						<boxGeometry args={[aspectRatio * 30, 30, 0.5]} />
						<HologramMaterial
							attach="material"
							transparent
							scanLines="/textures/HologramLines_Cool.png"
							{...hologramMaterialProps}
						/>
					</mesh>
				</mesh>
			);
		}
	}

	return null;
};

const ImageCanvasBlock = ({ block }) => {
	const { className } = block;

	const [windowWidth, setWindowWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0,
	);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const cameraPosition = windowWidth < 768 ? [0, 0, 45] : [0, 0, 35];

	if (block?._type !== "imageCanvasBlock") {
		return null;
	}

	switch (className) {
		case "dark":
			return (
				<div className="relative flex justify-center items-center w-full h-auto mb-6 lg:mb-0">
					<div className="w-11/12  bg-black lg:3/4  h-[50vh] lg:h-[80vh]">
						<Canvas>
							<PerspectiveCamera
								makeDefault
								position={cameraPosition}
								zoom={0.75}
								minDistance={1}
								maxDistance={2}
							/>
							<OrbitControls />
							<BGImage block={block} title={block.title} />
							<ImageBlock block={block} className={block.layout} />
						</Canvas>
					</div>
				</div>
			);

		case "light":
			return (
				<div className="relative  flex justify-center items-center w-full h-auto mb-6 lg:mb-0">
					<div className="w-11/12 bg-gray-300 lg:w-5/6 h-[50vh] lg:h-[66vh]   rounded-[1.5em] overflow-hidden shadow-xl">
						<Canvas>
							<PerspectiveCamera
								makeDefault
								position={cameraPosition}
								zoom={0.75}
								minDistance={1}
								maxDistance={2}
							/>
							<OrbitControls />
							<BGImage block={block} title={block.title} />
							<ImageBlock block={block} className={block.layout} />
						</Canvas>
					</div>
				</div>
			);
		default:
			return (
				<div className="relative bg-gray-200 flex justify-center items-center w-full h-auto">
					<p>Unsupported theme: {className}</p>
				</div>
			);
	}
};

const BGImage = ({ block }) => {
	const meshRef = useRef();

	useFrame(() => {
		meshRef.current.rotation.y += 0.001;
	});

	if (block?.image?.image) {
		const texture = useTexture(urlForImage(block.image?.image).url());
		const textureWidth = texture.image.width;
		const textureHeight = texture.image.height;
		const aspectRatio = textureWidth / textureHeight;
		const radius = 75;

		return (
			<group position={[0, 0, 0]}>
				<mesh ref={meshRef}>
					<sphereGeometry args={[aspectRatio * radius, 64, 64]} />
					<meshBasicMaterial
						attach="material"
						map={texture}
						side={THREE.BackSide}
					/>
				</mesh>
			</group>
		);
	}

	return null;
};

export default ImageCanvasBlock;
