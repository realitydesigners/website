import { SanityImage } from "@/components/global/Images";
import React from "react";

const QuoteRefBlock = ({ quote, className, image }) => {
	if (!quote) {
		return null;
	}

	return <QuoteCard quote={quote} image={image} className={className} />;
};

const QuoteCard = ({ quote, image, className }) => {
	// Include value prop here
	switch (className) {
		case "card-1":
			return (
				<div className="flex w-full items-center justify-center py-6">
					<div className="block md:w-4/5 lg:w-2/3 w-11/12 rounded-2xl overflow-hidden bg-black border rounded-[1em] border-gray-600">
						{image && (
							<div className="relative w-full">
								<SanityImage
									image={image}
									alt={`Cover Image for ${quote}`}
									width={800}
									height={800}
									classesWrapper="absolute inset-0 w-full h-full opacity-50 object-cover z-0"
									priority={true}
								/>
								<div className="absolute inset-0 z-10 flex items-center justify-center">
									<h4 className="text-2xl sm:text-5xl lg:text-6xl font-bold p-4 text-center tracking-wide uppercase leading-none text-blue-100 flex items-center justify-center">
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
				<div className="flex w-full items-center justify-center py-4 p-2">
					<div className="md:w-1/2 lg:w-1/2 w-full rounded-2xl h-full bg-black border rounded-[1em]  border-gray-600 relative">
						{image && (
							<div className="relative flex-col  flex w-full h-full">
								<div className=" h-full w-full absolute">
									<SanityImage
										image={image}
										alt={`Cover Image for ${quote}`}
										width={800}
										height={800}
										classesWrapper="inset-0 w-full h-full object-cover z-0 rounded-[1em] opacity-25" // Adjust opacity as needed (0 to 100)
										priority={true}
									/>
								</div>
								<div className="w-full z-10 h-full justify-center items-center p-4">
									<h4 className="text-2xl lg:text-3xl font-bold leading-[1.2em] text-center tracking-wide uppercase leading-none text-blue-100">
										{quote}
									</h4>
								</div>
							</div>
						)}
					</div>
				</div>
			);
	}
};

export default React.memo(QuoteRefBlock);
