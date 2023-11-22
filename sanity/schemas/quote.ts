import { UploadIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
   type: 'document',
   name: 'quote',
   title: 'Quote',
   icon: UploadIcon,
   fields: [
      defineField({
         type: 'text',
         name: 'quote',
         title: 'Quote',
         validation: rule => rule.required(),
      }),
      defineField({
         name: 'mediaRef',
         title: 'Image Reference',
         type: 'object',
         fields: [
            {
               name: 'image',
               type: 'reference',
               to: { type: 'img' },
            },
            {
               name: 'layout',
               type: 'string',
               title: 'Layout',
               options: {
                  list: [
                     { title: 'Full Width', value: 'Full Width' },
                     { title: 'Half Width', value: 'Half Width' },
                  ],
               },
            },
         ],
      }),
   ],

   preview: {
      select: {
         title: 'quote',
      },
      prepare({ title }) {
         return {
            subtitle: 'Page',
            title: title,
         };
      },
   },
});
