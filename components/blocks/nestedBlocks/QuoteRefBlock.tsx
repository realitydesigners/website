import { SanityImage } from "@/components/global/Images";
import { monomaniac, play } from "@/fonts";
import Link from "next/link";
import React from "react";

const QuoteCard = ({ quote, media, image, className }) => {
	switch (className) {
		case "card-1":
			return (
				<div className="flex w-full items-center justify-center mb-6">
					<div className="block md:w-4/5 lg:w-2/3 w-11/12 rounded-2xl overflow-hidden bg-black border rounded-[1em] border-gray-600">
						{image && (
							<div className="relative w-full">
								{/* Image Container */}
								<SanityImage
									image={image}
									alt={`Cover Image for ${quote}`}
									width={800}
									height={800}
									classesWrapper="absolute inset-0 w-full h-full opacity-50 object-cover z-0"
									priority={true}
								/>

								{/* Text Container */}
								<div className="absolute inset-0 z-10 flex items-center justify-center">
									<h4
										className={`${monomaniac.className} text-3xl sm:text-5xl lg:text-6xl p-4 text-center tracking-wide uppercase leading-none text-gray-200 flex items-center justify-center`}
									>
										{quote}
									</h4>
								</div>
							</div>
						)}
					</div>
				</div>
			);

		default:
			return (
				<div className="flex w-full items-center justify-center mb-6 ">
					<div className="block md:w-4/5 lg:w-1/2 w-11/12 border bg-black rounded-2xl border-gray-600">
						<div className="relative p-3 z-20">
							<h4
								className={`${monomaniac.className} text-3xl text-center lg:text-4xl p-6 font-bold uppercase leading-none text-gray-200 flex items-center`}
							>
								{quote}
							</h4>
						</div>
					</div>
				</div>
			);
	}
};

const QuoteRefBlock = ({ value }) => {
	const { quoteRef, className } = value;

	if (!quoteRef) {
		return null;
	}

	return (
		<QuoteCard
			quote={quoteRef.quoteTitle}
			image={quoteRef.quoteImage}
			className={className}
			media={undefined}
		/>
	);
};

export default React.memo(QuoteRefBlock);
