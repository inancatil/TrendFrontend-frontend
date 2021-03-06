import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect, useState } from "react";
import { smoothScrollToTop } from "../../../../tools/utils";
import { IBlogPost } from "../../../../types";
import Article from "./Article";
import CustomPagination from "./CustomPagination";

const NUM_OF_ARTICLES_PER_PAGE = 5;

const useStyles = makeStyles({
  article: {
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
  useEffect(() => {
    smoothScrollToTop(100);
  }, [curPage]);
  return (
    <div>
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
            className={classes.article}
          />
          <Skeleton
            variant="rect"
            animation="wave"
            className={classes.article}
          />
          <Skeleton
            variant="rect"
            animation="wave"
            className={classes.article}
          />
          <Skeleton
            variant="rect"
            animation="wave"
            className={classes.article}
          />
          <Skeleton
            variant="rect"
            animation="wave"
            className={classes.article}
          />
        </>
      )}
      <CustomPagination
        numberOfPages={numberOfPages}
        curPage={curPage}
        setCurPage={setCurPage}
      />
    </div>
  );
}
