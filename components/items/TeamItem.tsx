"use client";
import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/types";
import { monomaniac } from "@/fonts";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React from "react";

const SocialLink = ({ href, children }) => (
	<Link
		href={href}
		className="p-3 border border-gray-600/50 text-center rounded-[.25em] hover:bg-gray-200 hover:text-black"
	>
		{children}
	</Link>
);

const TeamItem = ({ team, blocks, socialLinks }) => {
	const { role, name, scene } = team;

	return (
		<div className="w-full flex flex-col h-full text-black justify-center items-center bg-black ">
			<div className="w-full  h-[60vh] lg:h-[80vh] bg-black block">
				<Spline className="w-full" scene={scene || ""} />
			</div>
			<div className="w-full p-4 flex flex-col justify-center items-center gap-2">
				<h1
					className={`${monomaniac.className} text-6xl font-bold text-gray-200`}
				>
					{name}
				</h1>
				<h2
					className={`${monomaniac.className} text-3xl font-normal text-gray-400`}
				>
					{role}
				</h2>
			</div>

			<div
				className={`${monomaniac.className} grid grid-cols-2 md:grid-cols-4 text-gray-200 tracking-wide text-xl font-bold gap-4 p-2 uppercase mb-4`}
			>
				{socialLinks.map(({ name, url }) => (
					<SocialLink key={name} href={url}>
						{name}
					</SocialLink>
				))}
			</div>

			{blocks?.map((block, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<Blocks key={index} block={block as BlockProps} />
			))}
		</div>
	);
};

export default TeamItem;
