import { Grid } from "@material-ui/core";
import * as React from "react";
import useHttpBlogPost from "../../../hooks/api/useHttpBlogPost";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import PersonalInfoCard from "./PersonalInfoCard/PersonalInfoCard";
export interface IHomeProps {}

export default function Home() {
  const { isLoading, blogPosts } = useHttpBlogPost({ isFetchNeeded: true });
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
              <PersonalInfoCard
                name={"Meltem Gürsoy"}
                job={"Frontend Developer"}
                linkedInUrl={"meltem linkedin url"}
                gitUrl={"meltem git url"}
                cvUrl={"meltem cv url"}
              />
              <PersonalInfoCard
                name={"İnanç Atıl"}
                job={"Frontend Developer"}
                linkedInUrl={"inanc linkedin url"}
                gitUrl={"inanc git url"}
                cvUrl={"inanc cv url"}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
