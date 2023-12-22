"use client";
import { Line, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Crystal from "./Crystal";
import ModelWithEffects from "./ModelWithEffects";
import { getRefPostPosition, getSubCategoryPositions } from "./Postions";

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
				color="black"
				fontSize={1.5}
				font="/Staatliches.ttf"
				anchorY="middle"
				maxWidth={6}
				lineHeight={0.9}
				textAlign="center"
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
				position={[0, 0, 0]}
				color="gray"
				lineWidth={2}
				dashed={false}
			/>
		</group>
	);
};

export const SubCategories = (props) => {
	const {
		categories,
		highlightedCategory,
		onCategorySelect,
		setSelectedCategory,
		onCategoryHover,
	} = props;

	const positions = useMemo(
		() => getSubCategoryPositions(categories.length),
		[categories.length],
	);

	return (
		<>
			{categories.map((cat, index) => {
				const [x, y, z] = positions[index];
				const categoryName = cat.title || "";
				const isHovered = categoryName === highlightedCategory;
				const rotationY =
					-((Math.PI * 2 * index) / categories.length) + Math.PI / 2;

				return (
					<SubCategory
						key={categoryName}
						title={categoryName}
						model={cat.model}
						position={[x, y, z]}
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
	const { block, position, isHighlighted, onClick, onPointerOut } = props;

	const headingBlock = useMemo(
		() => block.find((b) => b._type === "headingBlock"),
		[block],
	);
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
				color="black"
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
				// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
				const [x, y, z] = useMemo(
					() => getRefPostPosition(index, refPosts.length, subCategoryPosition),
					[index, refPosts.length, subCategoryPosition],
				);
				const isHighlighted = postRef.isHighlighted;
				const key = `${postRef._id}-${index}`;

				return (
					<RefPost
						key={key}
						block={postRef.block}
						position={[x, y, z]}
						isHighlighted={isHighlighted}
						onPointerOver={() => onCategorySelect(postRef.heading, [x, y, z])}
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

	const subCategoryPositions = useMemo(
		() => getSubCategoryPositions(categories.length),
		[categories.length],
	);
	const hoveredCategory = useMemo(
		() => categories.find((cat) => cat.title === onCategoryHover),
		[categories, onCategoryHover],
	);
	const hoveredSubCategoryPosition = hoveredCategory
		? subCategoryPositions[categories.indexOf(hoveredCategory)]
		: null;

	const hoveredCategoryPosts = useMemo(
		() => hoveredCategory?.refPosts || [],
		[hoveredCategory],
	);

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

export default React.memo(PostsBySubCategory);
