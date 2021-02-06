import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect } from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { useQuery } from "../../../hooks/useQuery";
import { smoothScrollToTop } from "../../../tools/utils";
import ListView from "../Home/ListView/ListView";
import SideCol from "../SideCol/SideCol";

const useStyles = makeStyles({
  skeleton: {
    minWidth: 275,
    minHeight: 300,
    marginBottom: 15,
  },
});

export default function Blogs() {
  const query = useQuery();
  const classes = useStyles();
  const { isLoading, blogPosts } = useHttpBlogPost({ isFetchNeeded: true });
  const renderedList =
    query.get("category") === null
      ? blogPosts
      : blogPosts.filter((p) => p.category?.name === query.get("category"));

  //move page to top on category change
  useEffect(() => {
    smoothScrollToTop(100, 10);
  }, [renderedList]);

  return (
    <>
      {!isLoading ? (
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            <ListView blogPosts={renderedList} isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <SideCol />
          </Grid>
        </Grid>
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
    </>
  );
}
