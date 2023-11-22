import { CheckmarkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
   name: 'category',
   title: 'Category',
   icon: CheckmarkIcon,
   type: 'document',
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
         type: 'reference',
         name: 'model',
         title: '3D Model',
         to: { type: 'model' },
      }),
      defineField({
         name: 'subcategories',
         title: 'Subcategories',
         type: 'array',
         of: [{ type: 'reference', to: { type: 'category' } }],
      }),
      defineField({
         type: 'string',
         name: 'sceneIdentifier',
         title: 'Scene Identifier',
         description: 'Identifier for the 3D background scene associated with this category.',
      }),

      defineField({
         type: 'boolean',
         name: 'isMain',
         title: 'Is Main Category?',
         description: 'Check this if the category is a main category.',
      }),
   ],
});
