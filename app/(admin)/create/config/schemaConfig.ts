import type { ImageDocument } from '@/sanity/schemas/img';
import type { AudioDocument } from '@/sanity/schemas/audio';
import type { VideoDocument } from '@/sanity/schemas/video';
import type { QuoteDocument } from '@/sanity/schemas/quote';
import type { TeamDocument } from '@/sanity/schemas/team';
import type { CategoryDocument } from '@/sanity/schemas/category';
import type { LibraryDocument } from '@/sanity/schemas/library';
import type { ModelDocument } from '@/sanity/schemas/model';
import type { GlossaryDocument } from '@/sanity/schemas/glossary';
import type { PostsDocument } from '@/sanity/schemas/posts';

type SchemaConfig = {
  [key: string]: {
    columns: Array<{
      key: string;
      label: string;
    }>;
    getTitle: (doc: any) => string;
    getSubtitle: (doc: any) => string;
    query: string;
    showImage?: boolean;
  }
};

export const schemaConfig: SchemaConfig = {
  audio: {
    columns: [
      { key: "title", label: "Title" },
      { key: "description", label: "Description" },
      { key: "audioFile", label: "Audio" },
      { key: "team", label: "Team" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ],
    getTitle: (doc: AudioDocument) => doc.title || "Untitled",
    getSubtitle: (doc: AudioDocument) => doc.description || "No description",
    query: `*[_type == "audio"] {
      _id,
      _createdAt,
      _type,
      title,
      description,
      "audioUrl": audioFile.asset->url,
      team-> {
        name,
        "image": image.asset->url
      }
    }`,
    showImage: false
  },

  posts: {
    columns: [
      { key: "image", label: "Image" },
      { key: "heading", label: "Heading" },
      { key: "subheading", label: "Subheading" },
      { key: "slug", label: "Slug" },
      { key: "team", label: "Team" },
      { key: "category", label: "Category" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ],
    getTitle: (doc: PostsDocument) => doc.block?.[0]?.heading || "Untitled",
    getSubtitle: (doc: PostsDocument) => doc.block?.[0]?.subheading || "No subheading",
    query: `*[_type == "posts"] {
      _id,
      _createdAt,
      _type,
      slug,
      "firstBlock": block[0] {
        _type,
        heading,
        subheading,
        layout,
        publicationDate,
        "imageUrl": imageRef->image.asset->url,
        team->{
          name,
          role,
          "image": image.asset->url
        },
        category->{
          title,
          "slug": slug.current
        }
      },
      block[] {
        _type,
        _key,
        heading,
        subheading,
        layout,
        publicationDate,
        content,
        "imageRef": {
          "_type": "reference",
          "_ref": imageRef._ref,
          "image": imageRef-> {
            "asset": {
              "_ref": image.asset._ref,
              "_type": image.asset._type,
              "url": image.asset->url
            }
          }
        },
        "team": {
          "_type": "reference",
          "_ref": team._ref,
          "name": team->name,
          "role": team->role,
          "image": team->image {
            "asset": {
              "_ref": asset._ref,
              "_type": asset._type,
              "url": asset->url
            }
          }
        },
        "category": {
          "_type": "reference",
          "_ref": category._ref,
          "title": category->title,
          "slug": category->slug.current
        }
      }
    }`,
    showImage: true
  },

  img: {
    columns: [
      { key: "image", label: "Image" },
      { key: "title", label: "Title" },
      { key: "alt", label: "Alt Text" },
      { key: "team", label: "Team" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ],
    getTitle: (doc: ImageDocument) => doc.title || "Untitled",
    getSubtitle: (doc: ImageDocument) => doc.alt || "No alt text",
    query: `*[_type == "img"] {
      _id,
      _createdAt,
      _type,
      title,
      alt,
      "imageUrl": image.asset->url,
      team->{
        name,
        "image": image.asset->url
      }
    }`,
    showImage: true
  },

  video: {
    columns: [
      { key: "image", label: "Thumbnail" },
      { key: "title", label: "Title" },
      { key: "url", label: "URL" },
      { key: "team", label: "Team" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ],
    getTitle: (doc: VideoDocument) => doc.title || "Untitled",
    getSubtitle: (doc: VideoDocument) => doc.url || "No URL",
    query: `*[_type == "video"] {
      _id,
      _createdAt,
      _type,
      title,
      url,
      "imageUrl": image.asset->url,
      "videoUrl": video.asset->url,
      team->{
        name,
        "image": image.asset->url
      }
    }`,
    showImage: true
  },

  team: {
    columns: [
      { key: "image", label: "Image" },
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "shortBio", label: "Bio" },
      { key: "socials", label: "Social Links" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ],
    getTitle: (doc: TeamDocument) => doc.name || "Untitled",
    getSubtitle: (doc: TeamDocument) => doc.role || "No role",
    query: `*[_type == "team"] {
      _id,
      _createdAt,
      _type,
      name,
      role,
      shortBio,
      "imageUrl": image.asset->url,
      instagram,
      twitter,
      website,
      tiktok,
      scene
    }`,
    showImage: true
  },

  quote: {
    columns: [
      { key: "image", label: "Image" },
      { key: "quote", label: "Quote" },
      { key: "layout", label: "Layout" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ],
    getTitle: (doc: QuoteDocument) => doc.quote?.substring(0, 50) + "..." || "Untitled",
    getSubtitle: (doc: QuoteDocument) => doc.mediaRef?.layout || "Default Layout",
    query: `*[_type == "quote"] {
      _id,
      _createdAt,
      _type,
      quote,
      mediaRef {
        "image": image->{
          "image": {
            "asset": {
              "url": image.asset->url
            }
          }
        },
        layout
      }
    }`,
    showImage: true
  },

  category: {
    columns: [
      { key: "title", label: "Title" },
      { key: "slug", label: "Slug" },
      { key: "model", label: "3D Model" },
      { key: "isMain", label: "Main Category" },
      { key: "subcategories", label: "Subcategories" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ],
    getTitle: (doc: CategoryDocument) => doc.title || "Untitled",
    getSubtitle: (doc: CategoryDocument) => doc.slug?.current || "No slug",
    query: `*[_type == "category"] {
      _id,
      _createdAt,
      _type,
      title,
      "slug": slug.current,
      isMain,
      sceneIdentifier,
      model-> {
        title,
        "fileUrl": file.asset->url
      },
      "subcategoriesCount": count(subcategories)
    }`,
    showImage: false
  },

  library: {
    columns: [
      { key: "image", label: "Image" },
      { key: "title", label: "Title" },
      { key: "model", label: "3D Model" },
      { key: "isMain", label: "Main Category" },
      { key: "subcategories", label: "Subcategories" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ],
    getTitle: (doc: LibraryDocument) => doc.title || "Untitled",
    getSubtitle: (doc: LibraryDocument) => doc.slug?.current || "No slug",
    query: `*[_type == "library"] {
      _id,
      _createdAt,
      _type,
      title,
      "slug": slug.current,
      isMain,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      model-> {
        title,
        "fileUrl": file.asset->url
      },
      "subcategoriesCount": count(subcategories),
      block[] {
        _type,
        heading,
        subheading
      }
    }`,
    showImage: true
  },

  model: {
    columns: [
      { key: "title", label: "Title" },
      { key: "file", label: "3D File" },
      { key: "fileInfo", label: "File Info" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ],
    getTitle: (doc: ModelDocument) => doc.title || "Untitled",
    getSubtitle: (doc: ModelDocument) => doc.file?.asset?.originalFilename || "No file",
    query: `*[_type == "model"] {
      _id,
      _createdAt,
      _type,
      title,
      "fileUrl": file.asset->url,
      "fileName": file.asset->originalFilename,
      "fileSize": file.asset->size,
      "fileType": file.asset->mimeType
    }`,
    showImage: false
  },

  glossary: {
    columns: [
      { key: "title", label: "Title" },
      { key: "definition", label: "Definition" },
      { key: "model", label: "3D Model" },
      { key: "image", label: "Image" },
      { key: "refPosts", label: "Referenced Posts" },
      { key: "created", label: "Created" },
      { key: "actions", label: "Actions" },
    ],
    getTitle: (doc: GlossaryDocument) => doc.title || "Untitled",
    getSubtitle: (doc: GlossaryDocument) => doc.definition?.substring(0, 50) + "..." || "No definition",
    query: `*[_type == "glossary"] {
      _id,
      _createdAt,
      _type,
      title,
      definition,
      "slug": slug.current,
      model-> {
        title,
        "fileUrl": file.asset->url
      },
      mediaRef {
        "imageUrl": image->image.asset->url,
        layout
      },
      "refPostsCount": count(refPosts)
    }`,
    showImage: true
  }
}; 