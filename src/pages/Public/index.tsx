import Container from "@material-ui/core/Container";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../Fallback/NotFound/NotFound";
import BlogPost from "./Blogs/BlogPost/BlogPost";
import Home from "./Home/Home";
import NavBar from "./Home/NavBar/NavBar";
import Blogs from "./Blogs/Blogs";
import AboutMe from "./AboutMe/AboutMe";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
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
                <Route exact path={`${url}/`} component={Blogs} />
                <Route path="/blog/:bptitle" component={BlogPost} />
              </>
            )}
          />
          <Route exact path="/about-me" component={AboutMe} />
          <Route exact path="/contact" render={() => <div>contact</div>} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </NavBar>
  );
}
