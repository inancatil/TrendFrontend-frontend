import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

import CodeMirror from "codemirror";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neo.css";

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
          buttonList: buttonList.complex, // Or Array of button list, eg. [['font', 'align'], ['image']]
          codeMirror: {
            src: CodeMirror,
          },
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
