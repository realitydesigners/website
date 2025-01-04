"use client";

import { useState } from "react";
import { RiImageLine, RiMusicLine } from "react-icons/ri";

interface BaseFieldProps {
  label: string;
  description?: string;
  value: any;
  onChange: (value: any) => void;
}

export const TextField = ({
  label,
  description,
  value,
  onChange,
}: BaseFieldProps) => (
  <div className="space-y-4">
    <label className="block text-sm font-medium text-white/60">
      {label}
      {description && (
        <span className="ml-2 text-xs text-white/40">{description}</span>
      )}
    </label>
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

export const TextAreaField = ({
  label,
  description,
  value,
  onChange,
}: BaseFieldProps) => (
  <div className="space-y-4">
    <label className="block text-sm font-medium text-white/60">
      {label}
      {description && (
        <span className="ml-2 text-xs text-white/40">{description}</span>
      )}
    </label>
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
      placeholder={`Enter ${label.toLowerCase()}...`}
    />
  </div>
);

interface ReferenceFieldProps extends BaseFieldProps {
  options: Array<{
    _id: string;
    name: string;
    image?: {
      asset?: {
        url?: string;
      };
    };
  }>;
}

export const ReferenceField = ({
  label,
  description,
  value,
  onChange,
  options,
}: ReferenceFieldProps) => {
  const selectedMember = options.find((m) => m._id === value?._ref);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-white/60">
        {label}
        {description && (
          <span className="ml-2 text-xs text-white/40">{description}</span>
        )}
      </label>
      {value?._ref ? (
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            {selectedMember?.image?.asset?.url && (
              <img
                src={selectedMember.image.asset.url}
                alt={selectedMember.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <div className="text-white">{selectedMember?.name}</div>
              <div className="text-sm text-white/60">Team Member</div>
            </div>
          </div>
          <button
            onClick={() => onChange(null)}
            className="px-2 py-1 text-sm text-white/60 hover:text-white/80 bg-black/40 hover:bg-black/60 rounded"
          >
            Change
          </button>
        </div>
      ) : (
        <select
          value={value?._ref || ""}
          onChange={(e) =>
            onChange({
              _ref: e.target.value,
              _type: "reference",
            })
          }
          className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export const ImageField = ({
  label,
  description,
  value,
  onChange,
}: BaseFieldProps) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-white/60">
        {label}
        {description && (
          <span className="ml-2 text-xs text-white/40">{description}</span>
        )}
      </label>
      <div className="space-y-4">
        {value?.asset?.url ? (
          <div className="relative group">
            <img
              src={value.asset.url}
              alt={value.alt || "Image preview"}
              className="w-full max-w-2xl rounded-lg border border-white/10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium text-white">
                    {value.title}
                  </div>
                  {value.team && (
                    <div className="text-xs text-white/60">
                      By {value.team.name}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                    className="px-2 py-1 bg-black/60 hover:bg-black rounded text-xs text-white/60 hover:text-white"
                  >
                    {isDetailsExpanded ? "Close" : "Details"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-lg bg-white/5">
            <RiImageLine className="w-8 h-8 text-white/40 mb-2" />
            <label className="cursor-pointer px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm">
              Choose File
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  // Handle image upload
                  console.log("Image upload not implemented yet");
                }}
              />
            </label>
            <p className="mt-2 text-sm text-white/40">No file chosen</p>
          </div>
        )}

        {/* Image Details Panel */}
        {isDetailsExpanded && value?.asset && (
          <div className="mt-2 p-4 bg-black/80 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-white/60 mb-1">Reference ID</div>
                <div className="text-sm font-mono bg-black/50 p-2 rounded">
                  {value.asset._ref}
                </div>
              </div>
              {value.asset.metadata && (
                <div>
                  <div className="text-sm text-white/60 mb-1">
                    Image Details
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm bg-black/50 p-2 rounded">
                      <span className="text-white/40">Width:</span>{" "}
                      <span className="text-white">
                        {value.asset.metadata.dimensions.width}px
                      </span>
                    </div>
                    <div className="text-sm bg-black/50 p-2 rounded">
                      <span className="text-white/40">Height:</span>{" "}
                      <span className="text-white">
                        {value.asset.metadata.dimensions.height}px
                      </span>
                    </div>
                    <div className="text-sm bg-black/50 p-2 rounded">
                      <span className="text-white/40">Size:</span>{" "}
                      <span className="text-white">
                        {Math.round(value.asset.size / 1024)}KB
                      </span>
                    </div>
                    <div className="text-sm bg-black/50 p-2 rounded">
                      <span className="text-white/40">Type:</span>{" "}
                      <span className="text-white">
                        {value.asset.mimeType.split("/")[1]}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AudioField = ({
  label,
  description,
  value,
  onChange,
}: BaseFieldProps) => (
  <div className="space-y-4">
    <label className="block text-sm font-medium text-white/60">
      {label}
      {description && (
        <span className="ml-2 text-xs text-white/40">{description}</span>
      )}
    </label>
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-lg bg-white/5">
      {value?.asset?.url ? (
        <div className="w-full">
          <audio controls src={value.asset.url} className="w-full" />
          <button className="mt-4 px-2 py-1 bg-black/60 hover:bg-black rounded text-xs text-white/60 hover:text-white">
            Change Audio
          </button>
        </div>
      ) : (
        <>
          <RiMusicLine className="w-8 h-8 text-white/40 mb-2" />
          <label className="cursor-pointer px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm">
            Choose File
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => {
                // Handle audio upload
                console.log("Audio upload not implemented yet");
              }}
            />
          </label>
          <p className="mt-2 text-sm text-white/40">No file chosen</p>
        </>
      )}
    </div>
  </div>
);
