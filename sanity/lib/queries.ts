import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`;

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`;

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`;

export const postsQuery = groq`
 *[_type == "posts"] |  order(_createdAt desc)[0..8] {
   title,
   category,
   excerpt,
   tags,
   slug,
   image,

   subcategories[]->{
     ...,
     name,
     title,
   },
   
   publicationDate,
   block[]{
     ...,
     heading,
     subHeading,
     image,
     tags,
     layout,
     title,
     publicationDate,
    
 },
   
 }`;

export const postssBySlugQuery = groq`
 *[_type == "posts" && slug.current == $slug][0] {
   title,
   category,
   excerpt,
   tags,
   slug,
   image,

   subcategories[]->{
     ...,
     name,
     title,
   },
   
   publicationDate,
   block[]{
     ...,
     heading,
     subHeading,
     image,
     tags,
     layout,
     title,
     publicationDate,
    
 },
   
 }`;

export const postsBySlugQuery = groq`
*[_type == "posts" && slug.current == $slug][0] {
     title,
     slug,
     excerpt,
     image,
     block[]{
       ...,
       heading,
       subHeading,
       image,
       tags,
       layout,
       title,
       publicationDate,
        team->{
       ...,
       name,
       role,
       image,
       shortBio,
     },
     
         content[]{
       ...,
       
       media-> {
         ...,
         className->{name},
         team->,
       },
       image->{
         ...,
         className->{name},
         team->,
       },
       "videoRefData": {
         "videoTitle": video->title,
         "videoFileUrl": video->video.asset->url,
         "videoImage": video->image,
         "videoTeam": video->team,
         team->,
       },

       "audioRefData": {
         "audioTitle": audio->title,
         "audioFileUrl": audio->audioFile.asset->url
       },
       quote->{
         ...,
         quote,
         "mediaRef": {
           "layout": mediaRef.layout,
           "image": mediaRef.image->image.asset->url
         }
       },
       markDefs[]{
         ...,
         _type == "internalLink" => {
           "slug": @.reference->slug
         }
       },
       "postsRef": {
         "postsTitle": posts->title,
         "postsSlug": posts->slug.current,
         "postsImage": posts->image,
         "postsExcerpt": posts->excerpt,
         ...,
       },
     },
   },
  
   }
 `;

export const categoryQuery = groq`
*[_type == "category"] {
   _id,
   _type,
   title,
   isMain,
   slug,
   model->{...,
     file,
      },
   sceneIdentifier,
   "subCategories": *[_type == "category" && references(^._id)] {
     _id,
     _type,
     title,
     slug,
     isMain,
     model->{...,
       file,
        },
     "refPosts": *[_type == "posts" && references(^._id)] {
       _id,
       title,
       slug,
       excerpt,
       author,
       tags,
       category,
       publicationDate,
       lightLayout,
       darkLayout,
     }
   },
  }
  `;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
   _id,
   _type,
   title,
   isMain,
   slug,
   model->{...,
     file,
      },
   sceneIdentifier,
   "subCategories": *[_type == "category" && references(^._id)] {
     _id,
     _type,
     title,
     slug,
     isMain,
     model->{...,
       file,
        },
     "refPosts": *[_type == "posts" && references(^._id)] {
       _id,
       title,
       slug,
       excerpt,
       author,
       tags,
       category,
       publicationDate,
       lightLayout,
       darkLayout,
     }
   },
  }
  `;

export const getVideosQuery = groq`
*[_type == "video"] |  order(_createdAt desc) {
 title,
 slug,
 url,
 image,
 video,
 subcategories[]->{
   ...,
   name,
   title,
 },
 
 }`;

export const getVideoBySlugQuery = groq`
*[_type == "video" && slug.current == $slug][0] {
   title,
   slug,
   url,
   image,
   video,
   subcategories[]->{
     ...,
     name,
     title,
   },
   "videoRefData": {
     "videoTitle": video->title,
     "videoFileUrl": video->video.asset->url,
     "videoImage": video->image,
     "videoTeam": video->team,
     team->,
   },
   
   }`;
