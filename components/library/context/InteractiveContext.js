"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const InteractiveContext = createContext();

export const useInteractiveContext = () => useContext(InteractiveContext);

export const InteractiveProvider = ({ children }) => {
	const [selectedObject, setSelectedObject] = useState(null);
	const [displayContent, setDisplayContent] = useState(null);
	const [cameraState, setCameraState] = useState({
		target: [0, 1, 0],
		position: defaultPositions.find((item) => item.name === "Home").position,
		rotation: defaultPositions.find((item) => item.name === "Home").rotation,
	});

	const handleObjectClick = (objectData) => {
		setSelectedObject(objectData);
		setDisplayContent(/* content to display based on the clicked object */);
	};

	const moveTo = (target, position) => {
		console.log("Move to:", target, position);
		setCameraState({
			target: target,
			position: position,
		});
		console.log("Camera state:", cameraState);
	};

	// Update camera state when position or target changes
	useEffect(() => {
		console.log("Updated camera state:", cameraState);
	}, [cameraState]);

	const contextValue = {
		selectedObject,
		displayContent,
		handleObjectClick,
		moveTo,
		cameraState,
	};

	return (
		<InteractiveContext.Provider value={contextValue}>
			{children}
		</InteractiveContext.Provider>
	);
};

export const defaultPositions = [
	{
		name: "Home",
		target: [0, 1, 0],
		position: [40, 20, 40],
		rotation: [0, Math.PI / 2, 0],
	},
	{
		name: "Culture",
		target: [0, 2, 0],
		position: [2.5, 0, 2],
		rotation: [0, Math.PI / 2, 0],
	},
	{
		name: "Technology",
		target: [0, 1, 0],
		position: [-1, 0, 3],
		rotation: [0, Math.PI / 2, 0],
	},
];
