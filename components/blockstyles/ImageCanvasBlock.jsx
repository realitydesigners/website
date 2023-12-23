"use client";
import React, { useEffect, useState, useRef } from "react";
import { useTexture, Text } from "@react-three/drei";
import { urlForImage } from "@/sanity/lib/utils";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Center } from "@react-three/drei";

const ImageBlock = ({ block, title }) => {
	if (block?.image?.image) {
		const texture = useTexture(urlForImage(block.image?.image).url());

		const meshRef = useRef();

		useFrame(() => {
			// Rotate the mesh on the y-axis (you can adjust the speed by changing the value)
			meshRef.current.rotation.y += 0.001;
		});

		if (texture) {
			const textureWidth = texture.image.width;
			const textureHeight = texture.image.height;

			const aspectRatio = textureWidth / textureHeight;

			return (
				<mesh ref={meshRef}>
					<Text
						name="tag"
						position={[1, 1, 10]}
						fontSize={20}
						color="black"
						maxWidth={0.8}
						anchorX="center"
						anchorY="middle"
						depth={0.1}
					>
						{title}
					</Text>
					<boxGeometry args={[aspectRatio * 10, 10, 0.11]} />
					<meshBasicMaterial attach="material" map={texture} />
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

	const cameraPosition = windowWidth < 768 ? [0, 0, 20] : [0, 0, 15];

	if (block?._type !== "imageCanvasBlock") {
		return null;
	}

	switch (className) {
		case "dark":
			return (
				<div className="relative bg-black flex justify-center items-center w-full h-auto">
					<div className="w-full h-[50vh] lg:h-[80vh]">
						<Canvas>
							<PerspectiveCamera
								makeDefault
								position={cameraPosition}
								zoom={0.75}
							/>
							<OrbitControls />
							<ambientLight intensity={0.5} />
							<Center />
							<ImageBlock block={block} className={block.layout} />
						</Canvas>
					</div>
				</div>
			);

		case "light":
			return (
				<div className="relative bg-gray-200 flex justify-center items-center w-full h-auto">
					<div className="w-full h-[50vh] lg:h-[80vh]">
						<Canvas>
							<PerspectiveCamera
								makeDefault
								position={cameraPosition}
								zoom={0.75}
							/>
							<OrbitControls />
							<ambientLight intensity={0.5} />
							<Center />
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

export default ImageCanvasBlock;
