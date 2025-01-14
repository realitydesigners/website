"use client";

import React, { useState, useCallback, useEffect } from "react";
import { writeClient } from "@/sanity/lib/client";
import { RichTextEditor } from "./RichTextEditor";
import { useDocument } from "../context/DocumentContext";
import { HeadingBlock } from "@/sanity/blocks/headingBlock";
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
import { client } from "@/sanity/lib/client";
import { getFields } from "./fields/getFields";

interface ContentBlock {
  _type: "contentBlock";
  _key: string;
  content: any[];
  layout?: "dark" | "light" | "transparent";
}

interface TeamBlock {
  _type: "teamBlock";
  _key: string;
  team: Array<{
    _ref: string;
    _type: "reference";
  }>;
}

type PostBlock = HeadingBlock | ContentBlock | TeamBlock;

const BLOCK_TYPES = {
  HEADING: "headingBlock" as const,
  CONTENT: "contentBlock" as const,
  TEAM: "teamBlock" as const,
  IMAGE_CANVAS: "imageCanvasBlock" as const,
  HEADING_SPLINE: "headingSplineBlock" as const,
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
  const [blocks, setBlocks] = useState<PostBlock[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [slug, setSlug] = useState("");
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch team members
    const fetchTeamMembers = async () => {
      try {
        const result = await client.fetch(`*[_type == "team"] {
          _id,
          name,
          role,
          "image": {
            "asset": {
              ...image.asset->,
              "_ref": image.asset._ref,
              "_type": image.asset._type
            }
          }
        }`);
        setTeamMembers(result);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    if (selectedDoc) {
      // For posts type, handle blocks
      if (selectedDoc._type === "posts") {
        setBlocks(selectedDoc.block || []);
      }
      // For other types, set form data and fetch complete data
      if (selectedDoc._type === "img") {
        const fetchCompleteData = async () => {
          try {
            const result = await client.fetch(
              `*[_id == $id][0]{
                ...,
                title,
                "image": {
                  "asset": {
                    ...image.asset->,
                    "_ref": image.asset._ref,
                    "_type": image.asset._type
                  }
                },
                "team": {
                  ...,
                  "name": team->name,
                  "_ref": team->_id,
                  "_type": "reference",
                  "image": team->image {
                    "asset": {
                      ...asset->
                    }
                  }
                }
              }`,
              { id: selectedDoc._id }
            );
            console.log("Fetched data:", result); // For debugging
            setFormData(result);
          } catch (error) {
            console.error("Error fetching complete data:", error);
          }
        };
        fetchCompleteData();
      } else {
        const initialData: any = {};
        Object.keys(selectedDoc).forEach((key) => {
          if (!key.startsWith("_")) {
            initialData[key] = selectedDoc[key];
          }
        });
        setFormData(initialData);
      }
      setSlug(selectedDoc.slug?.current || "");
    } else {
      if (selectedDoc?._type === "posts") {
        setBlocks([
          {
            _type: BLOCK_TYPES.HEADING,
            _key: Math.random().toString(36).substring(2, 15),
            heading: "",
            subheading: "",
          },
        ]);
      }
      setFormData({});
      setSlug("");
    }
  }, [selectedDoc]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent, shouldPublish = false) => {
      e.preventDefault();

      try {
        const doc = {
          _type: selectedDoc?._type || "posts",
          ...(selectedDoc?._type === "posts" ? { block: blocks } : formData),
          slug: {
            _type: "slug",
            current: slug,
          },
        };

        let result;
        if (!selectedDoc?._id || selectedDoc._id.startsWith("drafts.new-")) {
          const docId = shouldPublish
            ? Math.random().toString(36).substring(2, 15)
            : `drafts.${Math.random().toString(36).substring(2, 15)}`;

          result = await writeClient.create({
            ...doc,
            _id: docId,
          });
        } else {
          const docId = shouldPublish
            ? selectedDoc._id.replace("drafts.", "")
            : `drafts.${selectedDoc._id.replace("drafts.", "")}`;

          result = await writeClient.patch(docId).set(doc).commit();
        }

        console.log(shouldPublish ? "Published:" : "Saved as draft:", result);
        setSelectedDoc(null);
        if (selectedDoc?._type === "posts") {
          setBlocks([
            {
              _type: BLOCK_TYPES.HEADING,
              _key: Math.random().toString(36).substring(2, 15),
            } as HeadingBlock,
          ]);
        } else {
          setFormData({});
        }
        setSlug("");
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [blocks, selectedDoc, setSelectedDoc, slug, formData]
  );

  const updateBlock = (index: number, updates: Partial<PostBlock>) => {
    setBlocks((current) =>
      current.map((block, i) => {
        if (i !== index) return block;
        return { ...block, ...updates } as PostBlock;
      })
    );
  };

  const addBlock = (type: (typeof BLOCK_TYPES)[keyof typeof BLOCK_TYPES]) => {
    const newBlock = {
      _type: type,
      _key: Math.random().toString(36).substring(2, 15),
    } as PostBlock;

    // Initialize specific block types
    if (type === BLOCK_TYPES.CONTENT) {
      (newBlock as ContentBlock).content = [];
    } else if (type === BLOCK_TYPES.TEAM) {
      (newBlock as TeamBlock).team = [];
    }

    setBlocks((current) => [...current, newBlock]);
  };

  const removeBlock = (index: number) => {
    setBlocks((current) => current.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setSelectedDoc(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const renderContent = () => {
    if (!selectedDoc) return null;

    switch (selectedDoc._type) {
      case "posts":
        // Ensure block is an array
        const blocks = Array.isArray(selectedDoc.block) 
          ? selectedDoc.block 
          : selectedDoc.block 
            ? [selectedDoc.block] 
            : [];

        return blocks.map((block, index) => (
          <div
            key={index}
            className="p-4 bg-white/5 border border-white/10 rounded-md"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white/60">
                  {block._type}
                </span>
              </div>
              <button
                onClick={() => removeBlock(index)}
                className="text-white/40 hover:text-white/60"
              >
                Remove
              </button>
            </div>

            {block._type === BLOCK_TYPES.CONTENT && (
              <div className="space-y-4">
                {/* Content block rendering */}
              </div>
            )}

            {block._type === BLOCK_TYPES.HEADING && (
              <div className="space-y-4">
                {getFields("headingBlock").map((field) => {
                  const Component = field.component;
                  return (
                    <Component
                      key={field.name}
                      label={field.title}
                      description={field.description}
                      value={block[field.name as keyof typeof block]}
                      onChange={(value: any) =>
                        updateBlock(index, {
                          [field.name]: value,
                        } as any)
                      }
                      {...(field.type === "reference"
                        ? { options: teamMembers }
                        : {})}
                      {...field.options}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ));

      case "team":
        return (
          <div className="p-4 bg-white/5 border border-white/10 rounded-md">
            {getFields("team").map((field) => {
              const Component = field.component;
              return (
                <Component
                  key={field.name}
                  label={field.title}
                  description={field.description}
                  value={selectedDoc[field.name as keyof typeof selectedDoc]}
                  onChange={(value: any) => handleInputChange(field.name, value)}
                  {...(field.type === "reference" ? { options: teamMembers } : {})}
                  {...field.options}
                />
              );
            })}
          </div>
        );

      default:
        return (
          <div className="p-4 bg-white/5 border border-white/10 rounded-md">
            {getFields(selectedDoc._type).map((field) => {
              const Component = field.component;
              return (
                <Component
                  key={field.name}
                  label={field.title}
                  description={field.description}
                  value={(formData as any)[field.name]}
                  onChange={(value: any) => handleInputChange(field.name, value)}
                  {...(field.type === "reference" ? { options: teamMembers } : {})}
                  {...field.options}
                />
              );
            })}
          </div>
        );
    }
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
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
