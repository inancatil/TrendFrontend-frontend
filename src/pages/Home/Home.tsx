import { Container } from "@material-ui/core";
import * as React from "react";
import useHttpBlogPost from "../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../store";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import NavBar from "./NavBar/NavBar";
import PostCard from "./PostCard";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const { isLoading } = useHttpBlogPost({ isFetchNeeded: true });
  const blogPosts = useSelector((state) => state.blogPostReducer);

  return (
    <Container style={{ backgroundColor: "#f5f8f9" }}>
      <div>
        <NavBar />
        {!isLoading && blogPosts.length > 0 && (
          <GridView blogPosts={blogPosts} />
        )}
        <ListView />
        {/* {blogPostReducer.map((post) => {
          return <PostCard key={post.id} postDetails={post} />;
        })} */}
      </div>
    </Container>
  );
}
