import React from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import PrismBlock from "./PrismBlock";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import IFrame from "./IFrame";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 150,
    },
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
  const classes = useStyles();
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

  return (
    <Container maxWidth="lg" className={classes.root}>
      {splittedTags.map((el: string, i: number) => {
        if (el.includes("custom-iframe")) {
          const url = el.split('class="custom-iframe">')[1].split("</span>");
          return <IFrame key={i} url={url[0]} />;
        }
        if (el.substring(1, 4) === "pre") {
          return <PrismBlock key={i} code={el} hasCopyButton />;
        } else return <React.Fragment key={i}>{parse(el)}</React.Fragment>;
      })}
    </Container>
  );
}
