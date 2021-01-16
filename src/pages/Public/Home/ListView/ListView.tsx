import { Container } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "../../../../store";
import { IBlogPost } from "../../../../types";
import Article from "./Article";
import CustomPagination from "./CustomPagination";

const NUM_OF_ARTICLES_PER_PAGE = 5;

export default function ListView() {
  const blogPosts = useSelector((state) => state.blogPostReducer);
  const [curPage, setCurPage] = useState<number>(1);
  const numberOfPages = Math.ceil(blogPosts.length / NUM_OF_ARTICLES_PER_PAGE);
  console.log(blogPosts);
  return (
    <>
      {blogPosts
        .slice(
          (curPage - 1) * NUM_OF_ARTICLES_PER_PAGE,
          (curPage - 1) * NUM_OF_ARTICLES_PER_PAGE + NUM_OF_ARTICLES_PER_PAGE
        )
        .map((post: IBlogPost) => (
          <Article key={post.id} postDetails={post} />
        ))}
      <CustomPagination
        numberOfPages={numberOfPages}
        curPage={curPage}
        setCurPage={setCurPage}
      />
    </>
  );
}
