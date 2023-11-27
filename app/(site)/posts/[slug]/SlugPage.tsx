import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc';

import type { PostsPayload } from '@/types';

import React from 'react';
import HeadingBlockLight from '@/components/blog/HeadingBlockLight';
import HeadingBlockDark from '@/components/blog/HeadingBlockDark';

export interface PageProps {
   data: PostsPayload | null;
   encodeDataAttribute?: EncodeDataAttributeCallback;
}

const Page: React.FC<PageProps> = ({ data, encodeDataAttribute }) => {
   const { title, block } = data ?? {};

   return (
      <main>
         {/* HEADING BLOCK */}
         {block?.map((block, index) => {
            if (block._type === 'headingBlock') {
               return block.layout === 'dark' ? <HeadingBlockDark key={index} block={block} /> : <HeadingBlockLight key={index} block={block} />;
            }
            return null;
         })}

         {/* CONTENT BLOCK */}
      </main>
   );
};

export default Page;
