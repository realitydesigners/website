"use client";
import React from "react";
import { useTexture, Text } from "@react-three/drei";
import { urlForImage } from "@/sanity/lib/utils";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Center } from "@react-three/drei";

const CAMERA_POSITION = [0, 0, 10];

const ImageCanvasBlock = ({ block }) => {
	if (block?._type !== "imageCanvasBlock") {
		return null;
	}

	return (
		<div className="relative flex justify-center items-center w-full h-auto">
			<div className="w-full h-[100vh]">
				<Canvas>
					<PerspectiveCamera
						makeDefault
						position={CAMERA_POSITION}
						zoom={0.75}
					/>
					<OrbitControls />
					<ambientLight intensity={0.5} />
					<Center />
					<ImageBlock block={block} width={50} height={50} />
				</Canvas>
			</div>
		</div>
	);
};

export default ImageCanvasBlock;

const ImageBlock = ({ block, title, width = 5, height = 5 }) => {
	// console.log("block:", block);

	if (block?.image?.image) {
		const texture = useTexture(urlForImage(block.image?.image).url());

		if (texture) {
			return (
				<mesh>
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
					<boxGeometry args={[10, 10, 0.11]} />
					<meshBasicMaterial attach="material" map={texture} />
				</mesh>
			);
		}
	}

	return null;
};
