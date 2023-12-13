"use client";
import {
	Box,
	Line,
	OrbitControls,
	Sphere,
	Text,
	useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { VideoPayload } from "@/types";
import { FC, useRef, useEffect } from "react";

import { Canvas, useThree } from "@react-three/fiber";

interface VideoitemProps {
	data: VideoPayload;
	position: number[];
	rotationY: number;
}

interface VideoListProps {
	videos: VideoPayload[];
}

export const VideoItem: FC<VideoitemProps> = ({ data, position }) => {
	const { title, slug } = data ?? {};
	const textWidth = 1.8; // Increased width for better visibility
	const textHeight = 2.0; // Increased height

	return (
		<group position={new THREE.Vector3(position[0], position[1], position[2])}>
			<Text
				name="PostTitle"
				position={[0, 0, 0]}
				fontSize={0.25} // Larger font size for better readability
				color="black" // Changed color for contrast
				maxWidth={textWidth}
				textAlign="center"
				anchorX="center"
				anchorY="middle"
				font={"/Staatliches.ttf"}
			>
				{title}
			</Text>

			<Line
				points={[
					[-textWidth / 2, textHeight / 2, 0],
					[textWidth / 2, textHeight / 2, 0],
					[textWidth / 2, -textHeight / 2, 0],
					[-textWidth / 2, -textHeight / 2, 0],
					[-textWidth / 2, textHeight / 2, 0],
				]}
				color="black" // Changed color for contrast
				lineWidth={2} // Slightly thicker line
				dashed={false}
			/>
		</group>
	);
};

export const CanvasVideoList: FC<VideoListProps> = ({ videos }) => {
	const columnWidth = 2; // Width of each column
	const rowHeight = 2; // Height between rows
	const videosPerRow = 3; // Number of videos per row

	return (
		<Canvas
			camera={{ position: [0, 0, 3], fov: 60 }}
			style={{ height: "100vh", width: "100vw" }}
		>
			<OrbitControls />

			<group>
				{videos.map((video, id) => {
					const column = id % videosPerRow;
					const row = Math.floor(id / videosPerRow);
					const x = column * columnWidth;
					const y = -row * rowHeight;

					return (
						<VideoItem
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={id}
							data={video}
							position={[x, y, 0]}
							rotationY={0}
						/>
					);
				})}
			</group>
		</Canvas>
	);
};

export default CanvasVideoList;
