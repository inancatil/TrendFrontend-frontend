import React, { useState } from "react";
import { IBlogPost } from "../../../../types";
import Article from "./Article";
import CustomPagination from "./CustomPagination";

const NUM_OF_ARTICLES_PER_PAGE = 5;

interface IProps {
  blogPosts: IBlogPost[];
}

export default function ListView({ blogPosts }: IProps) {
  const [curPage, setCurPage] = useState<number>(1);
  const numberOfPages = Math.ceil(blogPosts.length / NUM_OF_ARTICLES_PER_PAGE);
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
