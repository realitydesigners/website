/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */
import useSWR from 'swr';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { presentationTool } from 'sanity/presentation';

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';
import { locate } from '@/sanity/plugins/locate';
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings';
import page from '@/sanity/schemas/documents/page';
import project from '@/sanity/schemas/documents/project';
import duration from '@/sanity/schemas/objects/duration';
import milestone from '@/sanity/schemas/objects/milestone';
import timeline from '@/sanity/schemas/objects/timeline';
import home from '@/sanity/schemas/singletons/home';
import settings from '@/sanity/schemas/singletons/settings';
//import { theme } from 'https://themer.sanity.build/api/hues?default=lightest:b0bed4;darkest:000000';
import CustomField from './sanity/ui/CustomField';
import CustomItem from '@/sanity/ui/CustomItem';

import posts from '@/sanity/schemas/posts';
import team from '@/sanity/schemas/team';
import category from '@/sanity/schemas/category';
import media from '@/sanity/schemas/media';
import img from '@/sanity/schemas/img';
import quote from '@/sanity/schemas/quote';
import video from '@/sanity/schemas/video';
import audio from '@/sanity/schemas/audio';
import model from '@/sanity/schemas/model';
import library from '@/sanity/schemas/library';
import headingBlock from '@/sanity/schemas/blocks/headingBlock';
import contentBlock from '@/sanity/schemas/blocks/contentBlock';
import teamBlock from '@/sanity/schemas/blocks/teamBlock';

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Reality Designers';

export default defineConfig({
   basePath: studioUrl,
   projectId: projectId || '',
   dataset: dataset || '',
   title,
   // theme,
   schema: {
      // If you want more content types, you can add them to this array
      types: [
         // Singletons
         home,
         settings,
         // Documents
         duration,
         page,
         project,
         // Objects
         milestone,
         timeline,

         //
         posts,
         img,
         audio,
         video,
         quote,
         team,
         category,
         media,
         library,
         headingBlock,
         contentBlock,
         teamBlock,
         model,
      ],
   },
   form: {
      components: {
         item: CustomItem,
         field: CustomField,
      },
   },
   plugins: [
      deskTool({
         structure: pageStructure([home, settings]),
      }),
      presentationTool({
         locate,
         previewUrl: {
            origin: typeof location === 'undefined' ? 'http://localhost:3000' : location.origin,
            draftMode: {
               enable: '/api/draft',
            },
         },
      }),
      // Configures the global "new document" button, and document actions, to suit the Settings document singleton
      singletonPlugin([home.name, settings.name]),
      // Add an image asset source for Unsplash

      // Vision lets you query your content with GROQ in the studio
      // https://www.sanity.io/docs/the-vision-plugin
      visionTool({ defaultApiVersion: apiVersion }),
   ],
});
