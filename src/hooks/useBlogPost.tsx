import React from "react";
import IFrame from "../pages/Public/Blogs/BlogPost/IFrame";
import PrismBlock from "../pages/Public/Blogs/BlogPost/PrismBlock";
import parse from "html-react-parser";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      blockquote: {
        background: "#f9f9f9",
        borderLeft: "10px solid #ccc",
        margin: "1.5em 10px",
        padding: " 0.5em 10px",
        fontStyle: "italic",
        quotes: "'\u275b\u275b''\u275c\u275c'",
        "&:before": {
          color: "#ccc",
          content: "open-quote",
          fontSize: "3em",
          lineHeight: " 0.1em",
          marginRight: "0.25em",
          verticalAlign: " -0.3em",
        },
        "&:after": {
          color: "#ccc",
          content: "close-quote",
          fontSize: "3em",
          lineHeight: " 0.1em",
          marginRight: "0.25em",
          verticalAlign: " -0.3em",
        },
        "&>p": {
          display: "inline",
        },
      },
    },
  })
);

/**
 * Custom hook to modify blog content
 */
export default function useBlogPost() {
  //Used to style globally for now
  //May Change
  useStyles();

  /**
   * loop through elements and display html tag
   */
  const displayedContent = (
    tag: string,
    i: number,
    hasCopyButton: boolean
  ): React.ReactNode => {
    if (tag.includes("custom-iframe")) {
      const url = tag.split('class="custom-iframe">')[1].split("</span>");
      return <IFrame key={i} url={url[0]} />;
    }
    if (tag.substring(1, 4) === "pre") {
      return <PrismBlock key={i} code={tag} hasCopyButton={hasCopyButton} />;
    } else return <React.Fragment key={i}>{parse(tag)}</React.Fragment>;
  };

  const getAllContent = (code: string) => {
    return code
      .match(/<(.*?)( .*?|)>.*?<\/(\1)>/gs)! //matches all html tags and creates an array
      .map((el: string, i: number) => displayedContent(el, i, true));
  };
  const summarizeContent = (code: string) => {
    return code
      .match(/<(.*?)( .*?|)>.*?<\/(\1)>/gs)! //matches all html tags and creates an array
      .filter((el) => !el.includes("<p><br></p>")) //removes newline
      .slice(0, 3) //returns first 3 html element to display
      .map((el: string, i: number) => displayedContent(el, i, false));
  };
  return { summarizeContent, getAllContent };
}
