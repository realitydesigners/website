"use client";
import { getPostData } from "@/app/api/actions/fetchInternalLink";
import { SanityImage } from "@/components/global/Images";
import { cairo, monomaniac, staatliches } from "@/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const InternalLink = ({ slug, children }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [previewPostData, setPreviewPostData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const openDialog = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setDialogOpen(true);

		if (!slug) {
			console.error("The slug is undefined.");
			setIsLoading(false);
			return;
		}

		try {
			const data = await getPostData(slug);
			setPreviewPostData(data);
		} catch (error) {
			console.error("Failed to fetch post data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Link href="#popup" onClick={openDialog} className="">
				<span
					className={`${monomaniac.className} text-xl text-black underline`}
				>
					{children}
				</span>
				<span
					className={`${monomaniac.className} pt-[3px] pb-[5px] pr-2 pl-2 ml-2 text-[16px] bg-[#c4b5fd] rounded-full`}
				>
					POST
				</span>
			</Link>
			{isDialogOpen &&
				(isLoading ? (
					<LoadingIndicator />
				) : (
					<ArticlePreviewDialog
						isOpen={isDialogOpen}
						onClose={() => setDialogOpen(false)}
						postData={previewPostData}
					/>
				))}
		</>
	);
};

const TeamLink = ({ team }) => {
	if (!team) return null;

	const teamImage = team.image;
	const renderTeam = () => team.name || "no title";

	return (
		<Link
			href={`/team/${team.slug.current}`}
			className={`${monomaniac.className}`}
		>
			<div className="flex relative left-2 bottom-2 items-center w-full">
				{teamImage && (
					<div className="overflow-hidden rounded-full">
						<SanityImage
							image={teamImage}
							width={100}
							height={100}
							priority={true}
							alt={`Team member image for ${team.name}`}
							classesWrapper="h-[30px] w-[30px] object-cover  "
						/>
					</div>
				)}
				<span className="ml-2 uppercase text-black tracking-wide font-mono text-sm">
					{renderTeam()}
				</span>
			</div>
		</Link>
	);
};

export const ArticlePreviewDialog = ({ isOpen, onClose, postData }) => {
	if (!isOpen || !postData) return null;

	const firstBlock = postData?.block?.[0];

	const renderHeading = () => {
		return firstBlock.heading || "no title";
	};

	const renderSubHeading = () => {
		return firstBlock.subheading || "no title";
	};

	const formattedDate = firstBlock?.publicationDate
		? new Date(firstBlock.publicationDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
		  })
		: "Date not available";

	return (
		<div id="popup" className="flex flex-col my-5 items-center justify-center">
			<div className="w-full flex justify-center relative  h-[auto]  overflow-auto p-1 bg-gray-300 shadow-lg rounded-lg grid grid-cols-1 ">
				{firstBlock && (
					<>
						{firstBlock.image && (
							<div className="relative flex  h-full bg-gray-200/50 p-1 rounded-lg    w-full  justify-between ">
								<SanityImage
									image={firstBlock.image}
									width={500}
									height={500}
									priority={true}
									alt={`Cover Image for ${firstBlock.heading}`}
									classesWrapper="h-[50px] max-w-[50px]  transform rounded-[.5em] object-cover transition-transform duration-300 group-hover:scale-110"
								/>
								<Link
									href={`/posts/${postData.slug.current}`}
									className={`${monomaniac.className} pl-2 text-black  flex items-center leading-[1em] font-bold text-sm lg:text-md  w-1/2 `}
								>
									{renderHeading()}
								</Link>
								<span
									className={`${monomaniac.className} w-auto pl-2 pt-1 leading-[1em] flex items-center flex h-auto mb-2 text-[.6em] text-black uppercase tracking-widest`}
								>
									{formattedDate}
								</span>
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button
									onClick={onClose}
									className={`${cairo.className} px-2 py-2 text-gray-400  text-2xl font-bold  uppercase rounded hover:bg-gray-300 transition-colors`}
								>
									X
								</button>
							</div>
						)}

						<div>
							<p
								className={`${cairo.className} text-black leading-7 p-4 text-xl mb-4`}
							>
								{renderSubHeading()}
							</p>

							<TeamLink team={firstBlock?.team} />
							<div className="flex   relative justify-between items-center col-span-1 lg:col-span-2">
								<Link
									href={`/posts/${postData.slug.current}`}
									className={`${monomaniac.className} right-2 absolute bottom-2  flex text-lg justify-center items-center px-4 rounded-[.7em] pt-1 pb-2 bg-black text-white   rounded hover:bg-black/75 transition-colors`}
								>
									Read -&gt;
								</Link>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const LoadingIndicator = () => (
	<div className="flex my-4 items-center justify-center">
		<div className="w-full max-w-3xl h-[66vh] lg:h-[33vh]  overflow-auto flex justify-center items-center p-4 bg-gray-300 shadow-lg rounded-lg">
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
			<svg
				width="100"
				height="100"
				viewBox="0 0 50 50"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="25"
					cy="25"
					r="20"
					stroke="#888888"
					strokeWidth="5"
					fill="none"
					strokeDasharray="31.415, 31.415"
					strokeDashoffset="0"
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						from="0 25 25"
						to="360 25 25"
						dur="1s"
						repeatCount="indefinite"
					/>
				</circle>
			</svg>
		</div>
	</div>
);

export default InternalLink;
