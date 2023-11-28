import React from 'react';

const PostCard = ({ title, author, excerpt, publicationDate }) => {
   return (
      <div className="mb-2 max-w-full rounded border border-gray-200/20 bg-black bg-opacity-50 p-4 font-mono text-gray-300 shadow-md transition duration-300 ease-in-out hover:bg-opacity-70">
         {publicationDate && <p className="mb-3 text-xs tracking-wide text-gray-600">{publicationDate}</p>}
         <h3 className="text-md mb-8 font-mono font-bold uppercase leading-none text-gray-200  hover:text-gray-400">{title}</h3>
         {author && <p className="mb-3 font-mono text-sm font-medium tracking-wide text-gray-400">By: {author}</p>}
         <button className="flex items-center font-mono text-xs text-gray-400 transition-colors duration-200 hover:text-gray-200">Read More</button>
      </div>
   );
};

export const Sidebar = ({ content, isVisible }) => {
   return (
      <aside className={`sidebar fixed top-0 left-0 z-10 h-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <div className="absolute top-0 left-0 h-full w-48 overflow-y-auto border-r border-gray-200/20 bg-black bg-opacity-70 shadow-lg">
            <h2 className="text-md pl-8 pt-20 font-mono font-normal tracking-wide text-gray-400">Related Articles</h2>
            {/* Map through content and render PostCard for each item */}
            {content.map(contentItem => (
               <PostCard
                  key={contentItem._id} // Use _id for key if it's unique
                  title={contentItem.title}
                  author={contentItem.author}
                  excerpt={contentItem.excerpt}
                  publicationDate={contentItem.publicationDate}
               />
            ))}
         </div>
      </aside>
   );
};

export default Sidebar;
