"use client";
import { SanityImage } from "@/components/global/Images";
import { monomaniac } from "@/fonts";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React from "react";

const HeadingSplineBlock = ({ block }) => {
	const { className, url } = block;

	switch (className) {
		case "dark": {
			let publicationDate = block.publicationDate;

			if (!publicationDate && block.block) {
				const blockWithDate = block.block.find(
					(blockItem) => blockItem.publicationDate,
				);
				if (blockWithDate) {
					publicationDate = blockWithDate.publicationDate;
				}
			}

			const formattedDate = publicationDate
				? new Date(publicationDate).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
				  })
				: "Date not available";

			const renderCategory = block.category ? (
				<span
					className={`${monomaniac.className} text-xs  h-auto uppercase   font-semibold bg-gray-200 items-center justify-center p-1 pl-2 pr-2 tracking-widest text-black mr-1 whitespace-nowrap`}
				>
					{block.category.title}
				</span>
			) : null;

			return (
				<div className="w-full h-auto bg-black pt-20 lg:pt-32 pb-20 lg:pb-0">
					<div className="w-full flex justify-center flex-wrap">
						<div className="w-11/12 flex flex-wrap flex-cols items-center justify-between">
							<div className="flex w-auto ">
								<span
									className={`${monomaniac.className} text-gray-200 ml-2 uppercase w-auto text-xs   tracking-widest`}
								>
									POSTED ON {formattedDate}
								</span>
							</div>
							{renderCategory}
						</div>

						<div className="w-full lg:w-1/2 flex-col">
							{block.heading && (
								<h1
									className={`${monomaniac.className} text-5xl md:text-7xl p-4  text-gray-200 leading-tightest`}
								>
									{block.heading}
								</h1>
							)}
							{block.subheading && (
								<h2
									className={`${monomaniac.className}  w-full p-4  text-2xl  text-gray-300 leading-7 tracking-wide `}
								>
									{block.subheading}
								</h2>
							)}
						</div>
						<div className="w-full lg:w-3/4  pb-2 pl-2 ">
							<div className="w-full">
								{block.team && (
									<Link
										href={`/team/${block.team.slug.current}`}
										className={`${monomaniac.className} `}
									>
										<div className="flex p-2 w-auto">
											{block.team?.image && (
												<div className="flex items-center">
													<SanityImage
														image={block.team.image}
														alt={`Team member image for ${block.team.name}`}
														width={80}
														height={80}
														priority={true}
														classesWrapper=" h-[30px] w-[30px] object-cover cover rounded-[2em] "
													/>
													{block.team.name && (
														<span className="ml-2 uppercase text-gray-200 tracking-wide text-sm">
															{block.team.name}
														</span>
													)}
												</div>
											)}
										</div>
									</Link>
								)}
							</div>
						</div>

						<div className="h-[70vh] w-full lg:w-3/4  overflow-hidden p-2">
							<div className="w-full h-full rounded-[1em] shadow-lg overflow-hidden">
								<Spline scene={url} />
							</div>
						</div>
					</div>
				</div>
			);
		}
		default:
			return null;
	}
};

export default React.memo(HeadingSplineBlock);
