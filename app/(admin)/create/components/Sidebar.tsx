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
  RiAddLine,
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
        const query = `*[_type == "${type}"] {
        _id,
        _type,
        block,
        "title": block[0].heading,
        _createdAt
      } | order(_createdAt desc)`;
        const results = await client.fetch(query);
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
    if (doc._type === "posts" && doc.block && doc.block[0]) {
      return doc.block[0].heading || "Untitled";
    }
    return doc.title || doc.heading || doc.name || "Untitled";
  };

  return (
    <div className="w-64 h-screen bg-black/50 border-r border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Content</h2>
          <Link
            href="/create"
            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            <RiAddLine size={18} />
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-3">
          <div className="space-y-0.5">
            {contentTypes.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.type}
                  onClick={() => onTypeSelect(item.type)}
                  className={`w-full px-3 py-2 flex items-center justify-between rounded-lg
                    ${
                      selectedType === item.type
                        ? "bg-blue-500/10 text-blue-400"
                        : "text-white/70 hover:bg-white/5"
                    } transition-all duration-200`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon size={16} className="flex-shrink-0" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <RiArrowRightSLine
                    size={16}
                    className={`transform transition-transform duration-200
                      ${selectedType === item.type ? "rotate-90" : ""}`}
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
                  className="w-full px-3 py-2 text-sm text-white/80 hover:bg-white/5 
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
