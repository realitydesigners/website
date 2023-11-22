import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
   type: 'document',
   name: 'posts',
   title: 'Posts',
   fields: [
      defineField({
         name: 'block',
         title: 'Content Block',
         type: 'array',
         of: [
            {
               type: 'headingBlock',
               title: 'Heading',
            },
            {
               type: 'contentBlock',
               title: 'Content',
            },
            {
               type: 'teamBlock',
               title: 'Team',
            },
         ],
      }),
      defineField({
         type: 'string',
         name: 'title',
         title: 'Title',

         validation: rule => rule.required(),
      }),
      defineField({
         type: 'slug',
         name: 'slug',
         title: 'Slug',
         options: {
            source: 'title',
         },
         validation: rule => rule.required(),
      }),

      defineField({
         type: 'text',
         name: 'excerpt',
         title: 'Excerpt',
         validation: rule => rule.required(),
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
         name: 'subcategories',
         title: 'Subcategories',
         type: 'array',
         of: [{ type: 'reference', to: { type: 'category' } }],
      }),
   ],
});
