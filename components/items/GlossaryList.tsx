"use client";
import { monomaniac, play } from "@/fonts";
import { GlossaryPayload } from "@/types";
import Link from "next/link";
import { FC } from "react";

interface GlossaryItemProps {
	item: GlossaryPayload;
	slug?: {
		current?: string;
	};
}

interface GlossaryListProps {
	glossary: GlossaryPayload[];
}

const GlossaryItem: FC<GlossaryItemProps> = ({ item, slug }) => {
	return (
		<Link
			href={`/glossary/${slug?.current}`}
			className={`${monomaniac.className} border border-gray-600/50  p-4 text-xl rounded-md flex-grow-0 flex-shrink-0 transition-colors duration-200 hover:bg-gray-100 hover:text-black`}
		>
			{item.title}
		</Link>
	);
};

const GlossaryList: FC<GlossaryListProps> = ({ glossary }) => {
	return (
		<main className="w-full flex flex-wrap justify-center  gap-2 p-2 text-gray-200">
			{glossary.map((item, index) => (
				<GlossaryItem key={`${item._id}-${index}`} item={item} />
			))}
		</main>
	);
};

export default GlossaryList;
