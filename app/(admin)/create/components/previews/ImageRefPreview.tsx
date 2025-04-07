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
      <div className="flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500/40 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-white/60 font-medium">Loading image...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-4 p-6 bg-red-500/5 backdrop-blur-sm border border-red-500/20 rounded-lg">
        <div className="w-12 h-12 flex items-center justify-center bg-red-500/10 rounded-lg">
          <ImageIcon className="text-red-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-red-400">Error loading image</div>
          <div className="text-xs text-red-400/80 mt-0.5">{error}</div>
        </div>
      </div>
    );
  }

  if (!imageData) {
    return (
      <div className="flex items-center gap-4 p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg
        hover:bg-black/50 hover:border-white/20 transition-all duration-300 group">
        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg
          group-hover:bg-white/10 transition-colors duration-300">
          <ImageIcon className="text-white/40 group-hover:text-white/60 transition-colors duration-300" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
            No image selected
          </div>
          <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300 mt-0.5">
            Click to choose an image
          </div>
        </div>
      </div>
    );
  }

  const { image, title } = imageData;

  return (
    <div className="group relative mb-4">
      {/* Preview */}
      <div className="relative overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-white/10
        hover:border-white/20 transition-all duration-300">
        <div className="relative aspect-video">
          {image?.image?.asset && (
            <img
              src={image.image.asset.url}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700
                group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0
            group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-russo text-white mb-1">{title}</div>
              {image.team && (
                <div className="flex items-center gap-2">
                  {image.team.image?.asset?.url && (
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
                      <img
                        src={image.team.image.asset.url}
                        alt={image.team.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="text-sm text-white/80">
                    By {image.team.name}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/60 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full
                border border-white/10">
                {value.className || "image-standard"}
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full
                  text-sm text-white/80 hover:text-white border border-white/10 hover:border-white/20
                  transition-all duration-300"
              >
                {isExpanded ? "Close" : "Details"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-3 p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10
          transform transition-all duration-300">
          <div className="space-y-6">
            <div>
              <div className="text-sm text-white/60 mb-2 font-medium">Reference ID</div>
              <div className="text-sm font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                {value.image._ref}
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-2 font-medium">Style</div>
              <div className="text-sm font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                {value.className || "image-standard"}
              </div>
            </div>
            {image.team && (
              <div>
                <div className="text-sm text-white/60 mb-2 font-medium">Team Member</div>
                <div className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-white/5">
                  {image.team.image?.asset?.url && (
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                      <img
                        src={image.team.image.asset.url}
                        alt={image.team.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-white">{image.team.name}</div>
                    <div className="text-xs text-white/60 mt-0.5">
                      @{image.team.slug.current}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <div className="text-sm text-white/60 mb-2 font-medium">Image Details</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-sm bg-black/40 p-3 rounded-lg border border-white/5">
                  <span className="text-white/40">Width:</span>{" "}
                  <span className="text-white font-medium">
                    {image.image.asset.metadata.dimensions.width}px
                  </span>
                </div>
                <div className="text-sm bg-black/40 p-3 rounded-lg border border-white/5">
                  <span className="text-white/40">Height:</span>{" "}
                  <span className="text-white font-medium">
                    {image.image.asset.metadata.dimensions.height}px
                  </span>
                </div>
                <div className="text-sm bg-black/40 p-3 rounded-lg border border-white/5">
                  <span className="text-white/40">Size:</span>{" "}
                  <span className="text-white font-medium">
                    {Math.round(image.image.asset.size / 1024)}KB
                  </span>
                </div>
                <div className="text-sm bg-black/40 p-3 rounded-lg border border-white/5">
                  <span className="text-white/40">Type:</span>{" "}
                  <span className="text-white font-medium">
                    {image.image.asset.mimeType.split("/")[1].toUpperCase()}
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
