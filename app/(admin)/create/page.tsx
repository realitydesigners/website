"use client";

import { useCallback, useState, useEffect } from "react";
import { writeClient } from "@/sanity/lib/client";
import { useDocument } from "./layout";
import { RichTextEditor } from "./components/RichTextEditor";

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

export default function CreatePage() {
  const { selectedDoc, setSelectedDoc } = useDocument();
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
          _type: "posts",
          block: blocks,
          slug: {
            _type: "slug",
            current: slug,
          },
          ...(selectedDoc?._id ? { _id: selectedDoc._id } : {}),
        };

        const docId =
          selectedDoc?._id ||
          `drafts.${Math.random().toString(36).substring(2, 15)}`;
        const draftId = `drafts.${docId.replace("drafts.", "")}`;

        const result = selectedDoc
          ? await writeClient
              .patch(shouldPublish ? docId : draftId)
              .set(doc)
              .commit()
          : await writeClient.create({
              ...doc,
              _id: shouldPublish ? docId : draftId,
            });

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
    setBlocks([
      {
        _type: BLOCK_TYPES.HEADING,
        _key: Math.random().toString(36).substring(2, 15),
        heading: "",
        subheading: "",
      },
    ]);
    setSlug("");
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">
          {selectedDoc ? "Edit Post" : "Create New Post"}
        </h1>
        <div className="flex gap-4">
          {selectedDoc && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={(e) => handleSubmit(e, false)}
            className="px-4 py-2 bg-blue-600/50 text-white rounded-md hover:bg-blue-700/50 transition-colors"
          >
            Save as Draft
          </button>
          <button
            onClick={(e) => handleSubmit(e, true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Publish
          </button>
        </div>
      </header>

      <div className="flex-1 p-8 space-y-6">
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

      {/* <div className="border-t border-white/10 p-8">
        <h2 className="text-lg font-medium text-white mb-4">Preview</h2>
        <div className="p-4 bg-white/5 border border-white/10 rounded-md min-h-[200px]">
          {blocks.map((block, index) => (
            <div key={index} className="mb-6">
              {block._type === BLOCK_TYPES.HEADING && (
                <>
                  {block.heading && (
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {block.heading}
                    </h3>
                  )}
                  {block.subheading && (
                    <p className="text-lg text-white/60">{block.subheading}</p>
                  )}
                </>
              )}
              {block._type === BLOCK_TYPES.CONTENT && (
                <div
                  className={`prose prose-invert max-w-none ${block.layout}`}
                >
                  <pre className="text-sm text-white/60">
                    {JSON.stringify(block.content, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
