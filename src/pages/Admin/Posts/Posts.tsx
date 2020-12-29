import React, { useEffect } from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../../store";

export default function Posts() {
  const blogPostReducer = useSelector((state) => state.blogPostReducer);
  const { isLoading } = useHttpBlogPost(true);

  useEffect(() => {
    console.log(blogPostReducer.length);
  });

  return <div>{isLoading}</div>;
}
