import { Container, Grid } from "@material-ui/core";
import * as React from "react";
import useHttpBlogPost from "../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../store";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import PersonalInfoCard from "./PersonalInfoCard/PersonalInfoCard";
export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const { isLoading } = useHttpBlogPost({ isFetchNeeded: true });
  const blogPosts = useSelector((state) => state.blogPostReducer);
  return (
    <Container>
      {!isLoading && blogPosts.length > 0 && (
        <>
          <GridView />
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} xs={12}>
              <ListView />
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
    </Container>
  );
}
