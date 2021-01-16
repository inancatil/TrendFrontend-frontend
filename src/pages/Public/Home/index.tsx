import Container from "@material-ui/core/Container";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "../../Fallback/NotFound/NotFound";
import BlogPost from "../BlogPost/BlogPost";
import Home from "./Home";
import NavBar from "./NavBar/NavBar";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "0 var(--gap)",
    },
  })
);

export default function PublicRoutes() {
  const classes = useStyles();
  return (
    <NavBar>
      <Container className={classes.root}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/blog"
            render={({ match: { url } }) => (
              <>
                <Route exact path={`${url}/`} render={() => <div>blogs</div>} />
                <Route path="/blog/:bptitle" component={BlogPost} />
              </>
            )}
          />
          <Route exact path="/about-me" render={() => <div>about-me</div>} />
          <Route exact path="/contact" render={() => <div>contact</div>} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </NavBar>
  );
}
