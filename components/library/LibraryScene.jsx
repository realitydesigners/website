"use client";
import { Text } from "@react-three/drei";
import React, { useRef } from "react";
import HologramCrystal from "./HologramCrystal";
import { getCategoryPositions } from "./Postions";
import { useCategoryInteraction } from "./index.ts";

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
				position={[0, 0, 0]}
				rotation-y={Math.PI}
				color="#fff"
				fontSize={1.5}
				font="/Staatliches.ttf"
				anchorX="center"
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

	return (
		<group>
			{categories.map((cat, index) => {
				const [x, y, z] = positions[index];
				const world = cat.title || "";
				const isHovered = world === highlightedCategory;
				const rotationY =
					-((Math.PI * 2 * index) / categories.length) + Math.PI / 2;

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

const LibraryScene = ({ category = [], cameraPosition }) => {
	const {
		highlightedCategory,
		mainCategories,

		onCategorySelect,
		subcategoryContent,
	} = useCategoryInteraction(category);

	return (
		<>
			<LibraryCategories
				categories={mainCategories}
				highlightedCategory={highlightedCategory}
				onCategorySelect={onCategorySelect}
			/>
		</>
	);
};

export default React.memo(LibraryScene);
