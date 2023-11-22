import { defineField, defineType } from 'sanity';

export default defineType({
   type: 'document',
   name: 'audio',
   title: 'Audio',
   fields: [
      {
         name: 'title',
         title: 'Title',
         type: 'string',
         description: 'Title of the audio track',
      },
      {
         name: 'description',
         title: 'Description',
         type: 'text',
         description: 'A short description of this audio file',
      },
      {
         name: 'audioFile',
         title: 'Audio File',
         type: 'file',
         description: 'Upload the audio file',
         options: { accept: 'audio/*' },
      },
      defineField({
         name: 'team',
         title: 'Team',
         type: 'reference',
         to: { type: 'team' },
      }),
   ],
   preview: {
      select: {
         title: 'title',
         media: 'audioFile',
      },
   },
});
