"use client";

import {
  defineSchema,
  EditorEventListener,
  EditorProvider,
  PortableTextEditable,
  useEditor,
} from "@portabletext/editor";
import type {
  PortableTextBlock,
  RenderDecoratorFunction,
  RenderStyleFunction,
} from "@portabletext/editor";
import { useCallback, useState, useEffect } from "react";
import {
  PlayIcon,
  ImageIcon,
  DocumentVideoIcon,
  DocumentIcon,
  LinkIcon,
} from "@sanity/icons";
import { client } from "@/sanity/lib/client";
import { ImageRefPreview } from "./previews/ImageRefPreview";
import { PostsRefPreview } from "./previews/PostsRefPreview";

// Define the schema for our editor to match your Sanity schema
const schemaDefinition = defineSchema({
  decorators: [
    { name: "strong" },
    { name: "em" },
    { name: "underline" },
    { name: "strike-through" },
  ],
  styles: [
    { name: "normal" },
    { name: "h1" },
    { name: "h2" },
    { name: "h3" },
    { name: "h4" },
    { name: "h5" },
    { name: "h6" },
    { name: "blockquote" },
  ],
  lists: [{ name: "bullet" }, { name: "number" }],
  annotations: [
    {
      name: "internalLink",
      title: "Internal Link",
      type: "object",
      fields: [
        { name: "reference", type: "reference" },
        { name: "theme", type: "string" },
      ],
    },
  ],
  blockObjects: [
    {
      name: "imageRef",
      title: "Image",
      type: "object",
      fields: [
        { name: "image", type: "reference" },
        { name: "className", type: "string" },
      ],
    },
    {
      name: "videoRef",
      title: "Video",
      type: "object",
      fields: [
        { name: "video", type: "reference" },
        { name: "className", type: "string" },
      ],
    },
    {
      name: "quoteRef",
      title: "Quote",
      type: "object",
      fields: [
        { name: "quote", type: "reference" },
        { name: "className", type: "string" },
      ],
    },
    {
      name: "audioRef",
      title: "Audio",
      type: "object",
      fields: [
        { name: "audio", type: "reference" },
        { name: "className", type: "string" },
      ],
    },
    {
      name: "postsRef",
      title: "Post Reference",
      type: "object",
      fields: [{ name: "posts", type: "reference" }],
    },
  ],
});

// Render functions for different elements
const renderStyle: RenderStyleFunction = (props) => {
  const style = props.schemaType.value;
  switch (style) {
    case "h1":
      return <h1 className="text-3xl font-bold mb-4">{props.children}</h1>;
    case "h2":
      return <h2 className="text-2xl font-bold mb-3">{props.children}</h2>;
    case "h3":
      return <h3 className="text-xl font-bold mb-2">{props.children}</h3>;
    case "h4":
      return <h4 className="text-lg font-bold mb-2">{props.children}</h4>;
    case "h5":
      return <h5 className="text-base font-bold mb-2">{props.children}</h5>;
    case "h6":
      return <h6 className="text-sm font-bold mb-2">{props.children}</h6>;
    case "blockquote":
      return (
        <blockquote className="border-l-4 border-white/20 pl-4 italic">
          {props.children}
        </blockquote>
      );
    default:
      return <p className="mb-4">{props.children}</p>;
  }
};

const renderDecorator: RenderDecoratorFunction = (props) => {
  switch (props.value) {
    case "strong":
      return <strong>{props.children}</strong>;
    case "em":
      return <em>{props.children}</em>;
    case "underline":
      return <u>{props.children}</u>;
    case "strike-through":
      return <s>{props.children}</s>;
    default:
      return <>{props.children}</>;
  }
};

// Custom block preview components
async function fetchAudioData(ref: string) {
  const cleanRef = ref.replace(/^reference-/, "");

  return client.fetch(
    `
    *[_type == "audio" && _id == $ref][0] {
      "audioRefData": {
        "audioTitle": title,
        "audioFileUrl": audioFile.asset->url
      }
    }
  `,
    { ref: cleanRef }
  );
}

async function fetchImageData(ref: string) {
  const cleanRef = ref.replace(/^reference-/, "");

  return client.fetch(
    `
    *[_type == "img" && _id == $ref][0] {
      title,
      "image": {
        "image": {
          "_type": "image",
          "asset": {
            "_ref": image.asset._ref,
            "_type": "reference",
            "url": image.asset->url,
            "metadata": image.asset->metadata,
            "mimeType": image.asset->mimeType,
            "size": image.asset->size
          },
          "alt": alt,
          "hotspot": image.hotspot,
          "crop": image.crop
        },
        "team": team->{
          name,
          "image": {
            "_type": "image",
            "asset": {
              "_ref": image.asset._ref,
              "_type": "reference",
              "url": image.asset->url
            }
          },
          "slug": slug
        }
      }
    }
  `,
    { ref: cleanRef }
  );
}

function AudioPreview({ value }: { value: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [audioData, setAudioData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data immediately on mount
  useEffect(() => {
    if (value.audio?._ref && !audioData && !error) {
      loadAudioData();
    }
  }, [value.audio?._ref]);

  const loadAudioData = useCallback(async () => {
    if (!value.audio?._ref) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAudioData(value.audio._ref);
      setAudioData(data?.audioRefData);
    } catch (err) {
      console.error("Error loading audio:", err);
      setError(err instanceof Error ? err.message : "Failed to load audio");
    }
    setIsLoading(false);
  }, [value.audio?._ref]);

  return (
    <div className="group relative">
      <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded border border-white/10 group-hover:border-white/20">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500/10 text-blue-500 rounded">
          <PlayIcon />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">
              Audio | Style {value.className || "1"}
            </span>
          </div>
          <div className="text-sm text-white truncate">
            {isLoading ? (
              "Loading..."
            ) : error ? (
              <span className="text-red-400">Error: {error}</span>
            ) : audioData ? (
              audioData.audioTitle
            ) : (
              "Select audio file..."
            )}
          </div>
          {audioData?.audioFileUrl && (
            <audio
              src={audioData.audioFileUrl}
              className="mt-2 w-full"
              controls
            />
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-white/60 hover:text-white"
        >
          {isExpanded ? "Close" : "Edit"}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-2 p-3 bg-[#1a1a1a] rounded border border-white/10">
          {isLoading ? (
            <div className="text-sm text-white/60">Loading audio data...</div>
          ) : error ? (
            <div className="text-sm text-red-400">
              Failed to load audio: {error}
              <div className="mt-1 text-white/60">
                Debug info:
                <pre className="mt-1 p-2 bg-black/30 rounded">
                  {JSON.stringify({ ref: value.audio?._ref }, null, 2)}
                </pre>
              </div>
            </div>
          ) : audioData ? (
            <div className="space-y-2">
              <div>
                <div className="text-sm text-white/60">Title</div>
                <div className="text-sm text-white">{audioData.audioTitle}</div>
              </div>
              {audioData.audioFileUrl && (
                <div>
                  <div className="text-sm text-white/60">Audio File</div>
                  <div className="text-sm text-white truncate">
                    {audioData.audioFileUrl}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-white/60">No audio data available</div>
          )}
        </div>
      )}
    </div>
  );
}

function VideoPreview({ value }: { value: any }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded border border-white/10">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-500/10 text-purple-500 rounded">
        <DocumentVideoIcon />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">
            Video | {value.className || "Default"}
          </span>
        </div>
        <div className="text-sm text-white truncate">
          {value._ref || "Select video..."}
        </div>
      </div>
    </div>
  );
}

function ImagePreview({ value }: { value: any }) {
  const [imageData, setImageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (value.image?._ref && !imageData && !error) {
      loadImageData();
    }
  }, [value.image?._ref]);

  const loadImageData = useCallback(async () => {
    if (!value.image?._ref) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchImageData(value.image._ref);
      setImageData(data);
    } catch (err) {
      console.error("Error loading image:", err);
      setError(err instanceof Error ? err.message : "Failed to load image");
    }
    setIsLoading(false);
  }, [value.image?._ref]);

  return (
    <ImageRefPreview
      value={value}
      imageData={imageData}
      isLoading={isLoading}
      error={error}
    />
  );
}

function QuotePreview({ value }: { value: any }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded border border-white/10">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-yellow-500/10 text-yellow-500 rounded">
        <DocumentIcon />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">
            Quote | {value.className || "Default"}
          </span>
        </div>
        <div className="text-sm text-white truncate">
          {value._ref || "Select quote..."}
        </div>
      </div>
    </div>
  );
}

function PostSelector({
  onSelect,
  onClose,
}: {
  onSelect: (ref: string) => void;
  onClose: () => void;
}) {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const results = await client.fetch(
        `*[_type == "posts"] | order(block[0].publicationDate desc) {
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
        }`
      );
      setPosts(
        results.map((post) => ({
          _id: post._id,
          heading: post.block[0]?.heading || post.title || "Untitled",
          image: post.block[0]?.imageRef?.image?.asset?.url || post.image,
          publicationDate:
            post.block[0]?.publicationDate || post.publicationDate,
          slug: post.slug,
        }))
      );
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg w-[800px] max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Select Post</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {isLoading ? (
            <div className="text-white/60">Loading posts...</div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-white/60">No posts found</div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {posts.map((post) => (
                <button
                  key={post._id}
                  onClick={() => onSelect(post._id)}
                  className="flex items-start gap-4 p-3 bg-black/20 hover:bg-black/40 rounded-lg transition-colors text-left group"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.heading}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-russo text-lg text-white truncate group-hover:text-blue-400">
                      {post.heading || "Untitled"}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="text-xs text-white/40">{post.slug}</div>
                      {post.publicationDate && (
                        <div className="text-xs text-white/40">
                          {new Date(post.publicationDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const renderBlockObject = (props: any) => {
  const { value, schemaType } = props;

  switch (schemaType.name) {
    case "audioRef":
      return <AudioPreview value={value} />;
    case "videoRef":
      return <VideoPreview value={value} />;
    case "imageRef":
      return <ImagePreview value={value} />;
    case "quoteRef":
      return <QuotePreview value={value} />;
    case "postsRef":
      return <PostsRefPreview value={value} />;
    default:
      return (
        <div className="p-2 bg-[#1a1a1a] rounded border border-white/10">
          <pre className="text-sm text-white/60">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      );
  }
};

// Add this new component for content selection
function ContentSelector({
  type,
  onSelect,
  onClose,
}: {
  type: string;
  onSelect: (ref: string) => void;
  onClose: () => void;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        // Map type to Sanity document type
        const docType =
          type === "imageRef"
            ? "img"
            : type === "audioRef"
              ? "audio"
              : type === "videoRef"
                ? "video"
                : type === "quoteRef"
                  ? "quote"
                  : "posts";

        const query = `*[_type == "${docType}"] {
          _id,
          title,
          ${docType === "img" ? '"preview": image.asset->url,' : ""}
          ${docType === "audio" ? '"preview": audioFile.asset->url,' : ""}
          ${docType === "video" ? '"preview": videoFile.asset->url,' : ""}
          "type": _type
        }`;

        const result = await client.fetch(query);
        setItems(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load items");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [type]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] p-4 rounded-lg w-[500px] max-h-[80vh] overflow-auto">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-4 rounded-lg w-[500px] max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg text-white">
            Select {type.replace("Ref", "")}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        {error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <button
                key={item._id}
                onClick={() => onSelect(item._id)}
                className="w-full flex items-center gap-3 p-3 bg-black/20 rounded border border-white/10 hover:border-white/20 text-left"
              >
                {item.preview &&
                  (type === "imageRef" ? (
                    <img
                      src={item.preview}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded">
                      {type === "audioRef" && <PlayIcon />}
                      {type === "videoRef" && <DocumentVideoIcon />}
                      {type === "quoteRef" && <DocumentIcon />}
                    </div>
                  ))}
                <div className="flex-grow">
                  <div className="text-sm text-white truncate">
                    {item.title}
                  </div>
                  <div className="text-xs text-white/60">{item._id}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Toolbar() {
  const editor = useEditor();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showPostSelector, setShowPostSelector] = useState(false);

  const toggleStyle = useCallback(
    (style: string) => {
      editor?.send({
        type: "style.toggle",
        style,
      });
      editor?.send({ type: "focus" });
    },
    [editor]
  );

  const toggleDecorator = useCallback(
    (decorator: string) => {
      editor?.send({
        type: "decorator.toggle",
        decorator,
      });
      editor?.send({ type: "focus" });
    },
    [editor]
  );

  const toggleList = useCallback(
    (list: string) => {
      editor?.send({
        type: "list item.toggle",
        listItem: list,
      });
      editor?.send({ type: "focus" });
    },
    [editor]
  );

  const insertBlock = useCallback((type: string) => {
    if (type === "postsRef") {
      setShowPostSelector(true);
      return;
    }
    setSelectedType(type);
  }, []);

  const handleSelect = useCallback(
    (ref: string) => {
      if (!selectedType || !editor) return;

      editor.send({
        type: "insert.block object",
        placement: "after",
        blockObject: {
          name: selectedType,
          value: {
            _type: selectedType,
            [selectedType === "imageRef"
              ? "image"
              : selectedType === "audioRef"
                ? "audio"
                : selectedType === "videoRef"
                  ? "video"
                  : selectedType === "quoteRef"
                    ? "quote"
                    : "posts"]: {
              _type: "reference",
              _ref: ref,
            },
            className: `${selectedType.replace("Ref", "")}-standard`,
          },
        },
      });
      editor.send({ type: "focus" });
      setSelectedType(null);
    },
    [editor, selectedType]
  );

  const handlePostSelect = useCallback(
    (ref: string) => {
      if (!editor) return;

      editor.send({
        type: "insert.block object",
        placement: "after",
        blockObject: {
          name: "postsRef",
          value: {
            _type: "postsRef",
            posts: {
              _type: "reference",
              _ref: ref,
            },
          },
        },
      });
      editor.send({ type: "focus" });
      setShowPostSelector(false);
    },
    [editor]
  );

  return (
    <>
      <div className="flex items-center gap-2 p-2 bg-[#101112] border-b border-white/10">
        <select
          onChange={(e) => toggleStyle(e.target.value)}
          className="px-2 py-1 bg-transparent text-white text-sm border border-white/10 rounded"
          defaultValue="normal"
        >
          <option value="normal">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>

        <div className="flex gap-1">
          <button
            onClick={() => toggleDecorator("strong")}
            className="p-1.5 hover:bg-white/10 rounded"
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() => toggleDecorator("em")}
            className="p-1.5 hover:bg-white/10 rounded italic"
            title="Italic"
          >
            I
          </button>
          <button
            onClick={() => toggleDecorator("underline")}
            className="p-1.5 hover:bg-white/10 rounded underline"
            title="Underline"
          >
            U
          </button>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => toggleList("bullet")}
            className="p-1.5 hover:bg-white/10 rounded"
            title="Bullet List"
          >
            •
          </button>
          <button
            onClick={() => toggleList("number")}
            className="p-1.5 hover:bg-white/10 rounded"
            title="Numbered List"
          >
            1.
          </button>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => insertBlock("imageRef")}
            className="p-1.5 hover:bg-white/10 rounded flex items-center justify-center w-8 h-8 bg-blue-500/10 text-blue-500"
            title="Add Image"
          >
            <ImageIcon />
          </button>
          <button
            onClick={() => insertBlock("videoRef")}
            className="p-1.5 hover:bg-white/10 rounded flex items-center justify-center w-8 h-8 bg-purple-500/10 text-purple-500"
            title="Add Video"
          >
            <DocumentVideoIcon />
          </button>
          <button
            onClick={() => insertBlock("quoteRef")}
            className="p-1.5 hover:bg-white/10 rounded flex items-center justify-center w-8 h-8 bg-yellow-500/10 text-yellow-500"
            title="Add Quote"
          >
            <DocumentIcon />
          </button>
          <button
            onClick={() => insertBlock("audioRef")}
            className="p-1.5 hover:bg-white/10 rounded flex items-center justify-center w-8 h-8 bg-green-500/10 text-green-500"
            title="Add Audio"
          >
            <PlayIcon />
          </button>
          <button
            onClick={() => insertBlock("postsRef")}
            className="p-1.5 hover:bg-white/10 rounded flex items-center justify-center w-8 h-8 bg-red-500/10 text-red-500"
            title="Add Post Reference"
          >
            <LinkIcon />
          </button>
        </div>
      </div>

      {selectedType && (
        <ContentSelector
          type={selectedType}
          onSelect={handleSelect}
          onClose={() => setSelectedType(null)}
        />
      )}

      {showPostSelector && (
        <PostSelector
          onSelect={handlePostSelect}
          onClose={() => setShowPostSelector(false)}
        />
      )}
    </>
  );
}

interface RichTextEditorProps {
  value: PortableTextBlock[];
  onChange: (value: PortableTextBlock[]) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div className="flex flex-col">
      <EditorProvider
        initialConfig={{
          schemaDefinition,
          initialValue: value,
        }}
      >
        <EditorEventListener
          on={(event) => {
            if (event.type === "mutation") {
              onChange(event.value);
            }
          }}
        />
        <Toolbar />
        <div className="relative">
          <PortableTextEditable
            className="min-h-[200px] p-4 bg-[#101112] text-white focus:outline-none"
            renderStyle={renderStyle}
            renderDecorator={renderDecorator}
            renderBlock={(props) => {
              // Only use renderBlockObject for special blocks (audio, image, etc.)
              if (
                props.value._type &&
                [
                  "audioRef",
                  "videoRef",
                  "imageRef",
                  "quoteRef",
                  "postsRef",
                ].includes(props.value._type)
              ) {
                return renderBlockObject({
                  value: props.value,
                  schemaType: { name: props.value._type },
                });
              }
              // For regular text blocks, render normally
              return <div className="mb-4 text-white">{props.children}</div>;
            }}
            renderListItem={(props) => (
              <li className="ml-4">{props.children}</li>
            )}
          />
        </div>
      </EditorProvider>
    </div>
  );
}
