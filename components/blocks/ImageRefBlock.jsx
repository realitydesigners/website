"use client";
import { SanityImage } from "@/components/global/Images";
import { cairo, staatliches } from "@/fonts";
import Link from "next/link";
import { useState } from "react";

const ImageRefCard = ({ title, slug, alt, image, className }) => {
	switch (className) {
		case "image-standard":
			return (
				<div className="flex justify-center items-center flex-col p-4  ">
					<div className="relative justify-center rounded-[1.3em] lg:rounded-[1.8em] overflow-hidden  items-center flex h-auto bg-gray-400 w-full lg:w-3/4 ">
						{image?.image && (
							<SanityImage
								image={image.image}
								width={2000}
								height={2000}
								priority={false}
								alt={`Cover Image for ${title}`}
								classesWrapper=" h-[325px] md:h-[600px] lg:h-[800px] w-full  contain h-full object-cover"
							/>
						)}
					</div>
					{image?.team && (
						<div className="relative rounded-b-xl   pt-4 bottom-0 flex h-auto w-full pl-4  text-gray-200 lg:w-3/4">
							<SanityImage
								image={image.team.image}
								alt={`Cover Image for ${image.team.name}`}
								width={100}
								height={100}
								priority={false}
								classesWrapper="mr-2 max-h-[30px] max-w-[30px] rounded-full"
							/>

							<div className=" justify-center relative flex flex-col items-start text-xs uppercase leading-none">
								<Link href="/" className="text-gray-600 font-mono text-[10px]">
									BY
								</Link>
								<Link
									href="/"
									className="text-black font-mono font-bold text-md"
								>
									{image.team.name}
								</Link>
							</div>
							<p className=" ml-4 inline-block cursor-pointer text-2xl font-bold text-black">
								→
							</p>
						</div>
					)}
				</div>
			);

		case "image-inset":
			return (
				<div className="flex justify-center items-center flex-col p-4">
					<div className="relative justify-center rounded-[1.2em]  overflow-hidden border border-t border-gray-600  items-center flex h-auto bg-gray-400 w-full lg:w-3/4 ">
						{image?.image && (
							<>
								<SanityImage
									image={image.image}
									width={2000}
									height={2000}
									priority={false}
									alt={`Cover Image for ${title}`}
									classesWrapper=" h-[325px] md:h-[600px] lg:h-[800px] w-full border border-gray-600   contain h-full object-cover"
								/>

								<p className="font-mono text-gray-600 uppercase tracking-wide ">
									{title}
								</p>
							</>
						)}
					</div>

					{image?.team && (
						<div className="relative rounded-b-[1.2em] pl-3 -mt-[50px] bg-gradient-to-t from-black to-transparent bottom-0 flex h-auto pt-3 pb-3 w-full lg:w-3/4">
							<SanityImage
								image={image.team.image}
								width={100}
								height={100}
								priority={false}
								alt={`Cover Image for ${image.team.name}`}
								classesWrapper="border mr-2 max-h-[30px] max-w-[30px] rounded-[2em]"
							/>

							<div className="justify-center relative flex flex-col items-start text-xs uppercase leading-none">
								<Link href="/" className="text-gray-400 font-mono text-[10px]">
									POSTED BY
								</Link>
								<Link
									href="/"
									className="text-gray-200 font-mono font-bold text-md"
								>
									{image.team.name}
								</Link>
							</div>
						</div>
					)}
				</div>
			);
	}
};

const ImageRefBlock = ({ value }) => {
	const { image, className } = value;

	return (
		<div>
			<div className={className}>
				<ImageRefCard image={image} className={className} />
			</div>
		</div>
	);
};

export default ImageRefBlock;
