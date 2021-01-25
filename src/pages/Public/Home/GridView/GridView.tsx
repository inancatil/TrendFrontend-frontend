import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import CustomCard from "./CustomCard";
import { IBlogPost } from "../../../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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

  //Loop içerisinde yeni obj olusturmak performans açısından iyi değilmiş.
  //slice() kullanmayınca orjinal array in de sırası değişiyor.
  const sortedNewToOld = blogPosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CustomCard postDetails={sortedNewToOld[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomCard postDetails={sortedNewToOld[1]} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CustomCard postDetails={sortedNewToOld[2]} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CustomCard postDetails={sortedNewToOld[3]} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CustomCard postDetails={sortedNewToOld[4]} />
        </Grid>
      </Grid>
    </div>
  );
}
