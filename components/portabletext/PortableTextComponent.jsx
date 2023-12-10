'use client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { jura, staatliches } from '@/fonts';

import { ArticleRef, AudioRef, ImageRef, MediaRefLight, PostsRefLight, QuoteRef, SplineRef, VideoRef } from './index';

const iFrame = ({ value }) => {
   const { url, width, height } = value;

   return (
      <div className="iframe-container">
         <iframe title="iframe" src={url} width={width} height={height} allowFullScreen></iframe>
      </div>
   );
};

const Dark = {
   block: {
      normal: ({ children }) => (
         <div className="w-screen flex justify-center ">
            <p className={`${jura.className} w-11/12 font-bold text-gray-200 leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-6 `}>{children}</p>
         </div>
      ),
      h1: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h1 className={`${staatliches.className} mb-6 w-10/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}>{children}</h1>
         </div>
      ),

      h2: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h2 className={`${staatliches.className} mb-6 w-11/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}>{children}</h2>
         </div>
      ),
      h3: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h2 className={`${staatliches.className} mb-6  w-11/12 text-4xl text-gray-200  font-bold  leading-none tracking-wide md:w-3/4   lg:w-1/2 lg:text-5xl`}>{children}</h2>
         </div>
      ),
   },
   list: {
      bullet: ({ children }) => (
         <div className="w-screen flex justify-center">
            <ul className={`${staatliches.className} w-11/12  text-black leading-6 tracking-wide text-lg md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`}>{children}</ul>
         </div>
      ),
      number: ({ children }) => (
         <div className="w-screen flex justify-center">
            <ol className={`${staatliches.className} w-11/12 text-black leading-8 tracking-wide text-2xl md:w-3/4 lg:w-1/2 lg:text-2xl list-decimal list-inside space-y-6 mb-6`}>{children}</ol>
         </div>
      ),
   },

   marks: {
      internalLink: ({ value, children }) => {
         const { slug = {} } = value;
         const href = `/posts/${slug?.current}`;

         return (
            <Link className="font-extrabold text-black underline " href={href}>
               {children}
            </Link>
         );
      },
   },
   types: {
      iframe: iFrame,
      postsRef: PostsRefLight,
      articleRef: ArticleRef,
      mediaRef: MediaRefLight,
      videoRef: VideoRef,
      spline: SplineRef,
      imageRef: ImageRef,
      audioRef: AudioRef,
      quoteRef: QuoteRef,
   },
};

const Light = {
   block: {
      normal: ({ children }) => (
         <div className="w-screen flex justify-center ">
            <p className={`${jura.className} w-11/12 font-bold text-black leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-6 `}>{children}</p>
         </div>
      ),
      h1: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h1 className={`${staatliches.className} mb-6 w-10/12 text-black text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}>{children}</h1>
         </div>
      ),

      h2: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h2 className={`${staatliches.className} mb-6 w-11/12 text-black text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}>{children}</h2>
         </div>
      ),
      h3: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h2 className={`${staatliches.className} mb-6  w-11/12 text-4xl font-bold  leading-none tracking-wide md:w-3/4   lg:w-1/2 lg:text-5xl`}>{children}</h2>
         </div>
      ),
   },
   list: {
      bullet: ({ children }) => (
         <div className="w-screen flex justify-center">
            <ul className={`${staatliches.className} w-11/12  text-black leading-6 tracking-wide text-lg md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`}>{children}</ul>
         </div>
      ),
      number: ({ children }) => (
         <div className="w-screen flex justify-center">
            <ol className={`${staatliches.className} w-11/12 text-black leading-8 tracking-wide text-2xl md:w-3/4 lg:w-1/2 lg:text-2xl list-decimal list-inside space-y-6 mb-6`}>{children}</ol>
         </div>
      ),
   },

   marks: {
      internalLink: ({ value, children }) => {
         const { slug = {} } = value;
         const href = `/posts/${slug?.current}`;

         return (
            <Link className="font-extrabold text-black underline " href={href}>
               {children}
            </Link>
         );
      },
   },
   types: {
      iframe: iFrame,
      postsRef: PostsRefLight,
      articleRef: ArticleRef,
      mediaRef: MediaRefLight,
      videoRef: VideoRef,
      spline: SplineRef,
      imageRef: ImageRef,
      audioRef: AudioRef,
      quoteRef: QuoteRef,
   },
};

const Team = {
   block: {
      normal: ({ children }) => (
         <div className="w-screen flex justify-center ">
            <p className={`${jura.className} w-11/12 font-bold text-gray-200 leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-6 `}>{children}</p>
         </div>
      ),
      h1: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h1 className={`${staatliches.className} mb-6 w-10/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}>{children}</h1>
         </div>
      ),

      h2: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h2 className={`${staatliches.className} mb-6 w-11/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}>{children}</h2>
         </div>
      ),
      h3: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h2 className={`${staatliches.className} mb-6  w-11/12 text-4xl text-gray-200  font-bold  leading-none tracking-wide md:w-3/4   lg:w-1/2 lg:text-5xl`}>{children}</h2>
         </div>
      ),
   },
   marks: {
      internalLink: ({ value, children }) => {
         const { slug = {} } = value;
         const href = `/blog/${slug?.current}`;

         return (
            <Link className="font-extrabold text-black underline " href={href}>
               {children}
            </Link>
         );
      },
   },
};

const Video = {
   block: {
      normal: ({ children }) => <p className={`${jura.className}  font-bold text-gray-400 leading-7 tracking-wide text-lg lg:text-xl mb-6 `}>{children}</p>,
      h1: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h1 className={`${staatliches.className} mb-6 w-10/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}>{children}</h1>
         </div>
      ),

      h2: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h2 className={`${staatliches.className} mb-6 w-11/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}>{children}</h2>
         </div>
      ),
      h3: ({ children }) => (
         <div className="w-screen flex justify-center">
            <h2 className={`${staatliches.className} mb-6  w-11/12 text-4xl text-gray-200  font-bold  leading-none tracking-wide md:w-3/4   lg:w-1/2 lg:text-5xl`}>{children}</h2>
         </div>
      ),
   },
   marks: {
      internalLink: ({ value, children }) => {
         const { slug = {} } = value;
         const href = `/blog/${slug?.current}`;

         return (
            <Link className="font-extrabold text-black underline " href={href}>
               {children}
            </Link>
         );
      },
   },
};

const PortableTextComponent = ({ content, template }) => {
   const [chosenComponents, setChosenComponents] = useState(null);

   if (!chosenComponents) {
      switch (template) {
         case 'dark':
            setChosenComponents(Dark);
            break;
         case 'light':
            setChosenComponents(Light);
            break;
         case 'team':
            setChosenComponents(Team);
            break;
         case 'video':
            setChosenComponents(Video);
            break;
         default:
            return null;
      }
   }

   return <PortableText value={content} className={`portableText ${template}`} components={chosenComponents} />;
};

PortableTextComponent.propTypes = {
   content: PropTypes.array.isRequired,
   template: PropTypes.string.isRequired,
};

export default PortableTextComponent;
