import Link from "next/link";
import React from "react";
import { SanityImage } from "@/components/global/Images";
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
    youtube: <FaYoutube size={20} />,
    instagram: <FaInstagram size={20} />,
    twitter: <FaXTwitter size={20} />,
    tiktok: <FaTiktok size={20} />,
    linkedin: <FaLinkedin size={20} />,
    github: <FaGithub size={20} />,
    website: <FaGlobe size={20} />,
  };
  return icons[name.toLowerCase()] || null;
};

const SocialLink = ({ href, name }) => (
  <Link
    href={href}
    className="text-gray-400 hover:text-gray-200 transition-colors"
    aria-label={name}
  >
    {getSocialIcon(name)}
  </Link>
);

const TeamBlock = ({ block }) => {
  if (block?._type !== "teamBlock" || !block?.team) {
    return null;
  }

  // Transform social links from team data
  const socialLinks = [];
  if (block.team.youtube)
    socialLinks.push({ name: "YouTube", url: block.team.youtube });
  if (block.team.instagram)
    socialLinks.push({ name: "Instagram", url: block.team.instagram });
  if (block.team.twitter)
    socialLinks.push({ name: "Twitter", url: block.team.twitter });
  if (block.team.tiktok)
    socialLinks.push({ name: "TikTok", url: block.team.tiktok });
  if (block.team.linkedin)
    socialLinks.push({ name: "LinkedIn", url: block.team.linkedin });
  if (block.team.github)
    socialLinks.push({ name: "GitHub", url: block.team.github });
  if (block.team.website)
    socialLinks.push({ name: "Website", url: block.team.website });

  return (
    <div className="flex h-full w-full justify-center bg-black py-4">
      <div className="flex w-11/12 flex-col rounded-2xl bg-gradient-to-r from-blue-200/10 to-blue-100/5 p-4 shadow-lg md:w-1/2 lg:w-1/3">
        <div className="flex w-full items-center justify-start">
          {block.team?.image && (
            <div className="flex items-center">
              <SanityImage
                image={block.team.image}
                alt={`Team member image for ${block.team.name}`}
                width={300}
                height={300}
                priority={true}
                classesWrapper="h-[5em] w-[5em] max-h-[5em] max-w-[5em] object-cover cover rounded-2xl"
              />
              <div className="ml-4 flex flex-col">
                <p className="mb-2 font-russo text-xl text-white font-bold uppercase leading-none tracking-wide">
                  {block.team.name}
                </p>
                <span className="font-kodemono text-xs uppercase leading-none tracking-widest text-gray-200">
                  {block.team.role}
                </span>
              </div>
            </div>
          )}
        </div>
        <p className="font-kodemono mb-4 pt-4 text-sm leading-normal text-gray-200/50">
          {block.team.shortBio}
        </p>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex gap-4 mb-6 px-2 justify-center">
            {socialLinks.map(({ name, url }) => (
              <SocialLink key={name} href={url} name={name} />
            ))}
          </div>
        )}

        <div className="flex justify-center rounded-lg bg-blue-100/5 hover:bg-blue-100/10">
          <Link
            href={`/team/${block.team.slug.current}`}
            className="flex font-kodemono items-center p-2 text-sm font-bold uppercase text-gray-200"
          >
            <span>View Profile</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M14.707 9.293a1 1 0 0 0-1.414-1.414L10 11.586 6.707 8.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamBlock;
