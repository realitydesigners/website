"use client";
import { useState, useCallback, useEffect } from "react";
import { LinkIcon } from "@sanity/icons";
import { client } from "@/sanity/lib/client";

interface PostsRefPreviewProps {
  value: any;
}

export function PostsRefPreview({ value }: PostsRefPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postData, setPostData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value?.posts?._ref && !postData && !error) {
      loadPostData();
    }
  }, [value?.posts?._ref]);

  const loadPostData = useCallback(async () => {
    if (!value?.posts?._ref) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await client.fetch(
        `*[_type == "posts" && _id == $ref][0] {
          _id,
          "title": block[0].heading,
          "image": block[0].imageRef->image.asset->url,
          "publicationDate": block[0].publicationDate,
          "slug": slug.current,
          block[0] {
            heading,
            subheading,
            imageRef-> {
              image {
                asset->
              },
              team-> {
                name,
                "image": image.asset->url,
                "slug": slug.current
              }
            }
          }
        }`,
        { ref: value.posts._ref }
      );
      setPostData(data);
    } catch (err) {
      console.error("Error loading post:", err);
      setError(err instanceof Error ? err.message : "Failed to load post");
    }
    setIsLoading(false);
  }, [value?.posts?._ref]);

  if (!value?.posts?._ref) {
    return (
      <div className="flex items-center gap-4 p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg
        hover:bg-black/50 hover:border-white/20 transition-all duration-300 group">
        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg
          group-hover:bg-white/10 transition-colors duration-300">
          <LinkIcon className="text-white/40 group-hover:text-white/60 transition-colors duration-300" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300">
            No post selected
          </div>
          <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300 mt-0.5">
            Click to choose a post
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500/40 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-white/60 font-medium">Loading post...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-4 p-6 bg-red-500/5 backdrop-blur-sm border border-red-500/20 rounded-lg">
        <div className="w-12 h-12 flex items-center justify-center bg-red-500/10 rounded-lg">
          <LinkIcon className="text-red-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-red-400">Error loading post</div>
          <div className="text-xs text-red-400/80 mt-0.5">{error}</div>
        </div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10">
        <div className="animate-pulse text-white/60">Loading post data...</div>
      </div>
    );
  }

  const { title, image, slug, block } = postData;
  const team = block[0]?.imageRef?.team;
  const subheading = block[0]?.subheading;

  return (
    <div className="group relative mb-4">
      <div className="overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-white/10
        hover:border-white/20 transition-all duration-300">
        <div className="flex items-stretch">
          {image && (
            <div className="relative w-[200px] overflow-hidden">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700
                  group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>
          )}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                  Related Post
                </div>
                <h3 className="font-russo text-2xl text-white mb-2 line-clamp-2">{title}</h3>
                {subheading && (
                  <p className="text-sm text-white/80 line-clamp-2 mb-4">{subheading}</p>
                )}
                {team && (
                  <div className="flex items-center gap-2">
                    {team.image && (
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
                        <img
                          src={team.image}
                          alt={team.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="text-sm text-white/60">{team.name}</div>
                  </div>
                )}
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
                {value.posts._ref}
              </div>
            </div>
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
            {slug && (
              <div>
                <div className="text-sm text-white/60 mb-2 font-medium">Slug</div>
                <div className="text-sm bg-black/40 p-3 rounded-lg border border-white/5 text-white">
                  {slug}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
