import TeamItem from "@/components/items/TeamItem";
import { teamBySlugQuery } from "@/sanity/lib//queries";
import { sanityFetch } from "@/sanity/lib/client";
import { generateStaticSlugs } from "@/sanity/lib/generateStaticSlugs";
import { TeamPayload } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

import React from "react";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return generateStaticSlugs("team");
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generatePageMetadata<TeamPayload>(
    {
      query: teamBySlugQuery,
      slug: params.slug,
      tags: ["team"],
    },
    parent
  );
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
    <div className="flex h-full w-full flex-col items-center justify-center bg-black text-black ">
      <TeamItem team={team} blocks={blocks} socialLinks={socialLinks} />
    </div>
  );
}
