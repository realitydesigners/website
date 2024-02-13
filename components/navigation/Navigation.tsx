"use client";
import { useInteractiveContext } from "@/components/context/InteractiveContext";
import { CategoryPayload } from "@/types";
import React from "react";

interface NavigationProps {
	categories: CategoryPayload[];
	categoryPositions?: number[][];
}

const Navigation: React.FC<NavigationProps> = ({ categories }) => {
	const { moveTo } = useInteractiveContext();
	const { categoryPositions } = useInteractiveContext();
	const mainCategories = categories.filter((category) => category.isMain);
	const subCategories = categories.filter((category) => !category.isMain);

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

	return (
		<div className="w-full p-2 absolute z-20 top-12">
			<div className="flex items-center gap-2">
				<span className="text-sm text-gray-300 font-bold whitespace-nowrap">
					Main
				</span>
				<div
					className="flex overflow-x-auto gap-2"
					style={{ whiteSpace: "nowrap" }}
				>
					{mainCategories.map((category) => (
						<button
							type="button"
							key={category.title}
							className="uppercase relative text-sm text-gray-200 px-3 py-2 bg-black/50 rounded-md border border-gray-600/25 hover:bg-gray-600/50 focus:outline-none focus:border-gray-400 transition duration-300"
							onClick={() => handleClickForCategory(category.title)}
						>
							{category.title}
						</button>
					))}
				</div>
			</div>
			<div className="flex items-center gap-2 mt-4">
				<span className="text-sm text-gray-300 font-bold whitespace-nowrap">
					Sub
				</span>
				<div
					className="flex overflow-x-auto gap-2"
					style={{ whiteSpace: "nowrap" }}
				>
					{subCategories.map((category) => (
						<button
							type="button"
							key={category.title}
							className="uppercase relative text-sm text-gray-200 px-3 py-2 bg-black/50 rounded-md border border-gray-600/25 hover:bg-gray-600/50 focus:outline-none focus:border-gray-400 transition duration-300"
							onClick={() => handleClickForCategory(category.title)}
						>
							{category.title}
						</button>
					))}
				</div>
			</div>
			<style jsx>{`
                .category-container {
                    display: flex;
                    overflow-x: auto;
                    gap: 2px;
                    justify-content: start;
                    white-space: nowrap;
                    scrollbar-width: none; /* For Firefox */
                }
                
                .category-container::-webkit-scrollbar {
                    display: none; /* For WebKit browsers */
                }
              
            `}</style>
		</div>
	);
};

export default Navigation;
