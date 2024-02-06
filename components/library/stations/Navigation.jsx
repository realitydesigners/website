// Navigation.jsx

import React from "react";
import {
	defaultPositions,
	useInteractiveContext,
} from "../context/InteractiveContext";

const Navigation = () => {
	const { moveTo } = useInteractiveContext();

	const handleButtonClick = (target, position) => {
		moveTo(target, position);
	};

	return (
		<div className="w-full h-16 p-4 bg-black/70 absolute z-90 top-0 flex gap-2 items-center justify-center">
			{defaultPositions.map(({ name, target, position }) => (
				<button
					type="button"
					className="relative text-sm text-gray-200 px-6 py-3 bg-gray-600/25 rounded-md border border-gray-600/50 hover:bg-gray-600/50 focus:outline-none focus:border-gray-400 transition duration-300"
					key={name}
					onClick={() => handleButtonClick(target, position)}
				>
					{name}
				</button>
			))}
		</div>
	);
};

export default Navigation;
