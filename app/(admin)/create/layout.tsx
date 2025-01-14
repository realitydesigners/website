"use client";

import React from "react";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import DocumentContext, { useDocument } from "./context/DocumentContext";
import { 
  RiCloseLine, 
  RiDraftLine, 
  RiSendPlaneLine, 
  RiFileTextLine,
  RiImageLine,
  RiMusicLine,
  RiVideoLine,
  RiChatQuoteLine,
  RiTeamLine,
  RiFolderLine,
  RiBookLine,
  RiGamepadLine,
  RiBookmarkLine
} from "react-icons/ri";

const contentTypes = {
  posts: { title: "Post", icon: RiFileTextLine },
  img: { title: "Image", icon: RiImageLine },
  audio: { title: "Audio", icon: RiMusicLine },
  video: { title: "Video", icon: RiVideoLine },
  quote: { title: "Quote", icon: RiChatQuoteLine },
  team: { title: "Team", icon: RiTeamLine },
  category: { title: "Category", icon: RiFolderLine },
  library: { title: "Library", icon: RiBookLine },
  model: { title: "Model", icon: RiGamepadLine },
  glossary: { title: "Glossary", icon: RiBookmarkLine },
};

const gradients = {
  posts: "from-purple-500/20 to-blue-500/20",
  img: "from-blue-500/20 to-cyan-500/20",
  audio: "from-green-500/20 to-emerald-500/20",
  video: "from-red-500/20 to-orange-500/20",
  quote: "from-yellow-500/20 to-amber-500/20",
  team: "from-pink-500/20 to-rose-500/20",
  category: "from-violet-500/20 to-purple-500/20",
  library: "from-indigo-500/20 to-blue-500/20",
  model: "from-cyan-500/20 to-teal-500/20",
  glossary: "from-teal-500/20 to-green-500/20",
};

const EditorHeader = ({ 
  selectedDoc, 
  handleCancel, 
  handleSubmit, 
  setSelectedDoc 
}: { 
  selectedDoc: any;
  handleCancel: () => void;
  handleSubmit: (e?: React.FormEvent, shouldPublish?: boolean) => Promise<void>;
  setSelectedDoc: (doc: any) => void;
}) => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
    <div className="flex items-center justify-between px-6 py-2">
      {/* Logo Section */}
      <div className="flex justify-center items-center gap-2">
        <div className="flex items-center space-x-2">
          <svg
            width="35"
            height="35"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.1279 70.8731L33.5967 55.3087M43.4729 23.3416L10.6978 28.9689L33.5967 55.3087M43.4729 23.3416L33.5967 55.3087M43.4729 23.3416L68.3831 51.4708L33.5967 55.3087M43.4729 23.3416L30.6805 9.58502"
              stroke="#fff"
              strokeWidth="6"
            />
          </svg>
        </div>
        <div className="flex text-gray-200 font-russo h-auto w-full flex-col items-center justify-center">
          <span className="text-[1rem] leading-none tracking-wide">
            REALITY
          </span>
          <span className="text-[.75rem] leading-none tracking-wide">
            DESIGNERS
          </span>
        </div>
        <span className="text-gray-200/50 text-[10px] ml-2 tracking-widest font-mono">
          LAB
        </span>
      </div>

      {/* Document Title Section */}
      {selectedDoc && (
        <div className="flex items-center space-x-2">
          {selectedDoc?._type &&
            contentTypes[selectedDoc._type as keyof typeof contentTypes] && (
              <div
                className={`p-1 rounded-md bg-gradient-to-br ${gradients[selectedDoc._type as keyof typeof gradients]} backdrop-blur-sm`}
              >
                {React.createElement(
                  contentTypes[selectedDoc._type as keyof typeof contentTypes].icon,
                  {
                    size: 16,
                    className: "text-white",
                  }
                )}
              </div>
            )}
          <div>
            <h1 className="text-sm font-medium text-white">
              {selectedDoc?._type &&
              contentTypes[selectedDoc._type as keyof typeof contentTypes]
                ? `Create ${contentTypes[selectedDoc._type as keyof typeof contentTypes].title}`
                : "Create New Post"}
            </h1>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {selectedDoc && handleSubmit && (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCancel}
            className="p-1.5 rounded-md bg-black/40 hover:bg-black/60 text-white/70 hover:text-white/90 
              transition-all duration-300"
          >
            <RiCloseLine size={16} />
          </button>
          <button
            onClick={(e) => handleSubmit(e, false)}
            className="px-3 py-1.5 rounded-md bg-gradient-to-br from-blue-600/50 to-indigo-600/50 
              hover:from-blue-600/60 hover:to-indigo-600/60 text-white border border-white/5 
              hover:border-white/10 transition-all duration-300 flex items-center space-x-1.5"
          >
            <RiDraftLine size={14} />
            <span className="text-xs">Save Draft</span>
          </button>
          <button
            onClick={(e) => handleSubmit(e, true)}
            className="px-3 py-1.5 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 
              hover:from-blue-700 hover:to-indigo-700 text-white border border-white/10 
              hover:border-white/20 transition-all duration-300 flex items-center space-x-1.5"
          >
            <RiSendPlaneLine size={14} />
            <span className="text-xs">Publish</span>
          </button>
        </div>
      )}
    </div>
  </div>
);

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [submitHandler, setSubmitHandler] = useState<((e?: React.FormEvent, shouldPublish?: boolean) => Promise<void>) | null>(null);

  const handleCancel = () => {
    setSelectedDoc(null);
  };

  return (
    <DocumentContext.Provider
      value={{ 
        selectedDoc, 
        setSelectedDoc, 
        selectedType, 
        setSelectedType,
        handleSubmit: submitHandler,
        setHandleSubmit: setSubmitHandler
      }}
    >
      <EditorHeader 
        selectedDoc={selectedDoc}
        handleCancel={handleCancel}
        handleSubmit={submitHandler || (async () => {})}
        setSelectedDoc={setSelectedDoc}
      />
      <div className="flex h-screen pt-14 bg-black">
          <Sidebar
            onDocumentSelect={setSelectedDoc}
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </DocumentContext.Provider>
  );
}