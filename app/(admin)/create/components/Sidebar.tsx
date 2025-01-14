"use client";

import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { usePathname } from "next/navigation";
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
  RiArrowRightSLine,
} from "react-icons/ri";

const contentTypes = [
  { title: "Posts", type: "posts", icon: RiFileTextLine },
  { title: "Image", type: "img", icon: RiImageLine },
  { title: "Audio", type: "audio", icon: RiMusicLine },
  { title: "Video", type: "video", icon: RiVideoLine },
  { title: "Quote", type: "quote", icon: RiChatQuoteLine },
  { title: "Team", type: "team", icon: RiTeamLine },
  { title: "Category", type: "category", icon: RiFolderLine },
  { title: "Library", type: "library", icon: RiBookLine },
  { title: "Model", type: "model", icon: RiGamepadLine },
  { title: "Glossary", type: "glossary", icon: RiBookmarkLine },
];

interface SidebarProps {
  onDocumentSelect: (doc: any) => void;
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

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

export function Sidebar({
  onDocumentSelect,
  selectedType,
  onTypeSelect,
}: SidebarProps) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const fetchDocuments = useCallback(
    async (type: string) => {
      setIsLoading(true);
      try {
        let query = '';
        
        switch (type) {
          case "posts":
            query = `*[_type == "posts"] {
              _id,
              _type,
              block[0] {
                heading,
                subheading
              },
              _createdAt
            }`;
            break;
          case "quote":
            query = `*[_type == "quote"] {
              _id,
              _type,
              quote,
              _createdAt
            }`;
            break;
          case "team":
            query = `*[_type == "team"] {
              _id,
              _type,
              name,
              role,
              _createdAt
            }`;
            break;
          default:
            query = `*[_type == "${type}"] {
              _id,
              _type,
              title,
              _createdAt
            }`;
        }

        const results = await client.fetch(query + ' | order(_createdAt desc)');
        setDocuments(results);
        onTypeSelect(type);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onTypeSelect]
  );

  // Fetch documents on mount and when selectedType changes
  useEffect(() => {
    fetchDocuments(selectedType);
  }, [selectedType, fetchDocuments]);

  const getDocumentTitle = (doc: any) => {
    if (!doc) return "Untitled";

    switch (doc._type) {
      case "posts":
        return doc.block?.[0]?.heading || "Untitled";
      case "img":
        return doc.title || "Untitled";
      case "video":
        return doc.title || "Untitled";
      case "audio":
        return doc.title || "Untitled";
      case "quote":
        return doc.quote?.substring(0, 30) + "..." || "Untitled";
      case "team":
        return doc.name || "Untitled";
      case "category":
        return doc.title || "Untitled";
      case "library":
        return doc.title || "Untitled";
      case "model":
        return doc.title || "Untitled";
      case "glossary":
        return doc.title || "Untitled";
      default:
        return "Untitled";
    }
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-black via-[#0a0a0a]/90 to-black border-r border-white/10 flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="p-3">
          <div className="space-y-0.5">
            {contentTypes.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedType === item.type;
              return (
                <button
                  key={item.type}
                  onClick={() => onTypeSelect(item.type)}
                  className={`w-full px-3 py-2 flex items-center justify-between rounded-lg
                    ${
                      isSelected
                        ? "bg-gradient-to-br from-black via-[#0a0a0a]/80 to-black border border-white/10"
                        : "hover:bg-black/40 border border-transparent"
                    } transition-all duration-300`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-1.5 rounded ${
                        isSelected
                          ? `bg-gradient-to-br ${gradients[item.type as keyof typeof gradients]}`
                          : "bg-black/40"
                      } backdrop-blur-sm`}
                    >
                      <Icon size={16} className="flex-shrink-0 text-white" />
                    </div>
                    <span
                      className={`text-sm font-medium ${isSelected ? "text-white" : "text-white/70"}`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <RiArrowRightSLine
                    size={16}
                    className={`transform transition-transform duration-300 text-white/70
                      ${isSelected ? "rotate-90" : ""}`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {documents.length > 0 && (
        <div className="border-t border-white/10">
          <div className="p-3">
            <h3 className="text-xs font-medium text-white/60 px-3 mb-2">
              {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} (
              {documents.length})
            </h3>
            <div className="space-y-0.5 max-h-[250px] overflow-y-auto">
              {documents.map((doc) => (
                <button
                  key={doc._id}
                  onClick={() => onDocumentSelect(doc)}
                  className="w-full px-3 py-2 text-sm text-white/70 hover:bg-white/5 
                    rounded-lg transition-colors flex items-center space-x-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="truncate">{getDocumentTitle(doc)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="animate-pulse text-white/60">Loading...</div>
        </div>
      )}
    </div>
  );
}
