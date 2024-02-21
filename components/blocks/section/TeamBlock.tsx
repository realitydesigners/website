import { monomaniac, play } from "@/fonts";
import Link from "next/link";
import React from "react";

import { SanityImage } from "@/components/global/Images";

const TeamBlock = ({ block }) => {
	if (block?._type !== "teamBlock") {
		return null;
	}

	return (
		<div className="w-full flex justify-center bg-black h-full py-6 m-0 ">
			<div className="flex flex-col w-11/12 md:w-1/2 lg:w-1/3 bg-gradient-to-r from-blue-200/10 to-blue-200/5 shadow-lg p-4 rounded-[1.5em]">
				<div className="flex justify-start w-full items-center">
					{block.team?.image && (
						<div className="flex items-center">
							<SanityImage
								image={block.team.image}
								alt={`Team member image for ${block.team.name}`}
								width={300}
								height={300}
								priority={true}
								classesWrapper=" h-[5em] w-[5em] max-h-[5em] max-w-[5em] object-cover cover rounded-[.8em] "
							/>
							<div className="ml-4 flex flex-col">
								<p className="bg-gradient-to-r from-blue-100/100 to-blue-100/90 text-transparent bg-clip-text uppercase font-bold leading-none font-bold   tracking-wide text-xl mb-2">
									{block?.team.name}
								</p>
								<span className="text-gray-400   leading-none uppercase text-xs tracking-widest">
									{block?.team.role}
								</span>
							</div>
						</div>
					)}
				</div>
				<p className="bg-gradient-to-r from-blue-100/75 to-blue-100/60 text-transparent bg-clip-text text-md leading-6 mb-4   pt-4">
					{block?.team.shortBio}
				</p>
				<div className="bg-blue-100/5 hover:bg-blue-100/10 justify-center flex rounded-lg">
					<Link
						href={`/team/${block.team.slug.current}`}
						className="text-sm uppercase text-blue-100 p-2  font-bold flex items-center"
					>
						<span>View Profile</span>
						{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 ml-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M14.707 9.293a1 1 0 0 0-1.414-1.414L10 11.586 6.707 8.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4z" />
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default React.memo(TeamBlock);
