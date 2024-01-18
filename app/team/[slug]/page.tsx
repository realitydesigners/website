import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/types";
import { monomaniac } from "@/fonts";
import { teamBySlugQuery } from "@/sanity/lib//queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { TeamPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { decl } from "postcss";
import React from "react";

type Props = {
	params: { slug: string };
};

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

const SocialLink = ({ href, children }) => (
	<Link
		href={href}
		className="p-3 border border-gray-600/50 text-center rounded-[.25em] hover:bg-gray-200 hover:text-black"
	>
		{children}
	</Link>
);

export async function generateStaticParams() {
	return generateStaticSlugs("team");
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const metadataBaseUrl =
		process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000";
	const team = await sanityFetch<TeamPayload>({
		query: teamBySlugQuery,
		tags: ["team"],
		qParams: { slug: params.slug },
	});
	//@ts-ignore
	const ogImage = urlForOpenGraphImage(team?.image);
	const metadataBase = new URL(metadataBaseUrl);

	return {
		title: team?.name,
		description: team?.shortBio || (await parent).description,
		openGraph: ogImage
			? {
					images: [ogImage, ...((await parent).openGraph?.images || [])],
			  }
			: {},
		metadataBase,
	};
}

export default async function PageSlugRoute({ params }: Props) {
	const team = await sanityFetch<TeamPayload>({
		query: teamBySlugQuery,
		qParams: { slug: params.slug },
		tags: [`category:${params.slug}`],
	});

	if (!team) {
		return <div>Loading...</div>;
	}

	const { role, name, bio, scene, instagram, twitter, website, tiktok } = team;

	const blocks = team?.block || [];

	const socialLinks = [
		{ name: "Instagram", url: instagram },
		{ name: "Twitter", url: twitter },
		{ name: "Website", url: website },
		{ name: "TikTok", url: tiktok },
	].filter((link) => link.url);

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

			{blocks?.map((block) => (
				<Blocks block={block as BlockProps} />
			))}
		</div>
	);
}
