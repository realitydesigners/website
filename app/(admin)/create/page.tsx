"use client";
import { MainContent } from "./components/MainContent";
import { TableView } from "./components/TableView";
import { Editor } from "./components/Editor";
import { useDocument } from "./layout";

export default function CreatePage() {
  const { selectedDoc, setSelectedType, selectedType } = useDocument();

  return (
    <div className="flex-1">
      {selectedDoc ? (
        <Editor selectedDoc={selectedDoc} />
      ) : selectedType ? (
        <TableView type={selectedType} />
      ) : (
        <MainContent onTypeSelect={setSelectedType} />
      )}
    </div>
  );
}
