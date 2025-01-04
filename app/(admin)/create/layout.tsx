"use client";

import { useState, createContext, useContext } from "react";
import { Sidebar } from "./components/Sidebar";

export const DocumentContext = createContext<{
  selectedDoc: any;
  setSelectedDoc: (doc: any) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}>({
  selectedDoc: null,
  setSelectedDoc: () => {},
  selectedType: "posts",
  setSelectedType: () => {},
});

export const useDocument = () => useContext(DocumentContext);

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<string>("posts");

  const Logo = () => (
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
  );

  return (
    <DocumentContext.Provider
      value={{ selectedDoc, setSelectedDoc, selectedType, setSelectedType }}
    >
      <div className="fixed top-0 left-0 right-0 h-14 bg-black border-b border-white/10 z-50 flex items-center px-6">
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
          <div className="flex  text-gray-200 font-russo h-auto w-full flex-col items-center justify-center">
            <span className="text-[1rem] leading-none tracking-wide">
              REALITY
            </span>
            <span className="text-[.75rem] leading-none tracking-wide">
              DESIGNERS
            </span>
          </div>
          <span className="text-gray-200/50 text-xs ml-4 font-mono">LAB</span>
        </div>
      </div>
      <div className="flex h-screen pt-14 bg-black">
        <div className="">
          <Sidebar
            onDocumentSelect={setSelectedDoc}
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </DocumentContext.Provider>
  );
}
