import AudioRefBlock from "../nested/AudioRefBlock";
import ImageRefBlock from "../nested/ImageRefBlock";
import InternalLink from "../nested/InternalLink";
import PostsRefBlock from "../nested/PostsRefBlock";
import QuoteRefBlock from "../nested/QuoteRefBlock";
import SplineRefBlock from "../nested/SplineRefBlock";
import VideoRefBlock from "../nested/VideoRefBlock";

import React from "react";

export type TemplateTheme = "dark" | "light" | "transparent";

const headingStyles: Record<TemplateTheme, string> = {
  dark: `font-russo my-3  w-full  text-gray-200 bg-clip-text text-3xl font-bold uppercase leading-none tracking-wide md:w-3/4 lg:w-1/2 lg:text-5xl`,
  light: `font-russo my-3 w-11/12 text-black text-4xl font-bold uppercase leading-none tracking-wide md:w-3/4 lg:w-1/2 lg:text-5xl`,
  transparent: ` font-russo my-3 w-11/12 text-gray-200 text-4xl font-bold uppercase leading-none tracking-wide md:w-3/4 lg:w-1/2 lg:text-5xl`,
};

const listStyles: Record<TemplateTheme, string> = {
  dark: ` font-outfit  w-full  text-gray-200 leading-8 md:w-3/4 lg:w-1/2 text-xl list-decimal list-inside space-y-6 mb-6`,
  light: ` font-outfit  w-11/12 text-black leading-7 md:w-3/4 text-xl lg:w-1/2  list-decimal list-inside space-y-6 mb-6`,
  transparent: ` font-outfit  w-11/12 text-gray-400 leading-7 md:w-3/4 text-xl lg:w-1/2  list-decimal list-inside space-y-6 mb-6`,
};

const normalTextStyles: Record<TemplateTheme, string> = {
  dark: ` font-outfit  w-full  text-gray-200  leading-[1.4em] tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl`,
  light: ` font-outfit  text-white leading-[1.5em] tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl`,
  transparent: ` font-outfit  text-gray-400 leading-[1.5em] tracking-wide text-xl md:w-3/4 lg:w-1/2 lg:text-xl`,
};

const Heading: React.FC<{
  level: number;
  children: React.ReactNode;
  theme: TemplateTheme;
}> = React.memo(({ level, children, theme }) => {
  const className = headingStyles[theme];
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <div className="flex w-full justify-center p-3">
      {React.createElement(Tag, { className }, children)}
    </div>
  );
});

const List: React.FC<{
  type: "bullet" | "number";
  children: React.ReactNode;
  theme: TemplateTheme;
}> = React.memo(({ type, children, theme }) => {
  const Tag = type === "bullet" ? "ul" : "ol";
  const className = listStyles[theme];
  return (
    <div className="flex w-full justify-center p-3">
      <Tag className={className}>{children}</Tag>
    </div>
  );
});

const NormalText: React.FC<{
  children: React.ReactNode;
  theme: TemplateTheme;
}> = React.memo(({ children, theme }) => {
  const className = normalTextStyles[theme];
  return (
    <div className="flex w-full justify-center p-3">
      <div className={className}>{children}</div>
    </div>
  );
});

const DarkTemplate = {
  block: {
    normal: (props) => <NormalText {...props} theme="dark" />,
    h1: (props) => <Heading level={1} {...props} theme="dark" />,
    h2: (props) => <Heading level={2} {...props} theme="dark" />,
    h3: (props) => <Heading level={3} {...props} theme="dark" />,
  },
  list: {
    bullet: (props) => <List type="bullet" {...props} theme="dark" />,
    number: (props) => <List type="number" {...props} theme="dark" />,
  },
  marks: {
    internalLink: ({ value, children }) => {
      const { slug = {}, theme } = value;
      return (
        <InternalLink slug={slug?.current} theme={theme}>
          {children}
        </InternalLink>
      );
    },
  },
  types: {
    postsRef: ({ value }) => {
      const { postsHeading, postsSlug, postsImage } = value.postsRef;

      return (
        <PostsRefBlock
          slug={postsSlug}
          heading={postsHeading}
          image={postsImage}
        />
      );
    },
    videoRef: ({ value }) => {
      const { videoTitle, videoUrl, className } = value.videoRef;
      return (
        <VideoRefBlock
          videoTitle={videoTitle}
          videoUrl={videoUrl}
          className={className}
        />
      );
    },
    spline: ({ value }) => {
      const { url } = value;
      return <SplineRefBlock url={url} />;
    },

    imageRef: ({ value }) => {
      const { image, className } = value;
      return <ImageRefBlock image={image} className={className} />;
    },
    audioRef: ({ value }) => {
      const { audioTitle, audioFileUrl } = value.audioRefData || {};

      return (
        <AudioRefBlock audioFileUrl={audioFileUrl} audioTitle={audioTitle} />
      );
    },
    quoteRef: ({ value }) => {
      const { quoteTitle, quoteImage, className } = value.quoteRef || {};

      return (
        <QuoteRefBlock
          quote={quoteTitle}
          image={quoteImage}
          className={className}
        />
      );
    },
  },
};

const LightTemplate = {
  block: {
    normal: (props) => <NormalText {...props} theme="light" />,
    h1: (props) => <Heading level={1} {...props} theme="light" />,
    h2: (props) => <Heading level={2} {...props} theme="light" />,
    h3: (props) => <Heading level={3} {...props} theme="light" />,
  },
  list: {
    bullet: (props) => <List type="bullet" {...props} theme="light" />,
    number: (props) => <List type="number" {...props} theme="light" />,
  },
  marks: {
    internalLink: ({ value, children }) => {
      const { slug = {}, theme } = value;
      return (
        <InternalLink slug={slug?.current} theme={theme}>
          {children}
        </InternalLink>
      );
    },
  },
  types: {
    postsRef: ({ value }) => {
      const { postsHeading, postsSlug, postsImage } = value.postsRef;
      return (
        <PostsRefBlock
          slug={postsSlug}
          heading={postsHeading}
          image={postsImage}
        />
      );
    },
    videoRef: ({ value }) => {
      const { videoTitle, videoUrl, className } = value.videoRef;

      return (
        <VideoRefBlock
          videoTitle={videoTitle}
          videoUrl={videoUrl}
          className={className}
        />
      );
    },
    spline: ({ value }) => {
      const { url } = value;
      return <SplineRefBlock url={url} />;
    },
    imageRef: ({ value }) => {
      const { image, className } = value;
      return <ImageRefBlock image={image} className={className} />;
    },
    audioRef: ({ value }) => {
      return <AudioRefBlock {...(value.audioRefData || {})} />;
    },
    quoteRef: ({ value }) => {
      const { quoteTitle, quoteImage, className } = value.quoteRef || {};

      return (
        <QuoteRefBlock
          quote={quoteTitle}
          image={quoteImage}
          className={className}
        />
      );
    },
  },
};
const TransparentTemplate = {
  block: {
    normal: (props) => <NormalText {...props} theme="transparent" />,
    h1: (props) => <Heading level={1} {...props} theme="transparent" />,
    h2: (props) => <Heading level={2} {...props} theme="transparent" />,
    h3: (props) => <Heading level={3} {...props} theme="transparent" />,
  },
  list: {
    bullet: (props) => <List type="bullet" {...props} theme="transparent" />,
    number: (props) => <List type="number" {...props} theme="transparent" />,
  },
  marks: {
    internalLink: ({ value, children }) => {
      const { slug = {}, theme } = value;
      return (
        <InternalLink slug={slug?.current} theme={theme}>
          {children}
        </InternalLink>
      );
    },
  },
  types: {
    postsRef: ({ value }) => {
      const { postsHeading, postsSlug, postsImage } = value.postsRef;
      return (
        <PostsRefBlock
          slug={postsSlug}
          heading={postsHeading}
          image={postsImage}
        />
      );
    },
    videoRef: ({ value }) => {
      const { videoTitle, videoUrl, className } = value.videoRef;

      return (
        <VideoRefBlock
          videoTitle={videoTitle}
          videoUrl={videoUrl}
          className={className}
        />
      );
    },
    spline: ({ value }) => {
      const { url } = value;
      return <SplineRefBlock url={url} />;
    },
    imageRef: ({ value }) => {
      const { image, className } = value;

      return <ImageRefBlock image={image} className={className} />;
    },
    audioRef: ({ value }) => {
      return <AudioRefBlock {...(value.audioRefData || {})} />;
    },
    quoteRef: ({ value }) => {
      const { quoteTitle, quoteImage, className } = value.quoteRef || {};

      return (
        <QuoteRefBlock
          quote={quoteTitle}
          image={quoteImage}
          className={className}
        />
      );
    },
  },
};

const VideoTemplate = {
  block: {
    normal: (props) => <NormalText {...props} theme="light" />,
    h1: (props) => <Heading level={1} {...props} theme="light" />,
    h2: (props) => <Heading level={2} {...props} theme="light" />,
    h3: (props) => <Heading level={3} {...props} theme="light" />,
  },
  list: {
    bullet: (props) => <List type="bullet" {...props} theme="light" />,
    number: (props) => <List type="number" {...props} theme="light" />,
  },
};

const TeamTemplate = {
  block: {
    normal: (props) => <NormalText {...props} theme="dark" />,
    h1: (props) => <Heading level={1} {...props} theme="dark" />,
    h2: (props) => <Heading level={2} {...props} theme="dark" />,
    h3: (props) => <Heading level={3} {...props} theme="dark" />,
  },
  list: {
    bullet: (props) => <List type="bullet" {...props} theme="dark" />,
    number: (props) => <List type="number" {...props} theme="dark" />,
  },
};

export {
  DarkTemplate,
  LightTemplate,
  TransparentTemplate,
  TeamTemplate,
  VideoTemplate,
};
