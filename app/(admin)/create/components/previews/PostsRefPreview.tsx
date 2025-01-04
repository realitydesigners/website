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
      <div className="flex items-center gap-3 p-4 bg-black/20 border border-white/10 rounded-lg">
        <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded">
          <LinkIcon className="text-white/40" />
        </div>
        <div className="flex-grow">
          <div className="text-sm text-white/60">No post selected</div>
          <div className="text-xs text-white/40">Click to choose a post</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 bg-black/20 rounded-lg">
        <div className="animate-pulse text-white/60">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-950/20 border border-red-500/20 rounded-lg">
        <div className="text-red-400">
          <div className="text-sm font-medium">Error loading post</div>
          <div className="text-xs opacity-80">{error}</div>
        </div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="flex items-center justify-center p-6 bg-black/20 rounded-lg">
        <div className="animate-pulse text-white/60">Loading post data...</div>
      </div>
    );
  }

  const { title, image, slug, block } = postData;
  const team = block[0]?.imageRef?.team;

  return (
    <div className="group relative">
      <div className="flex w-full items-center justify-center py-4 px-4">
        <div className="bg-gradient-to-r from-blue-200/10 to-blue-100/5 w-full rounded-lg group flex h-auto flex-row p-3 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          {image && (
            <img
              src={image}
              alt={title}
              className="h-[80px] max-w-[80px] rounded-[.5em] object-cover"
            />
          )}
          <div className="relative flex w-3/4 flex-col pl-4">
            <p className="pt-2 mb-2 font-bold font-kodemono text-xs uppercase leading-none tracking-wide text-gray-200/50">
              Related Post
            </p>
            <div className="flex items-center justify-between">
              <h3 className="font-russo font-bold leading-[1.2em] text-xl lg:text-2xl text-white transition-colors group-hover:text-gray-100">
                {title}
              </h3>
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
        <div className="mt-2 mx-4 p-4 bg-black/80 backdrop-blur-sm rounded-lg border border-white/10">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-white/60 mb-1">Reference ID</div>
              <div className="text-sm font-mono bg-black/50 p-2 rounded">
                {value.posts._ref}
              </div>
            </div>
            {team && (
              <div>
                <div className="text-sm text-white/60 mb-1">Team Member</div>
                <div className="flex items-center gap-2 bg-black/50 p-2 rounded">
                  {team.image && (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={team.image}
                        alt={team.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-white">{team.name}</div>
                    <div className="text-xs text-white/60">@{team.slug}</div>
                  </div>
                </div>
              </div>
            )}
            {slug && (
              <div>
                <div className="text-sm text-white/60 mb-1">Slug</div>
                <div className="text-sm bg-black/50 p-2 rounded text-white">
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
