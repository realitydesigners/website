"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {
	Html,
	PerspectiveCamera,
	OrbitControls,
	Box,
	Center,
} from "@react-three/drei";
import * as THREE from "three";

const VideoMesh = () => {
	// Create a ref for the mesh
	const meshRef = useRef<Mesh>(null);

	// Update the mesh on each frame
	useFrame(({ camera }) => {
		if (meshRef.current) {
			meshRef.current.rotation.y += 0.0003;
		}
	});

	return (
		<mesh ref={meshRef}>
			<boxGeometry args={[2, 2, 2]} />
			<meshStandardMaterial color="gray" />
			<Html position={[0, 0, 2]} transform occlude>
				<iframe
					src="https://ping.gg/quick/h6a013z7t7adnqp?view=cl7bfavf735090hjq2s2rxnwx"
					width="800"
					height="450"
					title="Live Video"
					style={{ border: "none" }}
					allowFullScreen
				/>
			</Html>
		</mesh>
	);
};

const VideoTestPage = () => {
	return (
		<div className="bg-black w-full h-screen relative">
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 0, 30]} />
				<OrbitControls />
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} />
				<VideoMesh />
			</Canvas>
			<AudioComponent />
		</div>
	);
};

export default VideoTestPage;

const AudioComponent = () => {
	const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

	useEffect(() => {
		const context =
			new // biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(window.AudioContext || (window as any).webkitAudioContext)();

		setAudioContext(context);
	}, []);

	const startAudio = () => {
		if (audioContext) {
			audioContext.resume().then(() => {
				console.log("Playback resumed successfully");
			});
		}
	};

	return (
		<div>
			<button
				type="button"
				className="absolute z-10 m text-white top-4 bg-white/10 p-1 pl-2 pr-2 right-4"
				onClick={startAudio}
			>
				Start Audio
			</button>
		</div>
	);
};
