import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

interface IProps {
  numberOfPages: number;
  curPage: number;
  setCurPage: (x: number) => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },

    ul: {
      justifyContent: "center",

      "&>li:first-child": {
        marginRight: "auto",
      },
      "&>li:last-child": {
        marginLeft: "auto",
      },
    },
  })
);

export default function CustomPagination({
  numberOfPages = 1,
  curPage,
  setCurPage,
}: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={curPage}
        onChange={(_, v: number) => setCurPage(v)}
        variant="outlined"
      />
    </div>
  );
}
