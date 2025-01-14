"use client";

import React from "react";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { RiImageLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { format } from "date-fns";
import Image from "next/image";
import { useDocument } from "../context/DocumentContext";
import { schemaConfig } from '../config/schemaConfig';

interface Post {
  _id: string;
  _createdAt: string;
  _type: string;
  title?: string;
  alt?: string;
  quote?: string;
  name?: string;
  role?: string;
  description?: string;
  definition?: string;
  firstBlock?: {
    heading?: string;
    subheading?: string;
    layout?: string;
    publicationDate?: string;
    imageUrl?: string;
    team?: {
      name?: string;
      role?: string;
      image?: string;
    };
    category?: {
      title?: string;
      slug?: string;
    };
  };
  block?: Array<any>;
  imageUrl?: string;
  slug?: {
    current?: string;
  };
  team?: {
    name?: string;
    image?: string;
  };
  url?: string;
  videoUrl?: string;
  audioUrl?: string;
  mediaRef?: {
    image?: {
      image?: {
        asset: {
          url: string;
        };
      };
    };
    layout?: string;
  };
  instagram?: string;
  twitter?: string;
  website?: string;
  tiktok?: string;
  scene?: string;
  shortBio?: string;
  model?: {
    title?: string;
    fileUrl?: string;
  };
  isMain?: boolean;
  subcategories?: Array<{
    _ref: string;
    _type: "reference";
  }>;
  sceneIdentifier?: string;
}

interface TableViewProps {
  type: string;
}

export function TableView({ type }: TableViewProps) {
  const [documents, setDocuments] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setSelectedDoc } = useDocument();

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        const config = schemaConfig[type];
        if (!config) {
          console.error(`No configuration found for type: ${type}`);
          return;
        }
        const result = await client.fetch(config.query);
        console.log(result);
        setDocuments(result);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [type]);



  const handleEdit = (doc: Post) => {
    setSelectedDoc(doc);
  };


  const getColumns = () => {
    const config = schemaConfig[type];
    return config?.columns || [
      { key: "image", label: "Image" },
      { key: "title", label: "Title" },
      { key: "alt", label: "Alt Text" },
      { key: "team", label: "Team" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ];
  };

  const renderCell = (column: { key: string }, doc: Post) => {
    switch (column.key) {
      case "image":
        const imageUrl = doc.firstBlock?.imageUrl || 
                        doc.imageUrl || 
                        doc.mediaRef?.image?.image?.asset?.url;
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4 whitespace-nowrap">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={doc.firstBlock?.heading || doc.title || doc.quote || "Image"}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-lg bg-black/40 flex items-center justify-center">
                <RiImageLine className="text-white/40" />
              </div>
            )}
          </td>
        );

      case "heading":
      case "title":
        const title = doc.firstBlock?.heading || doc.title || doc.name || doc.quote;
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white">{title || "Untitled"}</div>
          </td>
        );

      case "subheading":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-xs text-white/60 line-clamp-2">
              {doc.firstBlock?.subheading || doc.description || "No subheading"}
            </div>
          </td>
        );

      case "team":
        const teamName = doc.firstBlock?.team?.name || doc.team?.name;
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60">{teamName || "No team"}</div>
          </td>
        );

      case "category":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60">
              {doc.firstBlock?.category?.title || "-"}
            </div>
          </td>
        );

      case "slug":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <span className="text-sm text-white/60">
              {doc.slug?.current || "no-slug"}
            </span>
          </td>
        );

      case "alt":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60">{doc.alt || "No alt text"}</div>
          </td>
        );

      case "created":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <span className="text-sm text-white/60">
              {format(new Date(doc._createdAt), "MMM d, yyyy")}
            </span>
          </td>
        );

      case "actions":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(doc)}
                className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white/70 hover:text-white/90 transition-all"
              >
                <RiEditLine size={16} />
              </button>
              <button className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white/70 hover:text-white/90 transition-all">
                <RiDeleteBinLine size={16} />
              </button>
            </div>
          </td>
        );

      case "url":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60">
              {doc.url || doc.videoUrl || doc.audioUrl || "-"}
            </div>
          </td>
        );

      case "quote":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60 line-clamp-2">
              {doc.quote || "-"}
            </div>
          </td>
        );

      case "layout":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60">
              {doc.mediaRef?.layout || doc.block?.layout || "-"}
            </div>
          </td>
        );

      case "socials":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="flex space-x-2">
              {doc.instagram && (
                <span className="text-xs text-white/60">Instagram</span>
              )}
              {doc.twitter && (
                <span className="text-xs text-white/60">Twitter</span>
              )}
              {doc.website && (
                <span className="text-xs text-white/60">Website</span>
              )}
              {doc.tiktok && (
                <span className="text-xs text-white/60">TikTok</span>
              )}
            </div>
          </td>
        );

      case "shortBio":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60 line-clamp-2">
              {doc.shortBio || "-"}
            </div>
          </td>
        );

      case "name":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60">{doc.name || "No name"}</div>
          </td>
        );

      case "model":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60">
              {doc.model?.title || "No model"}
            </div>
          </td>
        );

      case "isMain":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60">
              {doc.isMain ? "Yes" : "No"}
            </div>
          </td>
        );

      case "subcategories":
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60">
              {Array.isArray(doc.subcategories) ? `${doc.subcategories.length} subcategories` : "No subcategories"}
            </div>
          </td>
        );

      default:
        return (
          <td key={`${doc._id}-${column.key}`} className="px-6 py-4">
            <div className="text-sm text-white/60">{doc[column.key] || "-"}</div>
          </td>
        );
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-white/60">
          {type.charAt(0).toUpperCase() + type.slice(1)} ({documents.length})
        </h3>
      </div>
      <div className="w-full bg-[#0a0a0a]/50 rounded-xl overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="text-sm text-white/60">Loading...</div>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-black/50 text-[10px]">
                  {getColumns().map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-3 text-left font-medium text-white/60 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {documents.map((doc) => (
                  <tr
                    key={doc._id}
                    className="hover:bg-black/40 transition-colors"
                  >
                    {getColumns().map((column) => renderCell(column, doc))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}