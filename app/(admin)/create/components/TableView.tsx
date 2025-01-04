"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { RiImageLine, RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { format } from "date-fns";
import Image from "next/image";
import { useDocument } from "../../create/layout";

interface Post {
  _id: string;
  _createdAt: string;
  _type: string;
  block?: Array<{
    heading: string;
    subheading: string;
    imageRef?: {
      imageUrl?: string;
      imageAlt?: string;
    };
  }>;
  imageUrl?: string;
  title?: string;
  slug: {
    current: string;
  };
}

interface TableViewProps {
  type: string;
}

export function TableView({ type }: TableViewProps) {
  const [documents, setDocuments] = useState<Post[]>([]);
  const { setSelectedDoc } = useDocument();

  useEffect(() => {
    const fetchDocuments = async () => {
      const query = `*[_type == "${type}"] {
        _id,
        _createdAt,
        _type,
        block[] {
          ...,
          heading,
          subheading,
          "imageRef": {
            "imageUrl": imageRef->image.asset->url,
            "imageAlt": imageRef->alt
          }
        },
        "imageUrl": image.asset->url,
        title,
        slug
      }`;
      const result = await client.fetch(query);
      setDocuments(result);
    };

    fetchDocuments();
  }, [type]);

  const handleEdit = (doc: Post) => {
    setSelectedDoc(doc);
  };

  const getImageUrl = (doc: Post) => {
    if (doc._type === "img" && doc.imageUrl) {
      return doc.imageUrl;
    }
    if (doc.block?.[0]?.imageRef?.imageUrl) {
      return doc.block[0].imageRef.imageUrl;
    }
    return null;
  };

  const getTitle = (doc: Post) => {
    if (doc._type === "img") {
      return doc.title || "Untitled";
    }
    return doc.block?.[0]?.heading || "Untitled";
  };

  const getSubtitle = (doc: Post) => {
    if (doc._type === "img") {
      return doc.slug?.current || "No slug";
    }
    return doc.block?.[0]?.subheading || "No subheading";
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-white/60">
          {type.charAt(0).toUpperCase() + type.slice(1)} ({documents.length})
        </h3>
      </div>
      <div className="w-full bg-[#0a0a0a]/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-black/50  text-[10px]">
                <th className="px-6 py-3 text-left  font-medium text-white/60 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left  font-medium text-white/60 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left  font-medium text-white/60 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left  font-medium text-white/60 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left font-medium text-white/60 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {documents.map((doc) => (
                <tr
                  key={doc._id}
                  className="hover:bg-black/40 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getImageUrl(doc) ? (
                      <img
                        src={getImageUrl(doc)!}
                        alt={getTitle(doc)}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-black/40 flex items-center justify-center">
                        <RiImageLine className="text-white/40" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{getTitle(doc)}</div>
                    <div className="text-xs text-white/40 line-clamp-2">
                      {getSubtitle(doc)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white/60">
                      {doc.slug?.current || "no-slug"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white/60">
                      {format(new Date(doc._createdAt), "MMM d, yyyy")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
