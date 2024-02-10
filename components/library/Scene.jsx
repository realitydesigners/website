"use client";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Line, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import Crystal from "./Crystal";
import ModelWithEffects from "./ModelWithEffects";
import { getRefPostPosition } from "./Postions";
import { useCategoryInteraction } from "./index.ts";

const CAMERA_POSITION = [10, 40, 40];

export const SubCategory = (props) => {
	const {
		title,
		model,
		position,
		isHighlighted,
		onClick,
		onPointerOut,
		onHover,
		rotationY,
		textWidth = 21,
		textHeight = 15,
	} = props;

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
		>
			<ModelWithEffects
				model={model}
				className="model"
				position={[0, 0, 5]}
				scale={[3, 3, 3]}
				onPointerOut={onPointerOut}
				onClick={() => title && onClick(title, position)}
				emissiveIntensity={isHighlighted ? 1 : 0.6}
			/>
			<Text
				ref={textRef}
				position={[0, 0, -3]}
				color="#fff"
				fontSize={1.5}
				font="/Staatliches.ttf"
				anchorY="middle"
				maxWidth={6}
				lineHeight={0.9}
				textAlign="center"
			>
				{title}
			</Text>
		</group>
	);
};

const categoryPositions = {
	"Soul & Spirit": [30, 30, 30],
	"Consciousness & Reality": [15, 15, 15],
	"Dreams & Alternate Realities": [0, 0, 0],
	"Plant Medicine & Psychedelics": [-10, -10, -10],
	"Consciousness Exploration": [-20, -20, -20],
	"Real Life & Stories": [-40, -40, -40],
	// Add more categories and their positions as needed
};

export const SubCategories = (props) => {
	const {
		categories,
		highlightedCategory,
		onCategorySelect,
		setSelectedCategory,
		onCategoryHover,
	} = props;

	return (
		<>
			{categories.map((cat, index) => {
				const categoryName = cat.title || "";
				const isHovered = categoryName === highlightedCategory;
				const position = categoryPositions[categoryName] || [0, 0, 0];
				const rotationY =
					-((Math.PI * 2 * index) / categories.length) + Math.PI / 2;

				return (
					<SubCategory
						key={categoryName}
						title={categoryName}
						model={cat.model}
						position={position}
						isHighlighted={isHovered}
						onClick={onCategorySelect}
						onPointerOver={() => setSelectedCategory(categoryName)}
						onHover={() => {
							setSelectedCategory(categoryName);
						}}
						onLeave={() => {
							setSelectedCategory(null);
						}}
						onCategoryHover={onCategoryHover}
						selectedCategory={highlightedCategory}
						rotationY={rotationY}
					/>
				);
			})}
		</>
	);
};

export const RefPost = (props) => {
	const { block, position, isHighlighted, onPointerOut } = props;

	const headingBlock = block.find((b) => b._type === "headingBlock");
	const headingText = headingBlock?.heading;

	const { camera } = useThree();
	const textRef = useRef();

	useFrame(() => {
		if (textRef.current) {
			textRef.current.lookAt(camera.position);
		}
	});

	return (
		<group position={position}>
			<Crystal
				className="sub-crystal"
				position={[0, 0, 0]}
				scale={[1, 1, 1]}
				onPointerOut={onPointerOut}
				emissiveIntensity={isHighlighted ? 1 : 0.6}
			/>
			<Text
				ref={textRef}
				position={[0, 0, -3]}
				color="#fff"
				fontSize={0.5}
				font="/Staatliches.ttf"
				textAlign="center"
				anchorY="middle"
				maxWidth={6}
			>
				{headingText}
			</Text>
		</group>
	);
};

export const RefPosts = (props) => {
	const { subCategoryPosition, refPosts, onCategorySelect, onCategoryHover } =
		props;

	return (
		<>
			{refPosts.map((postRef, index) => {
				const [x, y, z] = getRefPostPosition(
					index,
					refPosts.length,
					subCategoryPosition,
				);
				const isHighlighted = postRef.isHighlighted;
				const key = `${postRef._id}-${index}`;

				return (
					<RefPost
						key={key}
						block={postRef.block}
						position={[x, y, z]}
						isHighlighted={isHighlighted}
						onPointerOut={() => {}}
						onCategoryHover={onCategoryHover}
					/>
				);
			})}
		</>
	);
};

const PostsBySubCategory = (props) => {
	const { categories, onCategorySelect } = props;

	const [onCategoryHover, setSelectedCategory] = useState(null);

	const hoveredCategory = categories.find(
		(cat) => cat.title === onCategoryHover,
	);
	const hoveredSubCategoryPosition = hoveredCategory
		? categoryPositions[hoveredCategory.title]
		: null;

	const hoveredCategoryPosts = hoveredCategory?.refPosts || [];

	return (
		<group>
			<SubCategories
				categories={categories}
				highlightedCategory={onCategoryHover}
				onCategorySelect={onCategorySelect}
				setSelectedCategory={setSelectedCategory}
				onCategoryHover={onCategoryHover}
			/>
			{onCategoryHover && hoveredSubCategoryPosition && (
				<RefPosts
					subCategoryPosition={hoveredSubCategoryPosition}
					highlightedCategory={onCategoryHover}
					onCategorySelect={onCategorySelect}
					refPosts={hoveredCategoryPosts.map((post) => ({
						...post,
						block: post.block || [], // Temporarily ignore filtering to see if any blocks are present
					}))}
				/>
			)}
		</group>
	);
};

const Scene = ({ category }) => {
	const { subCategories } = useCategoryInteraction(category);

	return (
		<>
			<Canvas style={{ height: "100vh", width: "100vw" }}>
				<PerspectiveCamera makeDefault position={CAMERA_POSITION} zoom={0.75} />
				<OrbitControls />
				<PostsBySubCategory categories={subCategories} />
			</Canvas>
		</>
	);
};

export default Scene;
