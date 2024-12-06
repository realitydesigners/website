"use client";
import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/Blocks";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import React from "react";
import {
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const getSocialIcon = (name: string) => {
  const icons = {
    youtube: <FaYoutube size={24} />,
    instagram: <FaInstagram size={24} />,
    twitter: <FaXTwitter size={24} />,
    tiktok: <FaTiktok size={24} />,
    linkedin: <FaLinkedin size={24} />,
    github: <FaGithub size={24} />,
    website: <FaGlobe size={24} />,
  };
  return icons[name.toLowerCase()] || null;
};

const SocialLink = ({ href, children, name }) => (
  <Link
    href={href}
    className="rounded-[.25em] border border-gray-600/50 p-3 text-center hover:bg-gray-200 hover:text-black flex items-center gap-2 justify-center"
  >
    {getSocialIcon(name)}
    {children}
  </Link>
);

const TeamItem = ({ team, blocks, socialLinks }) => {
  const { role, name, scene } = team;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black text-black ">
      <div className="block  h-[60vh] w-full bg-black lg:h-[80vh]">
        <Spline className="w-full" scene={scene || ""} />
      </div>
      <div className="flex w-full o flex-col items-center justify-center gap-2 p-4">
        <h1
          className={` font-russo uppercase text-6xl font-bold text-gray-200`}
        >
          {name}
        </h1>
        <h2
          className={` font-kodemono py-6 uppercase text-xl font-normal text-gray-400`}
        >
          {role}
        </h2>
      </div>

      <div
        className={` font-kodemono mb-4 grid grid-cols-2 gap-4 p-2 text-xl font-bold uppercase tracking-wide text-gray-200 md:grid-cols-4`}
      >
        {socialLinks.map(({ name, url }) => (
          <SocialLink key={name} href={url} name={name}>
            {name}
          </SocialLink>
        ))}
      </div>

      {blocks?.map((block, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Blocks key={index} block={block as BlockProps} />
      ))}
    </div>
  );
};

export default TeamItem;
