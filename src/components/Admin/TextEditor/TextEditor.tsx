import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import mergeTag from "./merge-plugin";

interface ITextEditorProps {
  editorContent: string;
  setEditorContent: (x: string) => void;
}

export default function TextEditor({
  editorContent,
  setEditorContent,
}: ITextEditorProps) {
  return (
    <div style={{ zIndex: 0 }}>
      <SunEditor
        setOptions={{
          height: 200,
          customPlugins: [mergeTag],
          buttonList: [...buttonList.complex, ["merge_tag"]], // Or Array of button list, eg. [['font', 'align'], ['image']]
        }}
        setContents={editorContent}
        onChange={setEditorContent}
        placeholder="Please type here..."
        autoFocus
        height="500"
      />
    </div>
  );
}
