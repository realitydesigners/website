import React from 'react';
import { RichTextEditor } from '../RichTextEditor';

export interface ContentBlock {
  _type: "contentBlock";
  _key: string;
  content: any[];
  layout?: "dark" | "light" | "transparent";
}

interface ContentBlockProps {
  block: ContentBlock;
  onUpdate: (updates: Partial<ContentBlock>) => void;
}

export function ContentBlockMini() {
  return (
    <div className="w-full relative aspect-[3/2] bg-white/10  rounded-lg p-2 flex flex-col gap-1.5  border border-white/5">
      {/* Mini layout selector */}
      <div className="w-full  p-2 flex flex-col h-full  rounded-lg gap-2">
      <div className="w-full h-1.5 bg-white/10 rounded-full" />
      <div className="w-full h-1.5 bg-white/10 rounded-full" />
      <div className='w-full flex gap-2'>
      <div className="w-1/2 h-1.5 bg-white/10 rounded-full" />
      <div className="w-1/2 h-1.5 bg-white/10 rounded-full" />
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full" />
      <div className="w-full h-1.5 bg-white/10 rounded-full" />
      <div className='w-full flex gap-2'>
      <div className="w-1/2 h-1.5 bg-white/10 rounded-full" />
      <div className="w-1/2 h-1.5 bg-white/10 rounded-full" />
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full" /> 
      <div className="w-full h-1.5 bg-white/10 rounded-full" />
      <div className='w-full flex gap-2'>
      <div className="w-1/2 h-1.5 bg-white/10 rounded-full" />
      <div className="w-1/2 h-1.5 bg-white/10 rounded-full" />
      </div>
      </div>

    </div>
  );
}

export function ContentBlock({ block, onUpdate }: ContentBlockProps) {
  return (
    <div className="space-y-6">
      {/* Layout Selection */}
      <div className="space-y-2">
        <label className="text-sm text-white/60">Layout</label>
        <select
          value={block.layout || 'dark'}
          onChange={(e) => onUpdate({ layout: e.target.value as "dark" | "light" | "transparent" })}
          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="transparent">Transparent</option>
        </select>
      </div>

      {/* Rich Text Editor */}
      <div className="space-y-2">
        <label className="text-sm text-white/60">Content</label>
        <div className="bg-black/40 border border-white/10 rounded-lg overflow-hidden">
          <RichTextEditor
            value={block.content}
            onChange={(content) => onUpdate({ content })}
          />
        </div>
      </div>
    </div>
  );
} 