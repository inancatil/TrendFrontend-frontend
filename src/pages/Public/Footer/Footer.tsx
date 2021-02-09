import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import About from "./About";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: "auto",
    backgroundColor: "gray",
    padding: 15,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    color: "white",
    backgroundColor: "transparent",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Container maxWidth="md" style={{ paddingLeft: 24, paddingRight: 24 }}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Paper className={classes.paper} elevation={0}>
              <About />
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper className={classes.paper} elevation={0}>
              Vestibulum quam ligula, commodo non ultrices vel, egestas in mi.
              Aliquam erat volutpat. Maecenas in lacus non sapien ornare congue.
              Ut ac congue elit. Phasellus viverra nunc vitae ligula accumsan
              feugiat. Mauris finibus at felis et ullamcorper. Aenean fermentum
              ipsum velit, eu suscipit nunc imperdiet ac.
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper className={classes.paper} elevation={0}>
              Donec et justo enim. In dictum mi vitae tellus gravida egestas.
              Quisque feugiat urna sed elit accumsan, eu placerat ex aliquet. In
              hac habitasse platea dictumst. Etiam facilisis commodo ligula a
              bibendum. Maecenas volutpat tellus pretium libero posuere varius.
              Maecenas venenatis, magna ac condimentum luctus, diam felis luctus
              elit,
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
