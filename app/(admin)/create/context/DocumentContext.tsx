"use client";

import { createContext, useContext } from "react";

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
