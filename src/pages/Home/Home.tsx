import { Container, Grid, useMediaQuery } from "@material-ui/core";
import * as React from "react";
import useHttpBlogPost from "../../hooks/api/useHttpBlogPost";
import { useSelector } from "../../store";
import GridView from "./GridView/GridView";
import ListView from "./ListView/ListView";
import NavBar from "./NavBar/NavBar";
import PersonalInfoCard from "./PersonalInfoCard/PersonalInfoCard";
export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  //width 1200px den fazla ise container ı 940 yapmak için kullanıyoruz
  const matches = useMediaQuery("(min-width:1200px)");
  const { isLoading } = useHttpBlogPost({ isFetchNeeded: true });
  const blogPosts = useSelector((state) => state.blogPostReducer);
  return (
    <Container style={{ backgroundColor: "#f5f8f9" }}>
      <NavBar />
      <Container style={{ width: `${matches ? "940px" : ""}` }}>
        {!isLoading && blogPosts.length > 0 && (
          <>
            <GridView />
            <Grid container spacing={3}>
              <Grid item lg={8} md={8} xs={12}>
                <ListView />
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <PersonalInfoCard />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Container>
  );
}
