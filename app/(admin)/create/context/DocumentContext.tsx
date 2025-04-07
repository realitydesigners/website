"use client";
import React, { createContext, useContext } from "react";

type SubmitFunction = (e?: React.FormEvent, shouldPublish?: boolean) => Promise<void>;

interface DocumentContextType {
  selectedDoc: any;
  setSelectedDoc: (doc: any) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  handleSubmit: SubmitFunction | undefined;
  setHandleSubmit: (fn: SubmitFunction | undefined) => void;
}

const DocumentContext = createContext<DocumentContextType>({
  selectedDoc: null,
  setSelectedDoc: () => {},
  selectedType: null,
  setSelectedType: () => {},
  handleSubmit: undefined,
  setHandleSubmit: () => {},
});

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
};

export default DocumentContext;
