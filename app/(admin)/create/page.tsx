"use client";
import { MainContent } from "./components/MainContent";
import { TableView } from "./components/TableView";
import { Editor } from "./components/Editor";
import { useDocument } from "./context/DocumentContext";
import { useCallback } from "react";

export default function CreatePage() {
  const { selectedDoc, setSelectedType, selectedType, setHandleSubmit } = useDocument();

  const handleEditorMount = useCallback((handleSubmit: any) => {
    setHandleSubmit(handleSubmit);
  }, [setHandleSubmit]);

  return (
    <div className="flex-1">
      {selectedDoc ? (
        <Editor selectedDoc={selectedDoc} onMount={handleEditorMount} />
      ) : selectedType ? (
        <TableView type={selectedType} />
      ) : (
        <MainContent onTypeSelect={setSelectedType} />
      )}
    </div>
  );
}
