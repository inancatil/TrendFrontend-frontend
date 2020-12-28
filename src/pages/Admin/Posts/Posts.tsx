import React, { useEffect, useState } from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../../store";
import { IBlogPost } from "../../../types";
import CarbonFrame from "./CarbonFrame";
//const CarbonFrame = React.lazy(() => import("./CarbonFrame"));

export default function Posts() {
  const blogPostReducer = useSelector((state) => state.blogPostReducer);
  const { isLoading, error, getAllBlogPosts } = useHttpBlogPost();

  useEffect(() => {
    getAllBlogPosts();
  }, []);

  useEffect(() => {
    console.log(blogPostReducer);
  });
  return <div>{isLoading}</div>;
}
