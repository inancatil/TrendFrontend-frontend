import React from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

import CodeMirror from "codemirror";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/neo.css";
import { plugin_submenu as iframeTag } from "./iframe-plugin";
import { prism_plugin as prismTag } from "./prism-plugin";

import {} from "suneditor/src/lang";

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
          buttonList: [
            ...buttonList.complex,
            ["textStyle", "blockquote"],
            ["custom_plugin_submenu"],
            ["custom_prism_plugin"],
          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
          codeMirror: {
            src: CodeMirror,
          },
          customPlugins: [iframeTag, prismTag],
          font: [
            "YuseiMagic-Regular",
            "Arial",
            "Comic Sans MS",
            "Courier New",
            "Impact",
            "Georgia",
            "tahoma",
            "Trebuchet MS",
            "Verdana",
          ],
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
