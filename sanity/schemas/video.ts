import { UploadIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
   type: 'document',
   name: 'video',
   icon: UploadIcon,
   title: 'Video',
   fields: [
      defineField({
         type: 'string',
         name: 'title',
         title: 'Title',
      }),
      defineField({
         name: 'slug',
         title: 'Slug',
         type: 'slug',
         options: {
            source: 'title',
         },
         validation: rule => rule.required(),
      }),
      defineField({
         name: 'url',
         type: 'url',
         title: 'Video URL',
      }),

      defineField({
         type: 'image',
         name: 'image',
         title: 'Image',
         fields: [
            {
               name: 'alt',
               title: 'Alt Text',
               type: 'string',
            },
         ],
         options: {
            hotspot: true,
         },
      }),
      defineField({
         name: 'video',
         title: 'Video',
         type: 'file',
         options: {
            accept: 'video/*',
         },
      }),

      defineField({
         name: 'alt',
         type: 'string',
         title: 'Alt text',
         description: 'Alternative text for screenreaders. Falls back on caption if not set',
      }),
      defineField({
         name: 'team',
         title: 'Team',
         type: 'reference',
         to: { type: 'team' },
      }),
      defineField({
         name: 'subcategories',
         title: 'Subcategories',
         type: 'array',
         of: [{ type: 'reference', to: { type: 'category' } }],
      }),
   ],
});
