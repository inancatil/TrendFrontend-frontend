import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import "prismjs/themes/prism-okaidia.css";
import { prismFormat } from "../../../../tools/utils";
import Prism from "prismjs";
import Box from "@material-ui/core/Box";

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
      fontFamily: "monospace !important",
    },
    copyBtn: {
      margin: theme.spacing(1),
      position: "absolute",
      right: 15,
      top: 10,
      zIndex: 1,
    },
  })
);

export default function PrismBlock({ code, hasCopyButton = false }: IProps) {
  const classes = useStyles();
  const [btnText, setBtnText] = useState<string>("Copy");
  const matches = useMediaQuery("(min-width:1100px)");
  const buttonTimer = useRef<NodeJS.Timeout | null>(null);
  //prism code format should be set when writing posts.
  //Defaults to language-js if not defined
  const codeFormat = code.includes('<pre class="')
    ? code.split('<pre class="')[1].split('">')[0]
    : "language-js";

  //returns the code inside of <pre></pre> tags as string
  //useMemo is used not to call same method
  const formattedCode = useMemo(
    //splits from first ">" char until </pre> tag
    () => prismFormat(code.split(/>(.+)/)[1].split("</pre>")[0]),
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
      buttonTimer.current = setTimeout(() => setBtnText("Copy"), 1000);
    }
  };

  //to apply prism effect
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);

    return () => {
      //clear button timeout on unmount
      buttonTimer.current && clearTimeout(buttonTimer.current);
    };
  }, []);

  return (
    <Box position="relative">
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

      <pre
        suppressContentEditableWarning={true}
        className={clsx(["prism-code", codeFormat, classes.pre])}
      >
        <code
          suppressContentEditableWarning={true}
          className={clsx([classes.code])}
        >
          {formattedCode}
        </code>
      </pre>
    </Box>
  );
}
