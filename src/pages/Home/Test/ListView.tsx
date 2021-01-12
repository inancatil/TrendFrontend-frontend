import { Container } from "@material-ui/core";
import React from "react";
import { useSelector } from "../../../store";
import { IBlogPost } from "../../../types";
import Article from "./Article";

export default function ListView() {
  const blogPosts = useSelector((state) => state.blogPostReducer);

  return (
    <>
      {blogPosts.map((post: IBlogPost) => (
        <Article key={post.id} postDetails={post} />
      ))}
    </>
  );
}
