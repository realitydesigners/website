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
import { client } from "@/sanity/lib/client";
import { ImageDocument } from "@/sanity/schemas/img";

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
  const [formData, setFormData] = useState<any>({});
  const [slug, setSlug] = useState("");
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isImageDetailsExpanded, setIsImageDetailsExpanded] = useState(false);

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
              heading: "",
              subheading: "",
            },
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
        {selectedDoc?._type === "posts" && (
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
        )}

        {selectedDoc?._type === "posts" ? (
          // Render blocks editor for posts
          <>
            {blocks.map((block, index) => (
              <div
                key={index}
                className={`p-4 bg-white/5 border border-white/10 rounded-md`}
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
          </>
        ) : selectedDoc?._type === "img" ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white/60">
                Title
              </label>
              <input
                type="text"
                value={(formData as ImageDocument).title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title..."
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white/60">
                Image
              </label>
              <div className="space-y-4">
                {(formData as ImageDocument).image?.asset?.url ? (
                  <div className="relative group">
                    <img
                      src={(formData as ImageDocument).image.asset.url}
                      alt={(formData as ImageDocument).title || "Image preview"}
                      className="w-full max-w-2xl rounded-lg border border-white/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {(formData as ImageDocument).title}
                          </div>
                          {(formData as ImageDocument).team && (
                            <div className="text-xs text-white/60">
                              By{" "}
                              {
                                teamMembers.find(
                                  (m) =>
                                    m._id ===
                                    (formData as ImageDocument).team?._ref
                                )?.name
                              }
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setIsImageDetailsExpanded(!isImageDetailsExpanded)
                            }
                            className="px-2 py-1 bg-black/60 hover:bg-black rounded text-xs text-white/60 hover:text-white"
                          >
                            {isImageDetailsExpanded ? "Close" : "Details"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-lg bg-white/5">
                    <RiImageLine className="w-8 h-8 text-white/40 mb-2" />
                    <label className="cursor-pointer px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          // Handle image upload
                          console.log("Image upload not implemented yet");
                        }}
                      />
                    </label>
                    <p className="mt-2 text-sm text-white/40">No file chosen</p>
                  </div>
                )}

                {/* Image Details Panel */}
                {isImageDetailsExpanded &&
                  (formData as ImageDocument).image?.asset && (
                    <div className="mt-2 p-4 bg-black/80 backdrop-blur-sm rounded-lg border border-white/10">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-white/60 mb-1">
                            Reference ID
                          </div>
                          <div className="text-sm font-mono bg-black/50 p-2 rounded">
                            {(formData as ImageDocument).image.asset._ref}
                          </div>
                        </div>
                        {(formData as ImageDocument).image.asset.metadata && (
                          <div>
                            <div className="text-sm text-white/60 mb-1">
                              Image Details
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="text-sm bg-black/50 p-2 rounded">
                                <span className="text-white/40">Width:</span>{" "}
                                <span className="text-white">
                                  {
                                    (formData as any).image.asset.metadata
                                      .dimensions.width
                                  }
                                  px
                                </span>
                              </div>
                              <div className="text-sm bg-black/50 p-2 rounded">
                                <span className="text-white/40">Height:</span>{" "}
                                <span className="text-white">
                                  {
                                    (formData as any).image.asset.metadata
                                      .dimensions.height
                                  }
                                  px
                                </span>
                              </div>
                              <div className="text-sm bg-black/50 p-2 rounded">
                                <span className="text-white/40">Size:</span>{" "}
                                <span className="text-white">
                                  {Math.round(
                                    (formData as any).image.asset.size / 1024
                                  )}
                                  KB
                                </span>
                              </div>
                              <div className="text-sm bg-black/50 p-2 rounded">
                                <span className="text-white/40">Type:</span>{" "}
                                <span className="text-white">
                                  {
                                    (
                                      formData as any
                                    ).image.asset.mimeType.split("/")[1]
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white/60">
                Alt Text
              </label>
              <input
                type="text"
                value={(formData as ImageDocument).alt || ""}
                onChange={(e) => handleInputChange("alt", e.target.value)}
                className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter alt text..."
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white/60">
                Team
              </label>
              {(formData as ImageDocument).team?._ref ? (
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {teamMembers.find(
                      (m) => m._id === (formData as ImageDocument).team?._ref
                    )?.image?.asset?.url && (
                      <img
                        src={
                          teamMembers.find(
                            (m) =>
                              m._id === (formData as ImageDocument).team?._ref
                          )?.image?.asset?.url
                        }
                        alt={
                          teamMembers.find(
                            (m) =>
                              m._id === (formData as ImageDocument).team?._ref
                          )?.name
                        }
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="text-white">
                        {
                          teamMembers.find(
                            (m) =>
                              m._id === (formData as ImageDocument).team?._ref
                          )?.name
                        }
                      </div>
                      <div className="text-sm text-white/60">Team Member</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInputChange("team", null)}
                    className="px-2 py-1 text-sm text-white/60 hover:text-white/80 bg-black/40 hover:bg-black/60 rounded"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <select
                  value={(formData as ImageDocument).team?._ref || ""}
                  onChange={(e) =>
                    handleInputChange("team", {
                      _ref: e.target.value,
                      _type: "reference",
                    })
                  }
                  className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select team member</option>
                  {teamMembers.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
