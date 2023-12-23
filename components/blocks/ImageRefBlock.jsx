"use client";
import Link from "next/link";
import { SanityImage } from "@/components/global/Images";
import { cairo, staatliches } from "@/fonts";
import { useState } from "react";

const ImageCard = ({ title, slug, image, className }) => {
	switch (className) {
		case "card-1":
			return (
				<div className="relative p-4 mb-6 ">
					<div className="relative justify-center rounded-[1.3em] lg:rounded-[1.8em] overflow-hidden  items-center flex h-auto bg-gray-400 w-full ">
						{image?.image && (
							<SanityImage
								image={image.image}
								width={1500}
								height={1500}
								priority={true}
								alt={`Cover Image for ${title}`}
								classesWrapper=" h-[325px] md:h-[600px] lg:h-[800px] w-full  contain h-full object-cover"
							/>
						)}
					</div>
					{image?.team && (
						<div className="relative rounded-b-xl   pt-4 bottom-0 flex h-auto w-full pl-4  text-gray-200">
							<SanityImage
								image={image.team.image}
								alt={`Cover Image for ${image.team.name}`}
								width={100}
								height={100}
								priority={true}
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

		case "card-2":
			return (
				<div className="relative p-4 mb-6 ">
					<div className="relative justify-center rounded-[1.3em] lg:rounded-[1.8em] overflow-hidden  items-center flex h-auto bg-gray-400 w-full ">
						{image?.image && (
							<SanityImage
								image={image.image}
								width={500}
								height={500}
								priority={true}
								alt={`Cover Image for ${title}`}
								classesWrapper=" h-[325px] md:h-[600px] lg:h-[800px] w-full  contain h-full object-cover"
							/>
						)}
					</div>

					{image?.team && (
						<div className="relative rounded-b-xl -mt-16  pt-4 bottom-0 flex h-auto w-full pl-4  ">
							<SanityImage
								image={image.team.image}
								width={100}
								height={100}
								priority={true}
								alt={`Cover Image for ${image.team.name}`}
								classesWrapper=" border mr-2 max-h-[30px] max-w-[30px] rounded-full"
							/>
							<div className=" justify-center relative flex flex-col items-start text-xs uppercase leading-none">
								<Link href="/" className="text-gray-400 font-mono text-[10px]">
									BY
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

const ImageRefWrapper = ({ value }) => {
	const { image, className } = value;

	return (
		<div>
			<div className={className}>
				<ImageCard image={image} className={className} />
			</div>
		</div>
	);
};

export default ImageRefWrapper;
