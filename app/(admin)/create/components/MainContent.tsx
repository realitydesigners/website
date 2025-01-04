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
} from "react-icons/ri";
import { useDocument } from "../layout";

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
    // Create a new document with default structure based on type
    const newDoc: any = {
      _type: type.type,
      _id: `drafts.new-${Math.random().toString(36).substring(2, 15)}`,
    };

    // Add type-specific defaults
    if (type.type === "posts") {
      newDoc.block = [type.defaultBlock];
    }

    setSelectedDoc(newDoc);
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">
          What would you like to create today?
        </h1>
        <p className="text-white/60 mb-8">
          Choose a content type to get started
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.type}
                onClick={() => handleTypeSelect(type)}
                className="group p-4 bg-black/20 hover:bg-black/40 border border-white/5 hover:border-white/10 
                  rounded-xl transition-all duration-200 flex flex-col items-center text-center"
              >
                <div
                  className="w-12 h-12 mb-3 rounded-lg bg-blue-500/10 text-blue-400 
                  flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                >
                  <Icon size={24} />
                </div>
                <h3 className="font-medium text-white mb-1">{type.title}</h3>
                <p className="text-xs text-white/60">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
