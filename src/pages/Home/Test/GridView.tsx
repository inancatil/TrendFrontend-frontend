import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import CustomCard from "./CustomCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      paddingTop: 25,
    },
  })
);

export default function GridView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <CustomCard />
        </Grid>
        <Grid item xs>
          <CustomCard />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <CustomCard />
        </Grid>
        <Grid item xs>
          <CustomCard />
        </Grid>
        <Grid item xs>
          <CustomCard />
        </Grid>
      </Grid>
    </div>
  );
}
