import { UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
   name: 'team',
   title: 'Team',
   icon: UserIcon,
   type: 'document',
   fields: [
      defineField({
         name: 'name',
         title: 'Name',
         type: 'string',
         validation: rule => rule.required(),
      }),
      defineField({
         name: 'slug',
         title: 'Slug',
         type: 'slug',
         options: {
            source: 'name',
         },
         validation: rule => rule.required(),
      }),

      defineField({
         name: 'role',
         title: 'Role',
         type: 'string',
      }),
      defineField({
         type: 'text',
         name: 'shortBio',
         title: 'Summary',
         validation: rule => rule.required(),
      }),

      defineField({
         name: 'image',
         title: 'Image',
         type: 'image',
         options: { hotspot: true },
         validation: rule => rule.required(),
      }),
      defineField({
         name: 'scene',
         title: 'Scene',
         type: 'url',
      }),
      defineField({
         type: 'array',
         name: 'bio',
         title: 'Bio',
         of: [{ type: 'block' }],
      }),
      defineField({
         name: 'instagram',
         title: 'Instagram',
         type: 'url',
         description: 'Instagram profile URL',
      }),
      defineField({
         name: 'twitter',
         title: 'Twitter',
         type: 'url',
         description: 'Twitter profile URL',
      }),
      defineField({
         name: 'website',
         title: 'Website',
         type: 'url',
         description: 'Personal or business website URL',
      }),
      defineField({
         name: 'tiktok',
         title: 'TikTok',
         type: 'url',
         description: 'TikTok profile URL',
      }),
   ],
});
