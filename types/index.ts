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
   title?: string;
   category?: string;
   excerpt?: string;
   tags?: string[];
   slug?: {
      current: string;
   };
   publicationDate?: string;
   image?: Image;
   block?: BlockItem[]; // Add this line to include the 'block' property
   content?: PortableTextBlock[];
}
