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
  posts: "from-purple-500/20 to-blue-500/20",
  img: "from-blue-500/20 to-cyan-500/20",
  audio: "from-green-500/20 to-emerald-500/20",
  video: "from-red-500/20 to-orange-500/20",
  quote: "from-yellow-500/20 to-amber-500/20",
  team: "from-pink-500/20 to-rose-500/20",
  category: "from-violet-500/20 to-purple-500/20",
  library: "from-indigo-500/20 to-blue-500/20",
  model: "from-cyan-500/20 to-teal-500/20",
  glossary: "from-teal-500/20 to-green-500/20",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contentTypes.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.type}
                onClick={() => handleTypeSelect(item)}
                className="group relative p-6 rounded-xl bg-gradient-to-br from-black via-[#0a0a0a]/80 to-black 
                  border border-transparent hover:border-white/10 transition-all duration-300
                  hover:shadow-lg hover:shadow-black/20"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${
                      gradients[item.type as keyof typeof gradients]
                    } backdrop-blur-sm group-hover:scale-110 group-hover:rotate-[8deg] transition-all duration-300`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/60">{item.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
