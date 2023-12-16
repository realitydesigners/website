import type { PortableTextBlock } from '@portabletext/types';

export interface PagePayload {
   body?: PortableTextBlock[];
   name?: string;
   overview?: PortableTextBlock[];
   title?: string;
   slug?: string;
}

export interface ProjectPayload {
   client?: string;
   coverImage?: Image;
   description?: PortableTextBlock[];
   duration?: {
      start?: string;
      end?: string;
   };
   overview?: PortableTextBlock[];
   site?: string;
   slug: string;
   tags?: string[];
   title?: string;
}

export interface SettingsPayload {
   footer?: PortableTextBlock[];
   menuItems?: any;
   ogImage?: Image;
}

export interface ImageAsset {
   _key?: string;
   _type?: string;
   url: string;
}

export interface Image {
   _key?: string;
   _type?: string;
   alt?: string;
   asset: ImageAsset;
}

export interface TeamMember {
   _id?: string;
   _type?: string;
   name: string;
   role: string;
   image: Image;
   shortBio: string;
}

export interface MediaRef {
   layout?: string;
   image?: Image;
}

export interface BlockItem {
   _id: string;
   _key?: string;
   _type: string;
   heading?: string;
   subHeading?: string;
   image?: Image;
   tags?: string[];
   layout?: string;
   title?: string;
   publicationDate?: string;
   team?: TeamMember;
   media?: any; // Adjust based on actual media content
   videoRefData?: Array<VideoPayload>; // Simplify as per your requirement
   audioRefData?: any; // Simplify as per your requirement
   quote?: {
      _key?: string;
      _type?: string;
      quote: string;
      mediaRef?: MediaRef;
   };
   markDefs?: any; // Simplify as per your requirement
   postsRef?: any; // Simplify as per your requirement
   content?: Array<any>;
}

export interface PostsPayload {
   title?: string;
   slug?: {
      current?: string;
   };
   publicationDate?: string;
   excerpt?: string;
   image?: Image;
   block?: Array<BlockItem>;
   content?: Array<any>; // Define this type more accurately based on what content contains
   // ...other top-level fields you might have
}

export interface CategoryPayload {
   _id?: string;
   _type?: string;
   title?: string;
   category?: string;
   isMain?: boolean;
   slug?: {
      _type: string;
      current: string;
   };
   model?: {
      file?: any; // Replace 'any' with the appropriate type if known
      // ... other properties of model
   };
   sceneIdentifier?: string;
   subCategories?: SubCategoryPayload[];
}

export interface SubCategoryPayload {
   _id?: string;
   _type?: string;
   title?: string;
   slug?: {
      _type: string;
      current: string;
   };
   isMain?: boolean;
   sceneIdentifier?: string;
   model?: {
      file?: any; // Replace 'any' with the appropriate type if known
      // ... other properties of model
   };
   refPosts?: RefPostPayload[];
   // ... other properties if there are any
}

export interface RefPostPayload {
   _id: string;
   title: string;
   slug: {
      _type: string;
      current: string;
   };
   excerpt?: string;
   // ... other properties of posts
}

export interface VideoPayload {
   title: string;
   slug: {
      current?: string;
   };
   url: string;
   image?: {
      _key?: string;
      _type?: string;
      alt?: string;
      asset: {
         _key?: string;
         _type?: string;
         url: string;
      };
   };
   video: any;
   subcategories: Array<{
      name: string;
      title: string;
   }>;
   content?: Array<any>;
   block?: Array<BlockItem>;
   position: number;
   rotationY: number;
}

export interface TeamPayload {
   _id: string;
   _type: string;
   title: string;
   name: string;
   role: string;
   shortBio: string;
   block?: Array<BlockItem>;
   content?: Array<any>; // Define this more accurately
   slug: {
      _type: string;
      current: string;
   };
   bio?: Array<BlockItem>;
   image?: {
      _key?: string;
      _type?: string;
      alt?: string;
      asset: {
         _key?: string;
         _type?: string;
         url: string;
      };
   };
   scene?: string;
   instagram?: string;
   twitter?: string;
   website?: string;
   tiktok?: string;
}
