import React from "react";

interface IProps {
  url: string;
}
export default function IFrame({ url }: IProps) {
  return (
    <iframe
      suppressContentEditableWarning={true}
      src={url}
      height="450"
      scrolling="no"
      frameBorder="0"
      name="CodePen Embed NWRBwGJ"
      title="CodePen Embed NWRBwGJ"
      style={{ width: "100%", overflow: "hidden", height: 400 }}
    >
      CodePen Embed Fallback
    </iframe>
  );
}
