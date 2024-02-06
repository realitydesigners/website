import { monomaniac } from "@/fonts";
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
		<div className="w-full h-16 p-2 absolute z-90  top-0 flex gap-2 items-center justify-center lg:justify-end">
			{defaultPositions.map(({ name, target, position }) => (
				<button
					type="button"
					className={`${monomaniac.className} uppercase relative text-sm text-gray-200 px-2 py-1 bg-black/50 rounded-md border border-gray-600/25 hover:bg-gray-600/50 focus:outline-none focus:border-gray-400 transition duration-300`}
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
