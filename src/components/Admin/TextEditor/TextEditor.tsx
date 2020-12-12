import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

interface ITextEditorProps {
  editorContent: string;
  setEditorContent: (x: string) => void;
}
export default function TextEditor({
  editorContent,
  setEditorContent,
}: ITextEditorProps) {
  return (
    <SunEditor
      setContents={editorContent}
      onChange={setEditorContent}
      placeholder="Please type here..."
      autoFocus
    />
  );
}
