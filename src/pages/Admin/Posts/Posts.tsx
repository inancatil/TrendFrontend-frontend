import React, { useEffect, useState } from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../../store";
import { IBlogPost } from "../../../types";
import CarbonFrame from "./CarbonFrame";

export default function Posts() {
  const blogPostReducer = useSelector((state) => state.blogPostReducer);
  const { isLoading, error, getAllBlogPosts } = useHttpBlogPost();

  useEffect(() => {
    getAllBlogPosts();
  }, []);

  return <div>{isLoading}</div>;
}
