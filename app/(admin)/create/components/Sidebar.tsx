"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { usePathname } from "next/navigation";

const contentTypes = [
  { title: "Posts", type: "posts", icon: "📄" },
  { title: "Image", type: "img", icon: "🖼️" },
  { title: "Audio", type: "audio", icon: "🎵" },
  { title: "Video", type: "video", icon: "🎥" },
  { title: "Quote", type: "quote", icon: "💭" },
  { title: "Team", type: "team", icon: "👥" },
  { title: "Category", type: "category", icon: "📁" },
  { title: "Library", type: "library", icon: "📚" },
  { title: "Model", type: "model", icon: "🎮" },
  { title: "Glossary", type: "glossary", icon: "📖" },
];

interface SidebarProps {
  onDocumentSelect: (doc: any) => void;
}

export function Sidebar({ onDocumentSelect }: SidebarProps) {
  const [selectedType, setSelectedType] = useState("posts");
  const [documents, setDocuments] = useState<any[]>([]);
  const pathname = usePathname();

  const fetchDocuments = useCallback(async (type: string) => {
    const query = `*[_type == "${type}"] {
      _id,
      _type,
      block,
      "title": block[0].heading
    }`;
    const results = await client.fetch(query);
    setDocuments(results);
    setSelectedType(type);
  }, []);

  const getDocumentTitle = (doc: any) => {
    if (doc._type === "posts" && doc.block && doc.block[0]) {
      return doc.block[0].heading || "Untitled";
    }
    return doc.title || doc.heading || doc.name || "Untitled";
  };

  return (
    <div className="w-64 h-screen bg-black/50 border-r border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Content</h2>
      </div>

      <div className="flex-1 overflow-auto">
        {contentTypes.map((item) => (
          <button
            key={item.type}
            onClick={() => fetchDocuments(item.type)}
            className={`w-full px-4 py-2 flex items-center space-x-2 hover:bg-white/5 transition-colors ${
              selectedType === item.type ? "bg-white/10" : ""
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-sm text-white/90">{item.title}</span>
          </button>
        ))}
      </div>

      {documents.length > 0 && (
        <div className="border-t border-white/10">
          <div className="p-4">
            <h3 className="text-sm font-medium text-white/60 mb-2">
              Documents
            </h3>
            <div className="space-y-1">
              {documents.map((doc) => (
                <button
                  key={doc._id}
                  onClick={() => onDocumentSelect(doc)}
                  className="w-full px-4 py-2 text-sm text-white/80 hover:bg-white/5 rounded cursor-pointer text-left"
                >
                  {getDocumentTitle(doc)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
