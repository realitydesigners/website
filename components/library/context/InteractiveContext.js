"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const InteractiveContext = createContext();

export const useInteractiveContext = () => useContext(InteractiveContext);

export const InteractiveProvider = ({ children, categoryPositions }) => {
	const [selectedObject, setSelectedObject] = useState(null);
	const [displayContent, setDisplayContent] = useState(null);
	const [cameraState, setCameraState] = useState({
		target: [0, 1, 0],
		position: [40, 20, 40], // Default home position
		rotation: [0, Math.PI / 2, 0],
	});

	// Define the category positions outside the component

	const handleObjectClick = (objectData) => {
		setSelectedObject(objectData);
		setDisplayContent(/* content to display based on the clicked object */);
	};

	const moveTo = (target, position) => {
		console.log("Move to:", target, position); // Add this line to check position data
		setCameraState({
			target: target,
			position: position,
			rotation: [0, Math.PI / 2, 0],
		});
	};

	useEffect(() => {
		console.log("Updated camera state:", cameraState);
	}, [cameraState]);

	const contextValue = {
		selectedObject,
		displayContent,
		handleObjectClick,
		moveTo,
		cameraState,
		categoryPositions, // Include categoryPositions in the context
	};

	return (
		<InteractiveContext.Provider value={contextValue}>
			{children}
		</InteractiveContext.Provider>
	);
};
