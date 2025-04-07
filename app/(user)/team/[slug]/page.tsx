import TeamItem from "@/components/items/TeamItem";
import { teamBySlugQuery } from "@/sanity/lib//queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { urlForOpenGraphImage } from "@/sanity/lib/utils";
import { TeamPayload } from "@/types";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return generateStaticSlugs("team");
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const resolvedParams = await props.params;
  const team = await sanityFetch<TeamPayload>({
    query: teamBySlugQuery,
    tags: ["team"],
    qParams: { slug: resolvedParams.slug },
  });
  // @ts-ignore
  const ogImage = urlForOpenGraphImage(team?.image);

  return {
    title: team?.name || "Team Member",
    description: team?.shortBio || "Team member details",
    openGraph: {
      title: team?.name || "Team Member",
      description: team?.shortBio || "Team member details",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            alt: team?.name || "Team member image",
          },
        ],
      }),
    },
  };
}

export default async function TeamSlugRoute(props: Props) {
  const resolvedParams = await props.params;
  const team = await sanityFetch<TeamPayload>({
    query: teamBySlugQuery,
    qParams: { slug: resolvedParams.slug },
    tags: [`category:${resolvedParams.slug}`],
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
    <div className="flex h-full w-full flex-col items-center justify-center bg-black text-black ">
      <TeamItem team={team} blocks={blocks} socialLinks={socialLinks} />
    </div>
  );
}
