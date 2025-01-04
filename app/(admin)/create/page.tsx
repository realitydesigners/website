"use client";

import { MainContent } from "./components/MainContent";
import { Editor } from "./components/Editor";
import { useDocument } from "./layout";

export default function CreatePage() {
  const { selectedDoc, setSelectedType } = useDocument();

  return (
    <>
      {!selectedDoc && <MainContent onTypeSelect={setSelectedType} />}
      {selectedDoc && <Editor />}
    </>
  );
}
