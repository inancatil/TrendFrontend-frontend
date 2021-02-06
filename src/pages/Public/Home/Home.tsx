import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import * as React from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import SideCol from "../SideCol/SideCol";
export interface IHomeProps {}

export default function Home() {
  const { isLoading, blogPosts } = useHttpBlogPost({ isFetchNeeded: true });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {blogPosts.length > 4 && (
        <>
          <GridView blogPosts={blogPosts} />
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} xs={12}>
              <ListView blogPosts={blogPosts} isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <SideCol />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
