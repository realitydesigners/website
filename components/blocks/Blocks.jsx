'use client';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import HeadingBlockDark from '@/components/blog/HeadingBlockDark';
import HeadingBlockLight from '@/components/blog/HeadingBlockLight';
import TeamBlock from '@/components/blog/TeamBlock';
import InternalLink from '@/components/blocks/InternalLink';

import { jura, staatliches } from '@/fonts';

import { ArticleRefBlock, AudioRefBlock, ImageRefBlock, PostsRefBlock, QuoteRefBlock, SplineRefBlock, VideoRefBlock } from './index';

const iFrame = ({ value }) => {
   const { url, width, height } = value;

   return (
      <div className="iframe-container">
         <iframe title="iframe" src={url} width={width} height={height} allowFullScreen />
      </div>
   );
};

const Dark = {
   block: {
      normal: ({ children }) => (
         <div className="w-full flex justify-center ">
            <div className={`${jura.className} w-11/12 font-bold text-gray-200 leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-6 `}>{children}</div>
         </div>
      ),
      h1: ({ children }) => (
         <div className="w-full flex justify-center">
            <h1 className={`${staatliches.className} mb-6 w-10/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}>{children}</h1>
         </div>
      ),

      h2: ({ children }) => (
         <div className="w-full  flex justify-center">
            <h2 className={`${staatliches.className} mb-6 w-11/12 text-gray-200 text-4xl font-bold uppercase  leading-none tracking-wide md:w-3/4   lg:w-1/2  lg:text-5xl`}>{children}</h2>
         </div>
      ),
      h3: ({ children }) => (
         <div className="w-full flex justify-center">
            <h2 className={`${staatliches.className} mb-6  w-11/12 text-4xl text-gray-200  font-bold  leading-none tracking-wide md:w-3/4   lg:w-1/2 lg:text-5xl`}>{children}</h2>
         </div>
      ),
   },
   list: {
      bullet: ({ children }) => (
         <div className="w-screen flex justify-center">
            <ul className={`${jura.className} w-11/12  text-black leading-7  text-lg md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`}>{children}</ul>
         </div>
      ),
      number: ({ children }) => (
         <div className="w-screen flex justify-center">
            <ol className={`${jura.className} w-11/12 text-black leading-7 text-2xl md:w-3/4 lg:w-1/2 lg:text-2xl list-decimal list-inside space-y-6 mb-6`}>{children}</ol>
         </div>
      ),
   },

   marks: {
      internalLink: ({ value, children }) => {
         const { slug = {} } = value;
         return <InternalLink slug={slug?.current}>{children}</InternalLink>;
      },
   },
   types: {
      iframe: iFrame,
      postsRef: PostsRefBlock,
      articleRef: ArticleRefBlock,
      videoRef: VideoRefBlock,
      spline: SplineRefBlock,
      imageRef: ImageRefBlock,
      audioRef: AudioRefBlock,
      quoteRef: QuoteRefBlock,
   },
};

const Light = {
   block: {
      normal: ({ children }) => (
         <div className="w-full flex justify-center">
            <div className={`${jura.className} w-11/12 font-bold text-black leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-6`}>{children}</div>
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
            <ul className={`${jura.className} w-11/12  text-black leading-7 text-lg md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`}>{children}</ul>
         </div>
      ),
      number: ({ children }) => (
         <div className="w-screen flex justify-center">
            <ol className={`${jura.className} w-11/12 text-black leading-7 text-2xl md:w-3/4 lg:w-1/2 lg:text-2xl list-decimal list-inside space-y-6 mb-6`}>{children}</ol>
         </div>
      ),
   },

   marks: {
      internalLink: ({ value, children }) => {
         const { slug = {} } = value;
         return <InternalLink slug={slug?.current}>{children}</InternalLink>;
      },
   },

   types: {
      iframe: iFrame,
      postsRef: PostsRefBlock,
      articleRef: ArticleRefBlock,
      videoRef: VideoRefBlock,
      spline: SplineRefBlock,
      imageRef: ImageRefBlock,
      audioRef: AudioRefBlock,
      quoteRef: QuoteRefBlock,
   },
};

const Team = {
   block: {
      normal: ({ children }) => (
         <div className="w-full flex justify-center ">
            <div className={`${jura.className} w-11/12 font-bold text-gray-200 leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-6 `}>{children}</div>
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
            <ul className={`${jura.className} w-11/12  text-black leading-7  text-lg md:w-3/4 lg:w-1/2 lg:text-xl list-decimal list-inside space-y-6 mb-6`}>{children}</ul>
         </div>
      ),
      number: ({ children }) => (
         <div className="w-screen flex justify-center">
            <ol className={`${jura.className} w-11/12 text-black leading-7 text-2xl md:w-3/4 lg:w-1/2 lg:text-2xl list-decimal list-inside space-y-6 mb-6`}>{children}</ol>
         </div>
      ),
   },
   marks: {
      internalLink: ({ value, children }) => {
         const { slug = {} } = value;
         return <InternalLink slug={slug?.current}>{children}</InternalLink>;
      },
   },
};

const Video = {
   block: {
      normal: ({ children }) => (
         <div className="w-full flex justify-center ">
            <p className={`${jura.className} w-11/12 font-bold text-gray-400 leading-7 tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl mb-6 `}>{children}</p>
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

const ContentBlock = ({ layout, content, bio }) => {
   let template;
   let classes;

   switch (layout) {
      case 'dark':
         template = Dark;
         classes = 'bg-black w-full';
         break;
      case 'light':
         template = Light;
         classes = 'bg-gray-200 w-full';
         break;
      case 'video':
         template = Video;
         classes = 'w-full';
         break;
      case 'team':
         template = Team;
         classes = 'w-full';
         break;
      default:
         template = Dark;
         classes = 'bg-black w-full';
   }

   const textValue = content || bio || [];

   return (
      <div className={`h-auto lg:pt-24 ${classes}`}>
         <PortableText value={textValue} components={template} />
      </div>
   );
};

const HeadingBlock = ({ layout, block }) => {
   return layout === 'dark' ? <HeadingBlockDark block={block} /> : <HeadingBlockLight block={block} />;
};

const Blocks = ({ block }) => {
   const { _type, layout } = block;

   const renderBlock = () => {
      switch (_type) {
         case 'headingBlock':
            return <HeadingBlock layout={layout} block={block} />;
         case 'contentBlock':
            return <ContentBlock layout={layout} content={block.content} />;
         case 'teamBlock':
            return <TeamBlock layout block={block} />;

         default:
            return null;
      }
   };

   return <>{renderBlock()}</>;
};

Blocks.propTypes = {
   block: PropTypes.object.isRequired,
};

export default Blocks;
