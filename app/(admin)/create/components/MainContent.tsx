"use client";

import {
  RiFileTextLine,
  RiImageLine,
  RiMusicLine,
  RiVideoLine,
  RiChatQuoteLine,
  RiTeamLine,
  RiFolderLine,
  RiBookLine,
  RiGamepadLine,
  RiBookmarkLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { useDocument } from "../layout";

const gradients = {
  posts: "[20deg] from-purple-500/20 via-indigo-400/10 to-blue-500/20",
  img: "[20deg] from-sky-500/20 via-blue-400/10 to-cyan-500/20",
  audio: "[20deg] from-emerald-500/20 via-green-400/10 to-teal-500/20",
  video: "[20deg] from-rose-500/20 via-red-400/10 to-orange-500/20",
  quote: "[20deg] from-amber-500/20 via-yellow-400/10 to-orange-500/20",
  team: "[20deg] from-fuchsia-500/20 via-pink-400/10 to-rose-500/20",
  category: "[20deg] from-violet-500/20 via-purple-400/10 to-fuchsia-500/20",
  library: "[20deg] from-blue-500/20 via-indigo-400/10 to-violet-500/20",
  model: "[20deg] from-cyan-500/20 via-sky-400/10 to-blue-500/20",
  glossary: "[20deg] from-teal-500/20 via-emerald-400/10 to-green-500/20",
};

const contentTypes = [
  {
    title: "Posts",
    type: "posts",
    icon: RiFileTextLine,
    description: "Create a new blog post or article",
    defaultBlock: {
      _type: "headingBlock",
      _key: Math.random().toString(36).substring(2, 15),
      heading: "",
      subheading: "",
    },
  },
  {
    title: "Image",
    type: "img",
    icon: RiImageLine,
    description: "Upload and manage images",
  },
  {
    title: "Audio",
    type: "audio",
    icon: RiMusicLine,
    description: "Upload audio files",
  },
  {
    title: "Video",
    type: "video",
    icon: RiVideoLine,
    description: "Add video content",
  },
  {
    title: "Quote",
    type: "quote",
    icon: RiChatQuoteLine,
    description: "Add memorable quotes",
  },
  {
    title: "Team",
    type: "team",
    icon: RiTeamLine,
    description: "Manage team members",
  },
  {
    title: "Category",
    type: "category",
    icon: RiFolderLine,
    description: "Organize content",
  },
  {
    title: "Library",
    type: "library",
    icon: RiBookLine,
    description: "Manage library resources",
  },
  {
    title: "Model",
    type: "model",
    icon: RiGamepadLine,
    description: "Add 3D models",
  },
  {
    title: "Glossary",
    type: "glossary",
    icon: RiBookmarkLine,
    description: "Define terms",
  },
];

interface MainContentProps {
  onTypeSelect: (type: string) => void;
}

export function MainContent({ onTypeSelect }: MainContentProps) {
  const { setSelectedDoc } = useDocument();

  const handleTypeSelect = (type: any) => {
    onTypeSelect(type.type);
    const newDoc: {
      _type: string;
      _id: string;
      block?: Array<{
        _type: string;
        _key: string;
        heading: string;
        subheading: string;
      }>;
    } = {
      _type: type.type,
      _id: `drafts.${Math.random().toString(36).substring(2, 15)}`,
    };

    if (type.type === "posts") {
      newDoc.block = [type.defaultBlock];
    }

    setSelectedDoc(newDoc);
  };

  return (
    <div className="flex-1 p-8">
      <div className="w-full flex pt-12 flex-col justify-center items-center mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">
          What would you like to create today?
        </h1>
        <p className="text-md text-white/70 mb-8">
          Choose a content type to get started
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentTypes.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.type}
                className="group p-[1px] rounded-xl bg-[linear-gradient(20deg,transparent_0%,var(--tw-gradient-from)_20%,var(--tw-gradient-via)_50%,var(--tw-gradient-to)_80%,transparent_100%)] from-white/10 via-white/5 to-transparent hover:from-white/20 hover:via-white/10 hover:to-transparent transition-all duration-500 relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.3),transparent)] before:-translate-x-[100%] before:opacity-0 hover:before:translate-x-[100%] hover:before:opacity-100 before:transition-all before:duration-700 before:ease-out"
              >
                <button
                  onClick={() => handleTypeSelect(item)}
                  className="relative w-full p-6 rounded-xl bg-[linear-gradient(20deg,#000_0%,#0a0a0a_50%,#000_100%)] flex flex-col items-center text-center space-y-4 z-10"
                >
                  <div
                    className={`p-3 rounded-lg bg-[linear-gradient(20deg,transparent_0%,var(--tw-gradient-from)_20%,var(--tw-gradient-via)_50%,var(--tw-gradient-to)_80%,transparent_100%)] ${
                      gradients[item.type as keyof typeof gradients]
                    } backdrop-blur-sm group-hover:scale-105 transition-all duration-500`}
                  >
                    <Icon size={24} className="text-white/90" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/40">{item.description}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
