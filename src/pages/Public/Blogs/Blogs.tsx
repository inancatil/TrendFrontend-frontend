import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import ListView from "../Home/ListView/ListView";

const useStyles = makeStyles({
  skeleton: {
    minWidth: 275,
    minHeight: 300,

    marginBottom: 15,
  },
});

export default function Blogs() {
  const classes = useStyles();
  const { isLoading, blogPosts } = useHttpBlogPost({ isFetchNeeded: true });
  return (
    <Container style={{}} maxWidth="md">
      {!isLoading ? (
        <ListView blogPosts={blogPosts} isLoading={isLoading} />
      ) : (
        <>
          <Skeleton
            variant="rect"
            animation="wave"
            className={classes.skeleton}
          />
          <Skeleton
            variant="rect"
            animation="wave"
            className={classes.skeleton}
          />
          <Skeleton
            variant="rect"
            animation="wave"
            className={classes.skeleton}
          />
          <Skeleton
            variant="rect"
            animation="wave"
            className={classes.skeleton}
          />
          <Skeleton
            variant="rect"
            animation="wave"
            className={classes.skeleton}
          />
        </>
      )}
    </Container>
  );
}
