"use client";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React, { useRef, useState } from "react";
import Books from "./Books";
import HologramCrystal from "./HologramCrystal";
import { getCategoryPositions } from "./Postions";
import { Sidebar, useCategoryInteraction } from "./index.ts";

const CAMERA_POSITION = [0, 2, 3];

const Category = ({
	title,
	position,
	isHighlighted,
	onPointerOver,
	onPointerOut,
	onHover,
	onLeave,
	selectedCategory,
	rotationY,
}) => {
	const isDimmed = selectedCategory && selectedCategory !== title;

	const handleHover = () => {
		if (onPointerOver) {
			onPointerOver(title, position);
		}
	};

	const handleRedirect = () => {
		const categoryRoute = `/library/${title.toLowerCase()}`;
		window.location.href = categoryRoute;
	};

	const textRef = useRef(null);
	const { camera } = useThree();

	useFrame(() => {
		if (textRef.current) {
			textRef.current.lookAt(camera.position);
		}
	});

	return (
		<group
			position={position}
			rotation={[0, rotationY, 0]}
			onPointerOver={onHover}
			onPointerOut={onLeave}
			onPointerDown={handleRedirect}
		>
			<HologramCrystal
				className="main-crystal"
				position={[0, 0, 5]}
				scale={[5, 5, 5]}
				onPointerOver={handleHover}
				onPointerOut={onPointerOut}
				emissiveIntensity={isDimmed ? 0.5 : isHighlighted ? 1 : 0.6}
			/>
			<Text
				ref={textRef}
				position={[0, 0, -1]}
				color="#fff"
				fontSize={1.5}
				font="/Staatliches.ttf"
				anchorY="middle"
				maxWidth={5}
				lineHeight={0.9}
				textAlign="center"
			>
				{title}
			</Text>
		</group>
	);
};

const LibraryCategories = ({
	categories,
	highlightedCategory,
	onCategorySelect,
}) => {
	const positions = getCategoryPositions(categories.length);
	const [rotation, setRotation] = useState(0);
	const groupRef = useRef();

	useFrame(() => {
		if (groupRef.current) {
			groupRef.current.rotation.y += 0.001;
		}
	});

	return (
		<group ref={groupRef}>
			{categories.map((cat, index) => {
				const [x, y, z] = positions[index];
				const world = cat.title || "";
				const isHovered = world === highlightedCategory;
				const rotationY =
					-((Math.PI * 2 * index) / categories.length) + Math.PI / 2;
				const groupRotationY = rotationY + rotation;

				return (
					<Category
						key={world}
						title={world}
						position={[x, y, z]}
						isHighlighted={isHovered}
						onPointerOver={() => onCategorySelect(world, [x, y, z])}
						onPointerOut={() => {}}
						selectedCategory={highlightedCategory}
						rotationY={rotationY}
					/>
				);
			})}
		</group>
	);
};

const LibraryScene = ({ category = [] }) => {
	const {
		highlightedCategory,
		mainCategories,
		isSidebarVisible,
		onCategorySelect,
		subcategoryContent,
	} = useCategoryInteraction(category);

	return (
		<>
			<Sidebar isVisible={isSidebarVisible} content={subcategoryContent} />
			<Canvas style={{ height: "100vh", width: "100vw" }}>
				<PerspectiveCamera makeDefault position={CAMERA_POSITION} zoom={0.8} />
				<OrbitControls />
				<hemisphereLight />

				<LibraryCategories
					categories={mainCategories}
					highlightedCategory={highlightedCategory}
					onCategorySelect={onCategorySelect}
				/>
				<EffectComposer>
					<Bloom luminanceThreshold={0.01} luminanceSmoothing={0.02} />
				</EffectComposer>
				<Books />
			</Canvas>
		</>
	);
};

export default React.memo(LibraryScene);
