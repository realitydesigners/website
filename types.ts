import type { PortableTextBlock } from '@portabletext/types';
import type { Image } from 'sanity';

export interface MenuItem {
   _type: string;
   slug?: string;
   title?: string;
}

export interface MilestoneItem {
   description?: string;
   duration?: {
      start?: string;
      end?: string;
   };
   image?: Image;
   tags?: string[];
   title?: string;
}

export interface ShowcaseProject {
   _type: string;
   coverImage?: Image;
   overview?: PortableTextBlock[];
   slug?: string;
   tags?: string[];
   title?: string;
}

// Page payloads

export interface HomePagePayload {
   footer?: PortableTextBlock[];
   overview?: PortableTextBlock[];
   showcaseProjects?: ShowcaseProject[];
   title?: string;
}

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
   menuItems?: MenuItem[];
   ogImage?: Image;
}

export interface BlockItem {
   // ... define the BlockItem properties as they appear in your data
   publicationDate?: string; // assuming publicationDate is optional within each block
   // ... other properties
}

export interface PostsPayload {
   title: string;
   slug: {
      current: string;
   };
   publicationDate?: string;
   excerpt?: string;
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
   block?: Array<{
      _key?: string;
      _type: string;
      heading?: string;
      subHeading?: string;
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
      tags?: string[];
      layout?: string;
      title?: string;
      publicationDate?: string;
      team?: {
         _id?: string;
         _type?: string;
         name: string;
         role: string;
         image: {
            _key?: string;
            _type?: string;
            alt?: string;
            asset: {
               _key?: string;
               _type?: string;
               url: string;
            };
         };
         shortBio: string;
      };
   }>;
   content?: Array<{
      _key?: string;
      _type: string;
      children?: Array<{
         _key?: string;
         _type: string;
         text: string;
         marks?: string[];
      }>;
      style?: string;
      list?: string;
      level?: number;
      media?: any; // Define this type more accurately based on what media contains
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
      videoRefData?: {
         videoTitle: string;
         videoFileUrl: string;
         videoImage: {
            _key?: string;
            _type?: string;
            alt?: string;
            asset: {
               _key?: string;
               _type?: string;
               url: string;
            };
         };
         videoTeam: {
            _id?: string;
            _type?: string;
            name: string;
            role: string;
            image: {
               _key?: string;
               _type?: string;
               alt?: string;
               asset: {
                  _key?: string;
                  _type?: string;
                  url: string;
               };
            };
         };
      };
      audioRefData?: {
         audioTitle: string;
         audioFileUrl: string;
      };
      quote?: {
         _key?: string;
         _type?: string;
         quote: string;
         mediaRef: {
            layout: string;
            image: string; // Should this be of type Image?
         };
      };
      markDefs?: Array<{
         _key?: string;
         _type: string;
         reference?: {
            _key?: string;
            _type?: string;
            slug: {
               current: string;
            };
         };
      }>;
      postsRef?: {
         postsTitle: string;
         postsSlug: string;
         postsImage: {
            _key?: string;
            _type?: string;
            alt?: string;
            asset: {
               _key?: string;
               _type?: string;
               url: string;
            };
         };
         postsExcerpt: string;
      };
      // ...other properties you might have in your portable text blocks
   }>;
   // ...other top-level fields you might have
}

export interface CategoryPayload {
   _id: string;
   _type?: string;
   title: string;
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
   subCategories: SubCategoryPayload[];
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
   videoRefData: {
      videoTitle: string;
      videoFileUrl: string;
      videoImage: {
         asset: {
            url: string;
         };
      };
      videoTeam: string;
      team: any;
   };
}
