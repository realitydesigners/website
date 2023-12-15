import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { presentationTool } from 'sanity/presentation';
import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api';
import { locate } from '@/sanity/plugins/locate';
import CustomField from './sanity/ui/CustomField';
import CustomItem from '@/sanity/ui/CustomItem';
import { posts, team, category, media, img, quote, video, audio, model, library, headingBlock, contentBlock, teamBlock } from '@/sanity/schemas';

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Reality Designers';

export default defineConfig({
   basePath: studioUrl,
   projectId: projectId || '',
   dataset: dataset || '',
   title,

   schema: {
      types: [posts, img, audio, video, quote, team, category, media, library, headingBlock, contentBlock, teamBlock, model],
   },
   form: {
      components: {
         item: CustomItem,
         field: CustomField,
      },
   },
   plugins: [
      deskTool({}),
      presentationTool({
         locate,
         previewUrl: {
            origin: typeof location === 'undefined' ? 'http://localhost:3000' : location.origin,
            draftMode: {
               enable: '/api/draft',
            },
         },
      }),
      visionTool({ defaultApiVersion: apiVersion }),
   ],
});
