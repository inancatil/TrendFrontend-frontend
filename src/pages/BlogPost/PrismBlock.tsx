import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { prismFormat } from "../../tools/utils";
import clsx from "clsx";

interface IProps {
  code: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    codeContainer: {
      position: "relative",
      width: "80%",
      borderRadius: "25px !important",
      left: "5%",
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

  const formattedCode = prismFormat(code.substring(5, code.length - 6));

  const copyToClipboard = () => {
    setBtnText("Copied!");
    const el = document.createElement("textarea");
    el.value = formattedCode;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setTimeout(() => setBtnText("Copy"), 1000);
  };

  return (
    <pre className={clsx(["prism-code", classes.codeContainer])}>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        className={classes.copyBtn}
        onClick={copyToClipboard}
      >
        {btnText}
      </Button>
      <code className="language-js" style={{ whiteSpace: "pre-wrap" }}>
        {formattedCode}
      </code>
    </pre>
  );
}
