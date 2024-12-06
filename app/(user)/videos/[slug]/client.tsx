"use client";

import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import Blocks from "@/components/blocks/Blocks";
import { BlockProps } from "@/components/blocks/Blocks";

interface VideoPageClientProps {
  videoUrl: string;
  title: string;
  blocks: (BlockProps & { _key: string })[];
}

export default function VideoPageClient({
  videoUrl,
  title,
  blocks,
}: VideoPageClientProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 pt-16 lg:pt-20">
        <div className="w-full  ">
          <YouTubeEmbed videoUrl={videoUrl} />
        </div>
        <p className="my-2 pt-6 mb-16 font-russo pt-6 text-2xl lg:text-3xl font-bold uppercase tracking-wide text-gray-200">
          {title}
        </p>
      </div>

      <div className="justify-center flex w-full">
        {blocks.map((block, index) => (
          <Blocks
            key={block._key || `block-${index}`}
            block={block as BlockProps}
          />
        ))}
      </div>
    </>
  );
}
