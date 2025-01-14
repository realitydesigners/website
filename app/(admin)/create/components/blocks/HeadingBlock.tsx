import React from 'react';
import Image from 'next/image';

interface ImageAsset {
  _ref: string;
  _type: string;
  url: string;
}

interface ImageReference {
  _type: "reference";
  _ref: string;
  image?: {
    asset: ImageAsset;
  };
}

interface TeamReference {
  _type: "reference";
  _ref: string;
  name?: string;
  role?: string;
  image?: {
    asset: ImageAsset;
  };
}

interface CategoryReference {
  _type: "reference";
  _ref: string;
  title?: string;
  slug?: string;
}

export interface HeadingBlock {
  _type: "headingBlock";
  _key: string;
  layout?: "dark" | "light" | "transparent";
  imageRef?: ImageReference;
  heading?: string;
  subheading?: string;
  publicationDate?: string;
  team?: TeamReference;
  category?: CategoryReference;
}

interface HeadingBlockProps {
  block: HeadingBlock;
  onUpdate: (updates: Partial<HeadingBlock>) => void;
}

export function HeadingBlock({ block, onUpdate }: HeadingBlockProps) {
  return (
    <div className="grid ">
      {/* Featured Image */}
      <div className="relative aspect-[21/9] rounded-lg overflow-hidden group mb-6">
        {block.imageRef?.image?.asset?.url ? (
          <Image
            src={block.imageRef.image.asset.url}
            alt="Featured image"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 flex items-center justify-center">
            <span className="text-white/40 text-sm">Add featured image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button 
          className="absolute bottom-4 right-4 px-4 py-2 bg-black/60 text-white/90 rounded-lg
            hover:bg-black/80 transition-all duration-300 opacity-0 group-hover:opacity-100 
            backdrop-blur-sm border border-white/10 shadow-lg transform translate-y-2 
            group-hover:translate-y-0"
          onClick={() => {/* TODO: Implement image selection */}}
        >
          Change Image
        </button>
      </div>

      <div className="grid gap-6">
        {/* Layout */}
        <select
          value={block.layout || 'dark'}
          onChange={(e) => onUpdate({ layout: e.target.value as "dark" | "light" | "transparent" })}
          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white/90
            focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40
            transition-all duration-300 hover:bg-black/50"
        >
          <option value="dark">Dark Layout</option>
          <option value="light">Light Layout</option>
          <option value="transparent">Transparent Layout</option>
        </select>

        {/* Heading */}
        <input
          type="text"
          value={block.heading || ''}
          onChange={(e) => onUpdate({ heading: e.target.value })}
          placeholder="Enter heading"
          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white
            placeholder:text-white/40 text-lg font-medium focus:outline-none focus:ring-2 
            focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300
            hover:bg-black/50"
        />

        {/* Subheading */}
        <textarea
          value={block.subheading || ''}
          onChange={(e) => onUpdate({ subheading: e.target.value })}
          placeholder="Enter subheading"
          rows={3}
          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white/90
            placeholder:text-white/40 resize-none focus:outline-none focus:ring-2 
            focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300
            hover:bg-black/50"
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Publication Date */}
          <input
            type="date"
            value={block.publicationDate || ''}
            onChange={(e) => onUpdate({ publicationDate: e.target.value })}
            className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white/90
              focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40
              transition-all duration-300 hover:bg-black/50"
          />

          {/* Team Member */}
          <div className="relative group">
            <button 
              className="w-full flex items-center space-x-3 bg-black/40 border border-white/10 
                rounded-lg p-3 hover:bg-black/50 transition-all duration-300 group-hover:border-white/20"
              onClick={() => {/* TODO: Implement team selection */}}
            >
              {block.team?.image?.asset?.url ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
                  <Image
                    src={block.team.image.asset.url}
                    alt={block.team.name || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="flex-1 text-left">
                <div className="text-white/90 text-sm font-medium truncate">
                  {block.team?.name || 'Select team member'}
                </div>
                {block.team?.role && (
                  <div className="text-white/40 text-xs truncate">{block.team.role}</div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Category */}
        <button 
          className="w-full flex items-center justify-between bg-black/40 border border-white/10 
            rounded-lg px-4 py-3 hover:bg-black/50 transition-all duration-300 group"
          onClick={() => {/* TODO: Implement category selection */}}
        >
          <span className="text-white/90">
            {block.category?.title || 'Select category'}
          </span>
          <span className="text-white/40 text-sm">
            {block.category?.slug || 'No category selected'}
          </span>
        </button>
      </div>
    </div>
  );
}

export function HeadingBlockMini() {
  return (
    <div className="w-full aspect-[3/2] bg-black/40 rounded-lg p-2 flex flex-col gap-1.5">
      {/* Mini date */}
      <div className="w-12 h-1.5 bg-white/10 rounded-full" />
      
      {/* Mini heading */}
      <div className="w-full h-2 bg-white/20 rounded-full" />
      
      {/* Mini subheading */}
      <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
      
      {/* Mini metadata */}
      <div className="mt-auto flex gap-1">
        <div className="w-6 h-1.5 bg-white/5 rounded-full" />
        <div className="w-8 h-1.5 bg-white/5 rounded-full" />
      </div>
    </div>
  );
} 