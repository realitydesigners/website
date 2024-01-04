"use client";
import { getPostData } from "@/app/api/actions/fetchInternalLink";
import { SanityImage } from "@/components/global/Images";
import { cairo, monomaniac, staatliches } from "@/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const getThemeClasses = (theme) => {
	switch (theme) {
		case "light":
			return {
				textColor: "text-black",
				backgroundColor: "bg-gray-300",
				topBackgroundColor: "bg-gray-200/50",
				buttonTextColor: "text-gray-200",
				buttonBackgroundColor: "bg-black hover:bg-black/80",
			};
		case "dark":
			return {
				textColor: "text-gray-200",
				backgroundColor: "bg-[#111]",
				topBackgroundColor: "bg-[#222]",
				buttonTextColor: "text-black",
				buttonBackgroundColor: "bg-gray-200 hover:bg-gray-200/80",
			};

		default:
			return {
				textColor: "text-black",
				backgroundColor: "bg-gray-300",
				topBackgroundColor: "bg-gray-200/50",
				buttonTextColor: "text-gray-200",
				buttonBackgroundColor: "bg-black hover:bg-black/80",
			};
	}
};

const formatDate = (dateString) => {
	return dateString
		? new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
		  })
		: "Date not available";
};

const DialogButton = ({ onClose }) => (
	<button
		type="button"
		onClick={onClose}
		className={`${cairo.className} px-2 py-2 text-gray-400 text-2xl font-bold uppercase rounded hover:bg-gray-300 transition-colors`}
	>
		X
	</button>
);

const TeamLink = ({ team, theme }) => {
	const themeClasses = getThemeClasses(theme);
	if (!team) return null;

	return (
		<Link
			href={`/team/${team.slug.current}`}
			className={`${monomaniac.className}`}
		>
			<div className={`flex items-center p-2 w-auto ${themeClasses.textColor}`}>
				{team.image && (
					<SanityImage
						image={team.image}
						width={100}
						height={100}
						priority={true}
						alt="Team Image"
						classesWrapper="h-[30px] max-w-[30px] object-cover rounded-[1em]"
					/>
				)}
				<span className="ml-2 uppercase tracking-wide font-mono text-sm">
					{team.name || "no title"}
				</span>
			</div>
		</Link>
	);
};

const ArticlePreviewDialog = ({ isOpen, onClose, postData, theme }) => {
	if (!isOpen || !postData) return null;

	const themeClasses = getThemeClasses(theme);
	const { block = [] } = postData;
	const [firstBlock] = block;

	return (
		<div id="popup" className="my-5 items-center w-full justify-center">
			<div
				className={`w-full justify-center p-2 shadow-lg rounded-[.7em] grid grid-cols-1  ${themeClasses.backgroundColor}`}
			>
				{firstBlock && (
					<>
						<div
							className={`flex  p-1 rounded-[.6em] h-auto w-full justify-between  ${themeClasses.topBackgroundColor} `}
						>
							<SanityImage
								image={firstBlock.image}
								width={200}
								height={200}
								priority={true}
								alt={firstBlock.image?.alt || "no title"}
								classesWrapper="h-[50px] max-w-[50px] object-cover rounded-[.5em]"
							/>
							<Link
								href={`/posts/${postData.slug.current}`}
								className={`${monomaniac.className} ${themeClasses.textColor} pl-2 flex items-center leading-[1em] font-bold text-sm lg:text-md w-1/2`}
							>
								{firstBlock.heading || "no title"}
							</Link>
							<span
								className={`${monomaniac.className} ${themeClasses.textColor} w-auto pl-2 pt-1 leading-[1em] flex items-center h-auto mb-2 text-[.6em] uppercase tracking-widest`}
							>
								{formatDate(firstBlock.publicationDate)}
							</span>
							<DialogButton onClose={onClose} theme={theme} />
						</div>

						<div className="w-full h-auto flex flex-col relative">
							<h4
								className={`${cairo.className} ${themeClasses.textColor} leading-7 p-4 text-xl`}
							>
								{firstBlock.subheading || "no title"}
							</h4>

							<div className="flex relative justify-between items-center">
								<TeamLink team={firstBlock?.team} theme={theme} />
								<Link
									href={`/posts/${postData.slug.current}`}
									className={`${monomaniac.className} ${themeClasses.buttonTextColor} ${themeClasses.buttonBackgroundColor} right-2 absolute bottom-1 flex text-lg justify-center items-center px-4 rounded-[.7em] pt-1 pb-2 hover:transition-colors`}
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

const InternalLink = ({ slug, children, theme }) => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [previewPostData, setPreviewPostData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const themeClasses = getThemeClasses(theme);

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
			<Link href="#popup" onClick={openDialog}>
				<span className={`${monomaniac.className} text-xl  underline`}>
					{children}
				</span>
				<span
					className={`${monomaniac.className} pt-[3px] pb-[5px] pr-2 pl-2 ml-2 text-[16px] bg-[#c4b5fd] rounded-full`}
				>
					POST
				</span>
			</Link>
			<ArticlePreviewDialog
				isOpen={isDialogOpen}
				onClose={() => setDialogOpen(false)}
				postData={previewPostData}
				theme={theme}
			/>
			{isDialogOpen && isLoading && <LoadingIndicator />}
		</>
	);
};

export default InternalLink;

const LoadingIndicator = () => (
	<div className="flex my-4 items-center justify-center">
		<div className="w-full h-auto flex justify-center items-center p-4 bg-gray-300 shadow-lg rounded-lg">
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
