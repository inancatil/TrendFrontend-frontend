import Container from "@material-ui/core/Container";
import React from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import ListView from "../Home/ListView/ListView";

export default function Blogs() {
  const { isLoading, blogPosts } = useHttpBlogPost({ isFetchNeeded: true });
  return (
    <Container
      style={{
        paddingTop: 15,
      }}
    >
      {!isLoading && <ListView blogPosts={blogPosts} />}
    </Container>
  );
}
