import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
} from "@material-ui/core";
import React, { useState } from "react";
import clsx from "clsx";
import "prismjs/themes/prism-okaidia.css";
import { prismFormat } from "../../../../tools/utils";

interface IProps {
  code: string;
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

export default function PrismBlock({ code }: IProps) {
  const classes = useStyles();
  const [btnText, setBtnText] = useState<string>("Copy");
  const matches = useMediaQuery("(min-width:1100px)");

  const formattedCode = prismFormat(code.substring(5, code.length - 6));

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

  return (
    <pre className={clsx(["prism-code", classes.pre])}>
      {matches && (
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
      <code className={clsx(["language-js", classes.code])}>
        {formattedCode}
      </code>
    </pre>
  );
}
