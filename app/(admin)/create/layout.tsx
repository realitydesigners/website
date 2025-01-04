"use client";

import { useState, createContext, useContext } from "react";
import { Sidebar } from "./components/Sidebar";

// Create a context to share the selected document and type
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

  return (
    <DocumentContext.Provider
      value={{ selectedDoc, setSelectedDoc, selectedType, setSelectedType }}
    >
      <div className="flex h-screen bg-black">
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
