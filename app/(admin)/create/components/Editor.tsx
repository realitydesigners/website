"use client";

import React, { useState, useCallback, useEffect } from "react";
import { writeClient } from "@/sanity/lib/client";
import { RichTextEditor } from "./RichTextEditor";
import { useDocument } from "../layout";
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
  RiArrowLeftLine,
  RiDraftLine,
  RiSendPlaneLine,
  RiCloseLine,
} from "react-icons/ri";

interface Block {
  _type: string;
  _key: string;
  heading?: string;
  subheading?: string;
  layout?: string;
  content?: any[];
  team?: any[];
}

const BLOCK_TYPES = {
  HEADING: "headingBlock",
  CONTENT: "contentBlock",
  TEAM: "teamBlock",
  IMAGE_CANVAS: "imageCanvasBlock",
  HEADING_SPLINE: "headingSplineBlock",
};

const LAYOUT_OPTIONS = [
  { title: "Dark", value: "dark" },
  { title: "Light", value: "light" },
  { title: "Transparent", value: "transparent" },
];

const contentTypes = {
  posts: { icon: RiFileTextLine, title: "Post" },
  img: { icon: RiImageLine, title: "Image" },
  audio: { icon: RiMusicLine, title: "Audio" },
  video: { icon: RiVideoLine, title: "Video" },
  quote: { icon: RiChatQuoteLine, title: "Quote" },
  team: { icon: RiTeamLine, title: "Team" },
  category: { icon: RiFolderLine, title: "Category" },
  library: { icon: RiBookLine, title: "Library" },
  model: { icon: RiGamepadLine, title: "Model" },
  glossary: { icon: RiBookmarkLine, title: "Glossary" },
};

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

interface EditorProps {
  selectedDoc: any;
}

export function Editor({ selectedDoc }: EditorProps) {
  const { setSelectedDoc } = useDocument();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (selectedDoc) {
      setBlocks(selectedDoc.block || []);
      setSlug(selectedDoc.slug?.current || "");
    } else {
      setBlocks([
        {
          _type: BLOCK_TYPES.HEADING,
          _key: Math.random().toString(36).substring(2, 15),
          heading: "",
          subheading: "",
        },
      ]);
      setSlug("");
    }
  }, [selectedDoc]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent, shouldPublish = false) => {
      e.preventDefault();

      try {
        const doc = {
          _type: selectedDoc?._type || "posts",
          block: blocks,
          slug: {
            _type: "slug",
            current: slug,
          },
        };

        let result;
        // Check if this is a completely new document (no _id) or an existing one
        if (!selectedDoc?._id || selectedDoc._id.startsWith("drafts.new-")) {
          // New document - use create
          const docId = shouldPublish
            ? Math.random().toString(36).substring(2, 15)
            : `drafts.${Math.random().toString(36).substring(2, 15)}`;

          result = await writeClient.create({
            ...doc,
            _id: docId,
          });
        } else {
          // Existing document - use patch
          const docId = shouldPublish
            ? selectedDoc._id.replace("drafts.", "")
            : `drafts.${selectedDoc._id.replace("drafts.", "")}`;

          result = await writeClient.patch(docId).set(doc).commit();
        }

        console.log(shouldPublish ? "Published:" : "Saved as draft:", result);
        setSelectedDoc(null);
        setBlocks([
          {
            _type: BLOCK_TYPES.HEADING,
            _key: Math.random().toString(36).substring(2, 15),
            heading: "",
            subheading: "",
          },
        ]);
        setSlug("");
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [blocks, selectedDoc, setSelectedDoc, slug]
  );

  const updateBlock = (index: number, updates: Partial<Block>) => {
    setBlocks((current) =>
      current.map((block, i) =>
        i === index ? { ...block, ...updates } : block
      )
    );
  };

  const addBlock = (type: string) => {
    const newBlock: Block = {
      _type: type,
      _key: Math.random().toString(36).substring(2, 15),
      ...(type === BLOCK_TYPES.CONTENT
        ? {
            layout: "dark",
            content: [
              {
                _type: "block",
                _key: Math.random().toString(36).substring(2, 15),
                style: "normal",
                children: [{ _type: "span", text: "" }],
              },
            ],
          }
        : {}),
      ...(type === BLOCK_TYPES.HEADING
        ? {
            heading: "",
            subheading: "",
          }
        : {}),
    };

    setBlocks((current) => [...current, newBlock]);
    setActiveBlock(blocks.length);
  };

  const removeBlock = (index: number) => {
    setBlocks((current) => current.filter((_, i) => i !== index));
    setActiveBlock(null);
  };

  const handleCancel = () => {
    setSelectedDoc(null);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#0a0a0a]">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setSelectedDoc(null)}
            className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white/70 hover:text-white/90 
              transition-all duration-300 flex items-center space-x-2 group"
          >
            <RiArrowLeftLine
              size={18}
              className="transform transition-transform group-hover:-translate-x-0.5"
            />
          </button>

          <div className="flex items-center space-x-3">
            {selectedDoc?._type &&
              contentTypes[selectedDoc._type as keyof typeof contentTypes] && (
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${gradients[selectedDoc._type as keyof typeof gradients]} backdrop-blur-sm`}
                >
                  {React.createElement(
                    contentTypes[selectedDoc._type as keyof typeof contentTypes]
                      .icon,
                    {
                      size: 20,
                      className: "text-white",
                    }
                  )}
                </div>
              )}
            <div>
              <h1 className="text-lg font-bold text-white">
                {selectedDoc?._type &&
                contentTypes[selectedDoc._type as keyof typeof contentTypes]
                  ? `Create ${contentTypes[selectedDoc._type as keyof typeof contentTypes].title}`
                  : "Create New Post"}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {selectedDoc && (
            <button
              onClick={handleCancel}
              className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white/70 hover:text-white/90 
                transition-all duration-300"
            >
              <RiCloseLine size={18} />
            </button>
          )}
          <button
            onClick={(e) => handleSubmit(e, false)}
            className="px-4 py-2 rounded-lg bg-gradient-to-br from-blue-600/50 to-indigo-600/50 
              hover:from-blue-600/60 hover:to-indigo-600/60 text-white border border-white/5 
              hover:border-white/10 transition-all duration-300 flex items-center space-x-2"
          >
            <RiDraftLine size={18} />
            <span>Save Draft</span>
          </button>
          <button
            onClick={(e) => handleSubmit(e, true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 
              hover:from-blue-700 hover:to-indigo-700 text-white border border-white/10 
              hover:border-white/20 transition-all duration-300 flex items-center space-x-2"
          >
            <RiSendPlaneLine size={18} />
            <span>Publish</span>
          </button>
        </div>
      </header>

      <div className="flex-1 p-8 space-y-6 overflow-auto">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-white/60">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="post-slug"
          />
        </div>

        {blocks.map((block, index) => (
          <div
            key={index}
            className={`p-4 bg-white/5 border ${
              activeBlock === index ? "border-blue-500" : "border-white/10"
            } rounded-md`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white/60">
                  {block._type}
                </span>
                {block._type === BLOCK_TYPES.CONTENT && (
                  <select
                    value={block.layout || "dark"}
                    onChange={(e) =>
                      updateBlock(index, { layout: e.target.value })
                    }
                    className="ml-4 bg-white/5 border border-white/10 rounded-md text-white text-sm p-1"
                  >
                    {LAYOUT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <button
                onClick={() => removeBlock(index)}
                className="text-white/40 hover:text-white/60"
              >
                Remove
              </button>
            </div>

            {block._type === BLOCK_TYPES.HEADING && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={block.heading || ""}
                    onChange={(e) =>
                      updateBlock(index, { heading: e.target.value })
                    }
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter heading..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Subheading
                  </label>
                  <input
                    type="text"
                    value={block.subheading || ""}
                    onChange={(e) =>
                      updateBlock(index, { subheading: e.target.value })
                    }
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subheading..."
                  />
                </div>
              </div>
            )}

            {block._type === BLOCK_TYPES.CONTENT && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Content
                  </label>
                  <div className="flex space-x-2 mb-4">
                    <button className="px-3 py-1 bg-white/10 rounded text-sm text-white hover:bg-white/20">
                      Add Image
                    </button>
                    <button className="px-3 py-1 bg-white/10 rounded text-sm text-white hover:bg-white/20">
                      Add Video
                    </button>
                    <button className="px-3 py-1 bg-white/10 rounded text-sm text-white hover:bg-white/20">
                      Add Quote
                    </button>
                  </div>
                  <RichTextEditor
                    value={block.content || []}
                    onChange={(newContent) => {
                      updateBlock(index, { content: newContent });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex space-x-2">
          <button
            onClick={() => addBlock(BLOCK_TYPES.HEADING)}
            className="px-4 py-2 bg-white/10 rounded text-white hover:bg-white/20"
          >
            Add Heading Block
          </button>
          <button
            onClick={() => addBlock(BLOCK_TYPES.CONTENT)}
            className="px-4 py-2 bg-white/10 rounded text-white hover:bg-white/20"
          >
            Add Content Block
          </button>
          <button
            onClick={() => addBlock(BLOCK_TYPES.TEAM)}
            className="px-4 py-2 bg-white/10 rounded text-white hover:bg-white/20"
          >
            Add Team Block
          </button>
        </div>
      </div>
    </div>
  );
}
