import { UploadIcon, BookIcon, PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
   type: 'document',
   name: 'img',
   icon: UploadIcon,
   title: 'Image',
   fields: [
      defineField({
         type: 'string',
         name: 'title',
         title: 'Title',
      }),
      defineField({
         name: 'image',
         title: 'Image',
         type: 'image',
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
   ],
});
