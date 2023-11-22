// schemas/media.js
import { defineField, defineType } from 'sanity';

export default defineType({
   type: 'document',
   name: 'media',
   title: 'Media',
   fields: [
      defineField({
         type: 'string',
         name: 'title',
         title: 'Title',
         validation: rule => rule.required(),
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
         name: 'type',
         title: 'Type',
         type: 'string',
         options: {
            list: [
               { title: 'Image', value: 'image' },
               { title: 'Video', value: 'video' },
               // Add more types if needed
            ],
         },
         validation: rule => rule.required(),
      }),
      defineField({
         name: 'image',
         title: 'Image',
         type: 'image',
         hidden: ({ parent }) => parent?.type !== 'image', // Hide the field if type is not 'image'
      }),
      defineField({
         name: 'video',
         title: 'Video URL',
         type: 'url',
         hidden: ({ parent }) => parent?.type !== 'video', // Hide the field if type is not 'video'
      }),
      defineField({
         name: 'alt',
         type: 'string',
         title: 'Alt text',
         description: 'Alternative text for screenreaders. Falls back on caption if not set',
      }),
      {
         name: 'className',
         title: 'CSS Class',
         type: 'string',
         options: {
            list: [
               { title: 'img-dark', value: 'img-dark' },
               { title: 'img-light', value: 'img-light' },
               // Add more class options if needed
            ],
         },
      },
      defineField({
         name: 'team',
         title: 'Team',
         type: 'reference',
         to: { type: 'team' },
      }),
      defineField({
         name: 'posts',
         title: 'Posts',
         type: 'array',
         of: [
            {
               type: 'reference',
               to: [{ type: 'posts' }],
            },
         ],
      }),
   ],
});
