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
		<div className="absolute top-12 z-20 w-full p-2">
			<div className="flex items-center gap-2">
				<span className="whitespace-nowrap text-sm font-bold text-gray-300">
					Main
				</span>
				<div
					className="flex gap-2 overflow-x-auto"
					style={{ whiteSpace: "nowrap" }}
				>
					{mainCategories.map((category) => (
						<button
							type="button"
							key={category.title}
							className="relative rounded-md border border-gray-600/25 bg-black/50 px-3 py-2 text-sm uppercase text-gray-200 transition duration-300 hover:bg-gray-600/50 focus:border-gray-400 focus:outline-none"
							onClick={() => handleClickForCategory(category.title)}
						>
							{category.title}
						</button>
					))}
				</div>
			</div>
			<div className="mt-4 flex items-center gap-2">
				<span className="whitespace-nowrap text-sm font-bold text-gray-300">
					Sub
				</span>
				<div
					className="flex gap-2 overflow-x-auto"
					style={{ whiteSpace: "nowrap" }}
				>
					{subCategories.map((category) => (
						<button
							type="button"
							key={category.title}
							className="relative rounded-md border border-gray-600/25 bg-black/50 px-3 py-2 text-sm uppercase text-gray-200 transition duration-300 hover:bg-gray-600/50 focus:border-gray-400 focus:outline-none"
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
