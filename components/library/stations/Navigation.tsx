"use client";
import { CategoryPayload } from "@/types";
import React from "react";
import { useInteractiveContext } from "../context/InteractiveContext";

interface NavigationProps {
	categories: CategoryPayload[];
	categoryPositions?: number[][];
}

const Navigation: React.FC<NavigationProps> = ({ categories }) => {
	const { moveToCategoryAndRotate, moveTo } = useInteractiveContext();
	const { categoryPositions } = useInteractiveContext();

	console.log("all positions", categoryPositions);

	const handleClickForCategory = (categoryTitle: string) => {
		const index = categories.findIndex(
			(category) => category.title === categoryTitle,
		);
		if (index !== -1) {
			const position = categoryPositions[index];

			if (position) {
				moveTo(position, position);
			}
		}
	};
	const mainCategories = categories.filter((category) => category.isMain);
	const subCategories = categories.filter((category) => !category.isMain);

	return (
		<div className="w-full p-2 absolute z-20 top-0">
			<div className="flex flex-wrap gap-2 justify-start">
				<span className="text-sm text-gray-300 font-bold">Main</span>
				{mainCategories.map((category) => (
					<button
						type="button"
						key={category.title}
						className="uppercase relative text-sm text-gray-200 px-2 py-1 bg-black/50 rounded-md border border-gray-600/25 hover:bg-gray-600/50 focus:outline-none focus:border-gray-400 transition duration-300"
						onClick={() => handleClickForCategory(category.title)}
					>
						{category.title}
					</button>
				))}
			</div>
			<div className="flex flex-wrap gap-2 justify-start mt-4 ">
				<span className="text-sm text-gray-300 font-bold">Sub</span>
				{subCategories.map((category) => (
					<button
						type="button"
						key={category.title}
						className="uppercase relative text-sm text-gray-200 px-2 py-1 bg-black/50 rounded-md border border-gray-600/25 hover:bg-gray-600/50 focus:outline-none focus:border-gray-400 transition duration-300"
						onClick={() => handleClickForCategory(category.title)}
					>
						{category.title}
					</button>
				))}
			</div>
		</div>
	);
};

export default Navigation;
