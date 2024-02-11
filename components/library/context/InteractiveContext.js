"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const InteractiveContext = createContext();

export const useInteractiveContext = () => useContext(InteractiveContext);

export const InteractiveProvider = ({ children, categoryPositions }) => {
	const [cameraState, setCameraState] = useState({
		position: [80, 20, 40], // Default home position
		rotation: [0, 0, 0], // Default rotation
	});

	const moveTo = (position, rotation) => {
		setCameraState({
			position: position,
			rotation: rotation, // Update rotation with the provided rotation
		});
	};

	useEffect(() => {
		console.log("Updated camera state:", cameraState);
	}, [cameraState]);

	const contextValue = {
		moveTo,
		cameraState,
		categoryPositions,
	};

	return (
		<InteractiveContext.Provider value={contextValue}>
			{children}
		</InteractiveContext.Provider>
	);
};
