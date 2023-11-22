import { UploadIcon } from '@sanity/icons';
import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
   name: 'article',
   title: 'Article',
   icon: UploadIcon,
   type: 'document',
   fields: [
      defineField({
         name: 'title',
         title: 'Title',
         type: 'string',
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
         name: 'image',
         title: 'Image',
         type: 'image',
      }),
      defineField({
         type: 'text',
         name: 'excerpt',
         title: 'Excerpt',
         validation: rule => rule.required(),
      }),

      defineField({
         name: 'content',
         title: 'Content',
         type: 'array',
         of: [
            defineArrayMember({
               name: 'postsRef',
               title: 'Posts Reference',
               type: 'object',
               fields: [
                  {
                     name: 'post',
                     type: 'reference',
                     to: { type: 'posts' },
                  },
                  {
                     name: 'layout',
                     type: 'string',
                     title: 'Layout',
                     options: {
                        list: [
                           { title: 'Dark', value: 'Dark' },
                           { title: 'Light', value: 'Light' },
                        ],
                     },
                  },
               ],
               preview: {
                  select: {
                     title: 'post.title',
                     layout: 'layout',
                     imageUrl: 'post.image.asset.url',
                  },
                  prepare(selection) {
                     const { title, layout } = selection;
                     return {
                        title: title,
                        subtitle: layout ? `Type: Post | Layout: ${layout}` : 'Type: Post',
                        imageUrl: selection.imageUrl,
                     };
                  },
               },
            }),
            defineArrayMember({
               name: 'mediaRef',
               title: 'Image Reference',
               type: 'object',
               fields: [
                  {
                     name: 'img',
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
               preview: {
                  select: {
                     title: 'img.title',
                     layout: 'layout',
                     imageUrl: 'img.image.asset.url',
                  },
                  prepare(selection) {
                     const { title, layout } = selection;
                     return {
                        title: title,
                        subtitle: layout ? `Type: Image | Layout: ${layout}` : 'Type: Post',
                        imageUrl: selection.imageUrl,
                     };
                  },
               },
            }),
         ],
      }),
   ],
});
