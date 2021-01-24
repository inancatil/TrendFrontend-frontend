import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import "prismjs/themes/prism-okaidia.css";
import { prismFormat } from "../../../../tools/utils";
import Prism from "prismjs";

interface IProps {
  code: string;
  hasCopyButton?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pre: {
      position: "relative",
      width: "100%",
      borderRadius: "15px !important",
      "&::-webkit-scrollbar": {
        display: "none",
      },
      /* Hide scrollbar for IE, Edge and Firefox */
      msOverflowStyle: "none",
      /* IE and Edge */
      scrollbarWidth: "none",
      /* Firefox */
    },
    code: {
      fontSize: "16px!important",
    },
    copyBtn: {
      margin: theme.spacing(1),
      position: "absolute",
      right: 15,
      top: 10,
    },
  })
);

export default function PrismBlock({ code, hasCopyButton = false }: IProps) {
  const classes = useStyles();
  const [btnText, setBtnText] = useState<string>("Copy");
  const matches = useMediaQuery("(min-width:1100px)");

  //returns the code inside of <pre></pre> tags as string
  //useMemo is used not to call same method
  const formattedCode = useMemo(
    () => prismFormat(code.substring(5, code.length - 6)),
    [code]
  );

  const copyToClipboard = () => {
    if (btnText === "Copy") {
      setBtnText("Copied!");
      const el = document.createElement("textarea");
      el.value = formattedCode;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setTimeout(() => setBtnText("Copy"), 1000);
    }
  };

  //to apply prism effect
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }, []);

  return (
    <pre
      suppressContentEditableWarning={true}
      className={clsx(["prism-code", "language-js", classes.pre])}
    >
      {hasCopyButton && matches && (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={classes.copyBtn}
          onClick={copyToClipboard}
        >
          {btnText}
        </Button>
      )}
      <code
        suppressContentEditableWarning={true}
        className={clsx(["language-js", classes.code])}
      >
        {formattedCode}
      </code>
    </pre>
  );
}
