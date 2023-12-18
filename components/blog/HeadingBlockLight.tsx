import Link from "next/link";
import { SlugPostImage, TeamImageBox } from "@/components/global/Images";
import { jura, staatliches } from "@/fonts";

const HeadingBlockLight = ({ block }) => {
	if (block?._type !== "headingBlock") {
		return null;
	}

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

	return (
		<div className="w-full h-auto bg-gray-200 pt-20 lg:pt-32">
			<div className="w-full flex justify-center flex-wrap">
				<div className="w-11/12 flex items-center lg:hidden">
					<div className="flex w-full">
						<span
							className={`${staatliches.className} text-black ml-2  uppercase w-auto text-xs font-mono tracking-widest`}
						>
							PUBLISHED ON {formattedDate}
						</span>
					</div>
					{block.tags && block.tags.length > 0 && (
						<div className="flex">
							{block.tags.map((tag, index) => (
								<span
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={index}
									className={`${staatliches.className} text-xs h-auto flex uppercase font-mono font-semibold bg-black items-center justify-center p-1 pl-2 pr-2  tracking-widest text-gray-200 mr-1`}
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
				{block.image && (
					<div className="w-full flex-wrap lg:w-1/2 p-4 flex">
						<div className="w-full h-full object-cover object-contain">
							<SlugPostImage
								image={block.image}
								alt={`Cover Image for ${block.title}`}
								classesWrapper="h-full w-full rounded-[1em]"
							/>
						</div>
					</div>
				)}
				<div className="w-full lg:w-1/2 p-4 pr-4 lg:pr-20 flex pt-2 lg:pt-4 justify-center flex-cols">
					<div className="w-full">
						<div className="w-full hidden items-center lg:flex mb-6">
							<div className="flex w-full">
								<span
									className={`${staatliches.className}  text-black font-mono w-auto text-xs tracking-widest `}
								>
									PUBLISHED ON {formattedDate}
								</span>
							</div>
							{block.tags && block.tags.length > 0 && (
								<div className="flex">
									{block.tags.map((tag, index) => (
										<span
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
											className={`${staatliches.className} text-xs h-auto flex uppercase font-mono font-semibold p-1 pl-2 pr-2  bg-black items-center justify-center p-2 border tracking-wide text-gray-200 mr-1`}
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
						{block.heading && (
							<h1
								className={`${staatliches.className} text-5xl text-black leading-tightest mb-4 lg:text-6xl `}
							>
								{block.heading}
							</h1>
						)}
						{block.subheading && (
							<p
								className={`${jura.className}  w-full font-bold text-2xl  text-black leading-7 tracking-wide `}
							>
								{block.subheading}
							</p>
						)}
						<div className="w-auto h-auto flex items-center pt-4">
							{block.team && (
								<Link
									href={`/team/${block.team.slug.current}`}
									className={`${staatliches.className} `}
								>
									<div className="flex items-center p-2 w-full">
										{block.team?.image && (
											<div className="flex items-center">
												<TeamImageBox
													image={block.team.image}
													alt={`Team member image for ${block.team.name}`}
													classesWrapper="h-[30px] w-[30px] object-cover cover rounded-full"
												/>
												{block.team.name && (
													<span className="ml-2 uppercase text-black tracking-wide text-sm">
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
				</div>
			</div>
		</div>
	);
};

export default HeadingBlockLight;
