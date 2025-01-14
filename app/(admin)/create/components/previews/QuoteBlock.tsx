import { useState, useEffect, useCallback } from "react";
import { DocumentIcon } from "@sanity/icons";
import { client } from "@/sanity/lib/client";

interface QuoteBlockProps {
  value: any;
}

export function QuoteBlock({ value }: QuoteBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value?.quote?._ref && !quoteData && !error) {
      loadQuoteData();
    }
  }, [value?.quote?._ref]);

  const loadQuoteData = useCallback(async () => {
    if (!value?.quote?._ref) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await client.fetch(
        `*[_type == "quote" && _id == $ref][0] {
          _id,
          quote,
          author,
          source,
          mediaRef {
            "image": image->{
              "image": {
                "asset": {
                  "url": image.asset->url
                }
              }
            },
            layout
          },
          team-> {
            name,
            "image": image.asset->url,
            "slug": slug.current
          }
        }`,
        { ref: value.quote._ref }
      );
      setQuoteData(data);
    } catch (err) {
      console.error("Error loading quote:", err);
      setError(err instanceof Error ? err.message : "Failed to load quote");
    }
    setIsLoading(false);
  }, [value?.quote?._ref]);

  if (!value?.quote?._ref) {
    return (
      <div className="flex items-center gap-4 p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg
        hover:bg-black/50 hover:border-white/20 transition-all duration-300 group">
        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg
          group-hover:bg-white/10 transition-colors duration-300">
          <DocumentIcon className="text-white/40 group-hover:text-white/60 transition-colors duration-300" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
            No quote selected
          </div>
          <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300 mt-0.5">
            Click to choose a quote
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-yellow-500/40 border-t-yellow-500 rounded-full animate-spin" />
          <span className="text-white/60 font-medium">Loading quote...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-4 p-6 bg-red-500/5 backdrop-blur-sm border border-red-500/20 rounded-lg">
        <div className="w-12 h-12 flex items-center justify-center bg-red-500/10 rounded-lg">
          <DocumentIcon className="text-red-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-red-400">Error loading quote</div>
          <div className="text-xs text-red-400/80 mt-0.5">{error}</div>
        </div>
      </div>
    );
  }

  if (!quoteData) {
    return (
      <div className="flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
        <div className="animate-pulse text-white/60">Loading quote data...</div>
      </div>
    );
  }

  const { quote, author, source, team, mediaRef } = quoteData;

  return (
    <div className="group relative mb-4">
      <div className="overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-white/10
        hover:border-white/20 transition-all duration-300">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
                Quote | {value.className || "quote-standard"}
              </div>
              <div className="font-russo text-xl text-white mb-4 italic">"{quote}"</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {team?.image && (
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
                      <img
                        src={team.image}
                        alt={team.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-white">{author}</div>
                    {source && (
                      <div className="text-xs text-white/60 mt-0.5">{source}</div>
                    )}
                  </div>
                </div>
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
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-3 p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10
          transform transition-all duration-300">
          <div className="space-y-6">
            <div>
              <div className="text-sm text-white/60 mb-2 font-medium">Reference ID</div>
              <div className="text-sm font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                {value.quote._ref}
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-2 font-medium">Style</div>
              <div className="text-sm font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                {value.className || "quote-standard"}
              </div>
            </div>
            {mediaRef?.layout && (
              <div>
                <div className="text-sm text-white/60 mb-2 font-medium">Layout</div>
                <div className="text-sm font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                  {mediaRef.layout}
                </div>
              </div>
            )}
            {team && (
              <div>
                <div className="text-sm text-white/60 mb-2 font-medium">Team Member</div>
                <div className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-white/5">
                  {team.image && (
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                      <img
                        src={team.image}
                        alt={team.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-white">{team.name}</div>
                    <div className="text-xs text-white/60 mt-0.5">@{team.slug}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 