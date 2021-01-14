import React from "react";
import { prismFormat } from "../../tools/utils";

interface IProps {
  code: string;
}
export default function PrismBlock({ code }: IProps) {
  return (
    <pre className="prism-code" style={{ width: "50%" }}>
      <code className="language-js" style={{ whiteSpace: "pre-wrap" }}>
        {prismFormat(code.substring(5, code.length - 6))}
      </code>
    </pre>
  );
}
