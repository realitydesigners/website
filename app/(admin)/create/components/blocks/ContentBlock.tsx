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
    <div className="w-full aspect-[3/2] bg- rounded-lg p-2 flex flex-col gap-1.5">
      {/* Mini layout selector */}
      <div className="w-20 h-1.5 bg-white/10 rounded-full mb-1" />
      
      {/* Mini content lines */}
      <div className="space-y-1.5 flex-1">
        <div className="w-full h-1.5 bg-white/20 rounded-full" />
        <div className="w-4/5 h-1.5 bg-white/10 rounded-full" />
        <div className="w-11/12 h-1.5 bg-white/15 rounded-full" />
        <div className="w-3/4 h-1.5 bg-white/10 rounded-full" />
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