import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import CustomCard from "./CustomCard";
import { IBlogPost } from "../../../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 25,
      paddingBottom: 25,
    },
    row: {
      flex: 1,
      flexDirection: "column",
    },
  })
);

interface IProps {
  blogPosts: IBlogPost[];
}

export default function GridView({ blogPosts }: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CustomCard postDetails={blogPosts[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomCard postDetails={blogPosts[1]} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CustomCard postDetails={blogPosts[2]} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CustomCard postDetails={blogPosts[3]} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CustomCard postDetails={blogPosts[4]} />
        </Grid>
      </Grid>
    </div>
  );
}
