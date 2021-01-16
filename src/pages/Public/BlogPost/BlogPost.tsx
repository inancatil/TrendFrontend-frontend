import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Prism from "prismjs";
import parse from "html-react-parser";
import PrismBlock from "./PrismBlock";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
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

export default function BlogPost() {
  useStyles();
  const { state: routerState } = useLocation<any>();

  /**
   * Matches starting tag with ending tag
   * <p>....</p>
   * or
   * <p class="">....</p>
   * etc.
   * /s flag for dot (.) to support newline char.
   */
  const splittedTags = routerState.postDetails.content.match(
    /<(.*?)( .*?|)>.*?<\/(\1)>/gs
  );

  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }, []);

  return (
    <Container maxWidth="lg">
      {splittedTags.map((el: string, i: number) => {
        if (el.substring(1, 4) === "pre") {
          return <PrismBlock key={i} code={el} />;
        } else return <React.Fragment key={i}>{parse(el)}</React.Fragment>;
      })}
    </Container>
  );
}
