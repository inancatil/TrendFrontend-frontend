import { StringifyOptions } from "querystring";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SunEditor from "suneditor-react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-okaidia.css";

function process(str) {
  var div = document.createElement("div");
  div.innerHTML = str.trim();

  return format(div, 0).innerHTML;
}

function format(node, level) {
  var indentBefore = new Array(level++ + 1).join("  "),
    indentAfter = new Array(level - 1).join("  "),
    textNode;

  for (var i = 0; i < node.children.length; i++) {
    textNode = document.createTextNode("\n" + indentBefore);
    node.insertBefore(textNode, node.children[i]);

    format(node.children[i], level);

    if (node.lastElementChild == node.children[i]) {
      textNode = document.createTextNode("\n" + indentAfter);
      node.appendChild(textNode);
    }
  }

  return node;
}
export default function BlogPost() {
  const { state: routerState } = useLocation<any>();
  const allHtml = routerState.postDetails.content.split("<pre>");
  const code = allHtml[1].split("</pre>");
  const rest = code[1];
  //   const correctedHtml = arrayOfHtml.map((el: any, i: number) => {
  //     let correctedEl = "";
  //     if (i === 0) correctedEl = `${el}</p>`;
  //     else if (i === arrayOfHtml.length - 1) correctedEl = `<p>${el}`;
  //     else correctedEl = `<p>${el}</p>`;

  //     return correctedEl;
  //   });

  useEffect(() => {
    setTimeout(() => Prism.highlightAll(), 0);
  }, []);

  return (
    <>
      {/* <SunEditor
        setContents={routerState.postDetails.content}
        width="100%"
        height="100vh"
        showToolbar={false}
      /> */}
      <div
        dangerouslySetInnerHTML={{ __html: routerState.postDetails.content }}
      />

      {/* {correctedHtml.map((el: string, i: number) => {
        if (el.includes("<code>")) {
          const code = el.substring(10, el.length - 11);
          return (
            <pre key={i} className="prism-code">
              <code className="language-js">{process(code)}</code>
            </pre>
          );
        } else return <div key={i} dangerouslySetInnerHTML={{ __html: el }} />;
      })} */}
    </>
  );
}
