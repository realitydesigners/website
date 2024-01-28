import { groq } from "next-sanity";

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

export const feedQuery = groq`
*[(_type == "posts" || _type == "video" || _type =="img")] | order(_createdAt desc) {
  _type,
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
  title,
  slug,
  excerpt,
  image,
  block[]{
    ...,
    heading,
    subheading,
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
  },
}

`;

export const postsQuery = groq`
 *[_type == "posts"] | order(_createdAt desc)[0..40] {
    slug,
    subcategories[]->{
     ...,
     name,
     title,
     },
     block[]{
       ...,
       heading,
       subheading,
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
    },
     
   
 }`;

export const postsBySlugQuery = groq`

*[_type == "posts" && slug.current == $slug][0] {
    slug,
    block[] {
        ...,
        heading,
        subheading,
        image,
        tags,
        layout,
        publicationDate,
        team->,

        _type == "imageCanvasBlock" => {
            layout,
            image->,
            team->, 
            alt,
            
        },

        content[] {
            ...,
            image-> {
                ...,
                className->{name},
                team->,
            },

            markDefs[] {
                ...,
                _type == "internalLink" => {
                    "slug": @.reference->slug
                }
            },

            "videoRef": {
              ...,
                "videoTitle": video->title,
                "videoFileUrl": video->video.asset->url,
                "videoImage": video->image.asset->url,
                "videoTeam": video->team,
            },
            
            "audioRefData": {
                "audioTitle": audio->title,
                "audioFileUrl": audio->audioFile.asset->url
            },
            
            "quoteRef": {
                "quoteTitle": quote->quote,
                "quoteAuthor": quote->author,
                "quoteImage": quote->mediaRef.image->image,
                "quoteLayout": quote->mediaRef.layout,

            },

            "postsRef": {
                "postsHeading": posts->block[0].heading,
                "postsSlug": posts->slug.current,
                "postsImage": posts->block[0].image,
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
     
       block[]{
        ...,
        heading,
        subheading,
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
    },
     }
   },
  }
  `;

export const getVideosQuery = groq`
*[_type == "video"][0..30] |  order(_createdAt desc) {
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
      },
    },
   
   }`;

export const teamQuery = groq`
 *[_type == "team"] |  order(_createdAt asc) {
 name,
 role,
 image,
 scene,
 shortBio,
 bio[]{
  ...,
 },
 content[]{
  ...,
 }
 slug,
 title,    
}`;

export const teamBySlugQuery = groq`
*[_type == "team" && slug.current == $slug][0] {
 name,
 role,
 image,
 scene,
 shortBio,
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
    },
  },
 slug,
 title,    
 instagram,
 twitter,
 website,
 tiktok,
}`;

export const glossaryQuery = groq`
 *[_type == "glossary"] |  order(_createdAt asc) {
 name,
 role,
 image,
 scene,
 shortBio,
 bio[]{
  ...,
 },
 content[]{
  ...,
 }
 slug,
 title,    
}`;

export const glossaryBySlugQuery = groq`
*[_type == "glossary" && slug.current == $slug][0] {
 name,
 image,
 scene,
 block[]{
  ...,
  heading,
  subHeading,
  image,
  tags,
  layout,
  title,
 
    content[]{
  ...,
    },
  },
 slug,
 title,    
 instagram,
 twitter,
 website,
 tiktok,
}`;
