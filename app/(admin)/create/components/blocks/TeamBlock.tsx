import React from 'react';
import Image from 'next/image';

interface ImageAsset {
  _ref: string;
  _type: string;
  url: string;
}

interface TeamMember {
  _type: "reference";
  _ref: string;
  name?: string;
  role?: string;
  image?: {
    asset: ImageAsset;
  };
}

export interface TeamBlock {
  _type: "teamBlock";
  _key: string;
  layout?: "dark" | "light" | "transparent";
  team: TeamMember[];
}

interface TeamBlockProps {
  block: TeamBlock;
  onUpdate: (updates: Partial<TeamBlock>) => void;
}

export function TeamBlock({ block, onUpdate }: TeamBlockProps) {
  return (
    <div className="grid gap-6">
      {/* Layout Selection */}
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

      {/* Team Members List */}
      <div className="space-y-4">
        {block.team.map((member, index) => (
          <div 
            key={member._ref}
            className="group relative flex items-center gap-4 bg-black/40 border border-white/10 
              rounded-lg p-4 hover:bg-black/50 transition-all duration-300"
          >
            {/* Member Image */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20">
              {member.image?.asset?.url ? (
                <Image
                  src={member.image.asset.url}
                  alt={member.name || ''}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                  <span className="text-white/40 text-xs">No image</span>
                </div>
              )}
            </div>

            {/* Member Info */}
            <div className="flex-1">
              <h3 className="text-white/90 font-medium">
                {member.name || 'Unnamed Member'}
              </h3>
              <p className="text-white/60 text-sm">
                {member.role || 'No role specified'}
              </p>
            </div>

            {/* Remove Member Button */}
            <button
              onClick={() => {
                const updatedTeam = block.team.filter((_, i) => i !== index);
                onUpdate({ team: updatedTeam });
              }}
              className="absolute top-2 right-2 p-2 text-white/40 hover:text-white/90 
                opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add Member Button */}
      <button
        onClick={() => {/* TODO: Implement team member selection */}}
        className="w-full flex items-center justify-center gap-2 bg-black/40 border 
          border-white/10 rounded-lg px-4 py-3 text-white/90 hover:bg-black/50 
          transition-all duration-300 group"
      >
        <span className="text-2xl">+</span>
        <span>Add Team Member</span>
      </button>
    </div>
  );
}

export function TeamBlockMini() {
  return (
    <div className="w-full aspect-[3/2] h-[120px] bg-white/10 rounded-lg p-2 flex flex-col gap-1.5 border border-white/5">
      <div className="flex-1 flex flex-col gap-2 mt-2">
        <div className="flex w-full  justify-center items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-white/10" />
          <div className="flex-1 w-full justify-center items-center">
            <div className="w-20 h-3 mb-2 bg-white/10 rounded-full" />
            <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1" />
          </div>
        </div>
      </div>
      <div className='w-full flex gap-2'>
      <div className="w-1/2 h-3 bg-white/10 rounded-full" />
      <div className="w-1/2 h-3 bg-white/10 rounded-full" />
      <div className="w-1/2 h-3 bg-white/10 rounded-full" />
      <div className="w-1/2 h-3 bg-white/10 rounded-full" />
      </div>
    </div>
  );
} 