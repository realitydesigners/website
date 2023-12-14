import Link from "next/link";
import { jura, staatliches } from "@/fonts";
import QuoteImage from "@/components/shared/QuoteImage";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import media from "@/sanity/schemas/media";

// interface ImageBoxProps {
// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// 	image?: { asset?: any };
// 	alt?: string;
// 	width?: number;
// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// 	media?: any;
// 	height?: number;
// 	classesWrapper?: string;
// 	"data-sanity"?: string;
// }

// function SmallImage({
// 	image,
// 	alt = "Cover image",
// 	width = 600,
// 	height = 600,
// 	classesWrapper,
// 	...props
// }: ImageBoxProps) {
// 	const imageUrl = urlForImage(media?)?.url() ?? null;

// 	return (
// 		<div
// 			className={`w-full h-[50vw] lg:h-[20vw] overflow-hidden ${classesWrapper}`}
// 			data-sanity={props["data-sanity"]}
// 		>
// 			{imageUrl && (
// 				<Image
// 					priority={true}
// 					className="object-cover cover h-full w-full"
// 					alt={alt}
// 					width={width}
// 					height={height}
// 					src={imageUrl}
// 				/>
// 			)}
// 		</div>
// 	);
// }

const QuoteCard = ({
	quote,
	media,
	image,
	className,
	title,
	height,
	width,
}) => {
	switch (className) {
		case "card-1":
			return (
				<div className="flex w-full items-center justify-center mb-6 ">
					<div className="block md:w-4/5 lg:w-1/2 w-11/12 border bg-black rounded-2xl border-gray-600">
						<div className="relative p-3 z-20">
							<h4
								className={`${staatliches.className} text-3xl text-center lg:text-4xl p-6 font-bold uppercase leading-none text-gray-200 flex items-center`}
							>
								{quote}
							</h4>
						</div>
					</div>
				</div>
			);

		default:
			return (
				<div className="flex w-full items-center justify-center mb-6 ">
					<div className="block md:w-4/5 lg:w-1/2 w-11/12 border bg-black rounded-2xl border-gray-600">
						<div className="relative p-3 z-20">
							<h4
								className={`${staatliches.className} text-3xl text-center lg:text-4xl p-6 font-bold uppercase leading-none text-gray-200 flex items-center`}
							>
								{quote}
							</h4>
						</div>
					</div>
				</div>
			);
	}
};

const QuoteRefWrapper = ({ value }) => {
	const { quote, className } = value;

	if (!quote) {
		return null;
	}

	return (
		<QuoteCard
			quote={quote.quote}
			media={quote.mediaRef}
			className={className}
			image={quote.image}
			title={undefined}
			height={undefined}
			width={undefined}
		/>
	);
};

export default QuoteRefWrapper;
