"use client";
import { getCategoryPositions } from "@/components/context/Postions.jsx";
import { useCategoryInteraction } from "@/components/context/useCategoryInteraction";
import HologramCrystal from "@/public/materials/HologramCrystal.jsx";
import { Text } from "@react-three/drei";
import React from "react";

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

const Categories = ({ categories, highlightedCategory, onCategorySelect }) => {
	const positions = getCategoryPositions(categories.length);

	return (
		<group>
			{categories.map((cat, index) => {
				const [x, y, z] = positions[index];
				const name = cat.title || "";
				const isHovered = name === highlightedCategory;
				const rotationY =
					-((Math.PI * 2 * index) / categories.length) + Math.PI / 2;

				return (
					<Category
						key={name}
						title={name}
						position={[x, y, z]}
						isHighlighted={isHovered}
						onPointerOver={() => onCategorySelect(name, [x, y, z])}
						onPointerOut={() => {}}
						selectedCategory={highlightedCategory}
						rotationY={rotationY}
					/>
				);
			})}
		</group>
	);
};

const MainCategories = ({ category = [], cameraPosition }) => {
	const { highlightedCategory, mainCategories, onCategorySelect } =
		useCategoryInteraction(category);

	return (
		<>
			<Categories
				categories={mainCategories}
				highlightedCategory={highlightedCategory}
				onCategorySelect={onCategorySelect}
			/>
		</>
	);
};

export default React.memo(MainCategories);
