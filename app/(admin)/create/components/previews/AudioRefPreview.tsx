"use client";
import { useState } from "react";
import { PlayIcon, PauseIcon } from "@sanity/icons";

interface AudioRefPreviewProps {
  value: any;
  audioData: any;
  isLoading: boolean;
  error: string | null;
}

export function AudioRefPreview({
  value,
  audioData,
  isLoading,
  error,
}: AudioRefPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Handle audio playback
  const togglePlayback = () => {
    if (!audioElement) {
      const audio = new Audio(audioData?.audioRefData?.audioFileUrl);
      audio.addEventListener('ended', () => setIsPlaying(false));
      setAudioElement(audio);
      audio.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500/40 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-white/60 font-medium">Loading audio...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-4 p-6 bg-red-500/5 backdrop-blur-sm border border-red-500/20 rounded-lg">
        <div className="w-12 h-12 flex items-center justify-center bg-red-500/10 rounded-lg">
          <PlayIcon className="text-red-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-red-400">Error loading audio</div>
          <div className="text-xs text-red-400/80 mt-0.5">{error}</div>
        </div>
      </div>
    );
  }

  if (!audioData) {
    return (
      <div className="flex items-center gap-4 p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg
        hover:bg-black/50 hover:border-white/20 transition-all duration-300 group">
        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg
          group-hover:bg-white/10 transition-colors duration-300">
          <PlayIcon className="text-white/40 group-hover:text-white/60 transition-colors duration-300" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
            No audio selected
          </div>
          <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300 mt-0.5">
            Click to choose an audio file
          </div>
        </div>
      </div>
    );
  }

  const { audioTitle, audioFileUrl } = audioData.audioRefData;

  return (
    <div className="group relative mb-4">
      <div className="overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-white/10
        hover:border-white/20 transition-all duration-300">
        <div className="flex items-center p-6">
          <button
            onClick={togglePlayback}
            className="w-12 h-12 flex items-center justify-center bg-blue-500/10 text-blue-500
              rounded-full hover:bg-blue-500/20 transition-colors duration-300 mr-4
              border border-blue-500/20 hover:border-blue-500/40"
          >
            {isPlaying ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="text-base font-russo text-white truncate">{audioTitle}</div>
            <div className="text-sm text-white/60 truncate mt-1">
              {value.className || "audio-standard"}
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full
              text-sm text-white/80 hover:text-white border border-white/10 hover:border-white/20
              transition-all duration-300 ml-4"
          >
            {isExpanded ? "Close" : "Details"}
          </button>
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
                {value.audio._ref}
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-2 font-medium">Style</div>
              <div className="text-sm font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                {value.className || "audio-standard"}
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-2 font-medium">Audio Preview</div>
              <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                <audio
                  src={audioFileUrl}
                  controls
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 