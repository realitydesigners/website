"use client";
import React, { useState, useCallback, useEffect } from "react";
import { writeClient } from "@/sanity/lib/client";
import { useDocument } from "../context/DocumentContext";
import { HeadingBlock, ContentBlock } from "./blocks";
import { HeadingBlockMini } from "./blocks/HeadingBlock";
import { ContentBlockMini } from "./blocks/ContentBlock";
import type { HeadingBlock as HeadingBlockType } from "./blocks/HeadingBlock";
import type { ContentBlock as ContentBlockType } from "./blocks/ContentBlock";
import {
  RiFileTextLine,
  RiBookLine,
} from "react-icons/ri";
import { getFields } from "./fields/getFields";

interface TeamBlock {
  _type: "teamBlock";
  _key: string;
  team: Array<{
    _type: "reference";
    _ref: string;
    name?: string;
    role?: string;
    image?: {
      asset: {
        _ref: string;
        _type: string;
        url: string;
      };
    };
  }>;
}

type PostBlock = HeadingBlockType | ContentBlockType | TeamBlock;

const BLOCK_TYPES = {
  HEADING: "headingBlock" as const,
  CONTENT: "contentBlock" as const,
  TEAM: "teamBlock" as const,
  IMAGE_CANVAS: "imageCanvasBlock" as const,
  HEADING_SPLINE: "headingSplineBlock" as const,
};

interface EditorProps {
  selectedDoc: any;
  onMount?: (handleSubmit: (e?: React.FormEvent | undefined, shouldPublish?: boolean) => Promise<void>) => void;
}

interface Field {
  name: string;
  title: string;
  description?: string;
  type: string;
  component: React.ComponentType<any>;
  options?: any;
}

interface BlockButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  preview: React.ReactNode;
}

const BlockButton = ({ onClick, icon, title, description, preview }: BlockButtonProps) => (
  <button
    onClick={onClick}
    className="w-full flex flex-col gap-3 p-3 rounded-lg bg-black/40 hover:bg-black/60 
      text-white/70 hover:text-white/90 transition-all duration-300 group"
  >
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <div className="text-sm font-medium">{title}</div>
       
      </div>
    </div>
    {preview}
  </button>
);

const EditorSidebar = ({ 
  selectedDoc, 
  addNewBlock, 
  BLOCK_TYPES 
}: { 
  selectedDoc: any;
  addNewBlock: (type: any) => void;
  BLOCK_TYPES: any;
}) => (
  selectedDoc?._type === "posts" && (
    <div className="fixed right-0 top-14 bottom-0 w-72 border-l border-white/10 bg-[#0a0a0a] overflow-auto">
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-medium text-white/60 px-2">Add Blocks</h3>
        <div className="space-y-2">
          <BlockButton
            onClick={() => addNewBlock(BLOCK_TYPES.HEADING)}
            icon={<RiFileTextLine size={18} />}
            title="Heading Block"
            description="Add title and metadata"
            preview={<HeadingBlockMini />}
          />

          <BlockButton
            onClick={() => addNewBlock(BLOCK_TYPES.CONTENT)}
            icon={<RiBookLine size={18} />}
            title="Content Block"
            description="Add rich text content"
            preview={<ContentBlockMini />}
          />
        </div>
      </div>
    </div>
  )
);

export function Editor({ selectedDoc, onMount }: EditorProps) {
  const { setSelectedDoc, setHandleSubmit } = useDocument();
  const [blocks, setBlocks] = useState<PostBlock[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [slug, setSlug] = useState("");
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    if (selectedDoc) {
      // For posts type, handle blocks
      if (selectedDoc._type === "posts") {
        setBlocks(selectedDoc.block || []);
      }
      // For other types, set form data
      const initialData: any = {};
      Object.keys(selectedDoc).forEach((key) => {
        if (!key.startsWith("_")) {
          initialData[key] = selectedDoc[key];
        }
      });
      setFormData(initialData);
      setSlug(selectedDoc.slug?.current || "");
    }
  }, [selectedDoc]);

  const addNewBlock = (type: (typeof BLOCK_TYPES)[keyof typeof BLOCK_TYPES]) => {
    const newBlock = {
      _type: type,
      _key: Math.random().toString(36).substring(2, 15),
      ...(type === BLOCK_TYPES.CONTENT ? {
        layout: 'dark' as const,
        content: []
      } : type === BLOCK_TYPES.HEADING ? {
        heading: '',
        subheading: '',
        publicationDate: new Date().toISOString().split('T')[0]
      } : type === BLOCK_TYPES.TEAM ? {
        team: []
      } : {})
    } as PostBlock;

    setBlocks(current => [...current, newBlock]);
    // Also update the selectedDoc to include the new block
    if (selectedDoc && selectedDoc._type === "posts") {
      const updatedDoc = {
        ...selectedDoc,
        block: [...(selectedDoc.block || []), newBlock]
      };
      setSelectedDoc(updatedDoc);
    }
  };

  useEffect(() => {
    const submitFn = async (e?: React.FormEvent, shouldPublish = false) => {
      if (e && 'preventDefault' in e) {
        e.preventDefault();
      }

      try {
        const doc = {
          _type: selectedDoc?._type || "posts",
          ...(selectedDoc?._type === "posts" ? { block: blocks } : formData),
          slug: {
            _type: "slug",
            current: slug || Math.random().toString(36).substring(2, 15),
          },
        };

        let result;
        if (!selectedDoc?._id || selectedDoc._id.startsWith("drafts.new-")) {
          // Always create a draft first
          const draftId = `drafts.${Math.random().toString(36).substring(2, 15)}`;
          result = await writeClient.createOrReplace({
            ...doc,
            _id: draftId,
          });

          // If shouldPublish is true, create the published version and delete the draft
          if (shouldPublish) {
            const publishedId = draftId.replace('drafts.', '');
            await writeClient.createOrReplace({
              ...doc,
              _id: publishedId,
            });
            await writeClient.delete(draftId);
            result = { _id: publishedId };
          }
        } else {
          // For existing documents
          const currentId = selectedDoc._id;
          const isDraft = currentId.startsWith('drafts.');
          const baseId = currentId.replace('drafts.', '');

          if (shouldPublish) {
            // Create/update the published version
            result = await writeClient.createOrReplace({
              ...doc,
              _id: baseId,
            });
            // Delete the draft if it exists
            if (isDraft) {
              await writeClient.delete(currentId);
            }
          } else {
            // Ensure we're working with a draft
            const draftId = isDraft ? currentId : `drafts.${baseId}`;
            result = await writeClient.createOrReplace({
              ...doc,
              _id: draftId,
            });
          }
        }

        console.log(shouldPublish ? "Published:" : "Saved as draft:", result);
        setSelectedDoc(null);
        if (selectedDoc?._type === "posts") {
          setBlocks([]);
        } else {
          setFormData({});
        }
        setSlug("");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    setHandleSubmit(submitFn);

    return () => {
      setHandleSubmit(undefined);
    };
  }, [blocks, selectedDoc, setSelectedDoc, slug, formData, setHandleSubmit]);

  const updateBlock = (index: number, updates: Partial<PostBlock>) => {
    setBlocks((current) =>
      current.map((block, i) => {
        if (i !== index) return block;
        return { ...block, ...updates } as PostBlock;
      })
    );
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

  const renderBlockContent = (block: PostBlock, index: number) => {
    switch (block._type) {
      case BLOCK_TYPES.HEADING:
        return (
          <HeadingBlock
            block={block}
            onUpdate={(updates) => {
              updateBlock(index, updates);
              // Also update the selectedDoc
              if (selectedDoc && selectedDoc._type === "posts") {
                const updatedBlocks = [...blocks];
                updatedBlocks[index] = { ...block, ...updates };
                const updatedDoc = {
                  ...selectedDoc,
                  block: updatedBlocks
                };
                setSelectedDoc(updatedDoc);
              }
            }}
          />
        );
      case BLOCK_TYPES.CONTENT:
        return (
          <ContentBlock
            block={block}
            onUpdate={(updates) => {
              updateBlock(index, updates);
              // Also update the selectedDoc
              if (selectedDoc && selectedDoc._type === "posts") {
                const updatedBlocks = [...blocks];
                updatedBlocks[index] = { ...block, ...updates };
                const updatedDoc = {
                  ...selectedDoc,
                  block: updatedBlocks
                };
                setSelectedDoc(updatedDoc);
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (!selectedDoc) return null;

    switch (selectedDoc._type) {
      case "posts":
        const blocks = Array.isArray(selectedDoc.block) 
          ? selectedDoc.block 
          : selectedDoc.block 
            ? [selectedDoc.block] 
            : [];

        return blocks.map((block, index) => (
          <div key={index} className="space-y-4 border border-white/10 rounded-md p-4">
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
            {renderBlockContent(block, index)}
          </div>
        ));

      case "team":
        return (
          <>
            {getFields("team").map((field: Field) => {
              const Component = field.component;
              return (
                <Component
                  key={field.name}
                  label={field.title}
                  description={field.description}
                  value={selectedDoc[field.name]}
                  onChange={(value: any) => handleInputChange(field.name, value)}
                  {...(field.type === "reference" ? { options: teamMembers } : {})}
                  {...field.options}
                />
              );
            })}
          </>
        );

      default:
        return (
          <>
            {getFields(selectedDoc._type).map((field: Field) => {
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
          </>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-8 space-y-6 overflow-auto mr-72">
          <div className="space-y-4">
            {renderContent()}
          </div>
        </div>

        <EditorSidebar 
          selectedDoc={selectedDoc}
          addNewBlock={addNewBlock}
          BLOCK_TYPES={BLOCK_TYPES}
        />
      </div>
    </div>
  );
}
