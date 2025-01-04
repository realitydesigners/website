"use client";

import { useState, createContext, useContext } from "react";
import { Sidebar } from "./components/Sidebar";

// Create a context to share the selected document
export const DocumentContext = createContext<{
  selectedDoc: any;
  setSelectedDoc: (doc: any) => void;
}>({
  selectedDoc: null,
  setSelectedDoc: () => {},
});

export const useDocument = () => useContext(DocumentContext);

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  return (
    <DocumentContext.Provider value={{ selectedDoc, setSelectedDoc }}>
      <div className="flex h-screen bg-black">
        <Sidebar onDocumentSelect={setSelectedDoc} />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </DocumentContext.Provider>
  );
}
