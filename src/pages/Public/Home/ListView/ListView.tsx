import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useState } from "react";
import { IBlogPost } from "../../../../types";
import Article from "./Article";
import CustomPagination from "./CustomPagination";

const NUM_OF_ARTICLES_PER_PAGE = 5;

const useStyles = makeStyles({
  skeleton: {
    minWidth: 275,
    minHeight: 300,

    marginBottom: 15,
  },
});

interface IProps {
  blogPosts: IBlogPost[];
  isLoading: boolean;
}

export default function ListView({ blogPosts, isLoading }: IProps) {
  const classes = useStyles();
  const [curPage, setCurPage] = useState<number>(1);
  const numberOfPages = Math.ceil(blogPosts.length / NUM_OF_ARTICLES_PER_PAGE);
  return (
    <>
      {!isLoading ? (
        blogPosts
          .slice(
            (curPage - 1) * NUM_OF_ARTICLES_PER_PAGE,
            (curPage - 1) * NUM_OF_ARTICLES_PER_PAGE + NUM_OF_ARTICLES_PER_PAGE
          )
          .map((post: IBlogPost) => (
            <Article key={post.id} postDetails={post} />
          ))
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
      <CustomPagination
        numberOfPages={numberOfPages}
        curPage={curPage}
        setCurPage={setCurPage}
      />
    </>
  );
}
