import TeamItem from "@/components/items/TeamItem";
import { teamBySlugQuery } from "@/sanity/lib//queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { TeamPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";

import React from "react";

type Props = {
	params: { slug: string };
};

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

	const { instagram, twitter, website, tiktok } = team;
	const blocks = team?.block || [];
	const socialLinks = [
		{ name: "Instagram", url: instagram },
		{ name: "Twitter", url: twitter },
		{ name: "Website", url: website },
		{ name: "TikTok", url: tiktok },
	].filter((link) => link.url);

	return (
		<div className="w-full flex flex-col h-full text-black justify-center items-center bg-black ">
			<TeamItem team={team} blocks={blocks} socialLinks={socialLinks} />
		</div>
	);
}
