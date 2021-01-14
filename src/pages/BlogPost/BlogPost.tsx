import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import parse from "html-react-parser";
import PrismBlock from "./PrismBlock";

export default function BlogPost() {
  const { state: routerState } = useLocation<any>();

  /**
   * Matches starting tag with ending tag
   * <p>....</p>
   * or
   * <p class="">....</p>
   * etc.
   */
  const splittedTags = routerState.postDetails.content.match(
    /<(.*?)( .*?|)>.*?<\/(\1)>/g
  );

  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }, []);

  return (
    <div className="article-container">
      {splittedTags.map((el: string, i: number) => {
        if (el.substring(1, 4) === "pre") {
          return <PrismBlock key={i} code={el} />;
        } else return <React.Fragment key={i}>{parse(el)}</React.Fragment>;
      })}
    </div>
  );
}
