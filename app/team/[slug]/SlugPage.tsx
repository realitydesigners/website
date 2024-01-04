"use client";
import Blocks from "@/components/blocks/Blocks";
import { monomaniac } from "@/fonts";
import type { TeamPayload } from "@/types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader/rsc";
import Link from "next/link";

interface SplineViewerProps extends React.HTMLAttributes<HTMLElement> {
	url: string;
}
declare global {
	namespace JSX {
		interface IntrinsicElements {
			"spline-viewer": SplineViewerProps;
		}
	}
}

export interface PageProps {
	data: TeamPayload | null;
	encodeDataAttribute?: EncodeDataAttributeCallback;
}

// Reusable SocialLink Component
const SocialLink = ({ href, children }) => (
	<Link
		href={href}
		className="p-3 border border-gray-600/50 text-center rounded-[.25em] hover:bg-gray-200 hover:text-black"
	>
		{children}
	</Link>
);

const Page: React.FC<PageProps> = ({ data }) => {
	const { role, name, bio, scene, instagram, twitter, website, tiktok } =
		data ?? {};

	// Social media links data
	const socialLinks = [
		{ name: "Instagram", url: instagram },
		{ name: "Twitter", url: twitter },
		{ name: "Website", url: website },
		{ name: "TikTok", url: tiktok },
	].filter((link) => link.url); // Filter out undefined URLs

	return (
		<div className="w-full flex flex-col h-full text-black justify-center items-center bg-black ">
			<div className="w-full h-full bg-black block">
				<spline-viewer
					className="w-full h-[80vh] lg:h-[90vh]"
					url={scene || ""}
				/>
			</div>
			<div className="w-full p-4 flex flex-col justify-center items-center gap-2">
				<h1
					className={`${monomaniac.className} text-6xl font-bold text-gray-200`}
				>
					{name}
				</h1>
				<h2
					className={`${monomaniac.className} text-3xl font-normal text-gray-400`}
				>
					{role}
				</h2>
			</div>

			<div
				className={`${monomaniac.className} grid grid-cols-2 md:grid-cols-4 text-gray-200 tracking-wide text-xl font-bold gap-4 p-2 uppercase mb-4`}
			>
				{socialLinks.map(({ name, url }) => (
					<SocialLink key={name} href={url}>
						{name}
					</SocialLink>
				))}
			</div>

			{data?.block?.map((block, index) => (
				<Blocks key={`${block._type}-${index}`} block={block} />
			))}
		</div>
	);
};

export default Page;
