"use client";
import { useState } from "react";
import { ImageIcon } from "@sanity/icons";

interface ImageRefPreviewProps {
  value: any;
  imageData: any;
  isLoading: boolean;
  error: string | null;
}

export function ImageRefPreview({
  value,
  imageData,
  isLoading,
  error,
}: ImageRefPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 bg-black/20 rounded-lg">
        <div className="animate-pulse text-white/60">Loading image...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-950/20 border border-red-500/20 rounded-lg">
        <div className="text-red-400">
          <div className="text-sm font-medium">Error loading image</div>
          <div className="text-xs opacity-80">{error}</div>
        </div>
      </div>
    );
  }

  if (!imageData) {
    return (
      <div className="flex items-center gap-3 p-4 bg-black/20 border border-white/10 rounded-lg">
        <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded">
          <ImageIcon className="text-white/40" />
        </div>
        <div className="flex-grow">
          <div className="text-sm text-white/60">No image selected</div>
          <div className="text-xs text-white/40">Click to choose an image</div>
        </div>
      </div>
    );
  }

  const { image, title } = imageData;

  return (
    <div className="group relative">
      {/* Preview */}
      <div className="relative overflow-hidden rounded-lg bg-black/20 border border-white/10">
        <div className="relative aspect-video">
          {image?.image?.asset && (
            <img
              src={image.image.asset.url}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">{title}</div>
              {image.team && (
                <div className="text-xs text-white/60">
                  By {image.team.name}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60 bg-black/40 px-2 py-1 rounded">
                {value.className || "image-standard"}
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 bg-black/60 hover:bg-black rounded text-xs text-white/60 hover:text-white"
              >
                {isExpanded ? "Close" : "Details"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-2 p-4 bg-black/80 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-white/60 mb-1">Reference ID</div>
              <div className="text-sm font-mono bg-black/50 p-2 rounded">
                {value.image._ref}
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Style</div>
              <div className="text-sm font-mono bg-black/50 p-2 rounded">
                {value.className || "image-standard"}
              </div>
            </div>
            {image.team && (
              <div>
                <div className="text-sm text-white/60 mb-1">Team Member</div>
                <div className="flex items-center gap-2 bg-black/50 p-2 rounded">
                  {image.team.image?.asset?.url && (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={image.team.image.asset.url}
                        alt={image.team.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-white">{image.team.name}</div>
                    <div className="text-xs text-white/60">
                      @{image.team.slug.current}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <div className="text-sm text-white/60 mb-1">Image Details</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm bg-black/50 p-2 rounded">
                  <span className="text-white/40">Width:</span>{" "}
                  <span className="text-white">
                    {image.image.asset.metadata.dimensions.width}px
                  </span>
                </div>
                <div className="text-sm bg-black/50 p-2 rounded">
                  <span className="text-white/40">Height:</span>{" "}
                  <span className="text-white">
                    {image.image.asset.metadata.dimensions.height}px
                  </span>
                </div>
                <div className="text-sm bg-black/50 p-2 rounded">
                  <span className="text-white/40">Size:</span>{" "}
                  <span className="text-white">
                    {Math.round(image.image.asset.size / 1024)}KB
                  </span>
                </div>
                <div className="text-sm bg-black/50 p-2 rounded">
                  <span className="text-white/40">Type:</span>{" "}
                  <span className="text-white">
                    {image.image.asset.mimeType.split("/")[1]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
