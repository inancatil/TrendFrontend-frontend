import React from "react";
import { useLocation } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import useBlogPost from "../../../../hooks/useBlogPost";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 150,
    },
  })
);

export default function BlogPost() {
  const classes = useStyles();
  const { state: routerState } = useLocation<any>();
  const { getAllContent } = useBlogPost();

  return (
    <Container maxWidth="md" className={classes.root}>
      {getAllContent(routerState.postDetails.content)}
    </Container>
  );
}
