import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../Fallback/NotFound/NotFound";
import BlogPost from "./Blogs/BlogPost/BlogPost";
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar";
import Blogs from "./Blogs/Blogs";
import AboutMe from "./AboutMe/AboutMe";

export default function PublicRoutes() {
  return (
    <NavBar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/blog"
          render={({ match }) => {
            return (
              <>
                <Route exact path={`${match.url}/`} component={Blogs} />
                <Route path={`/blog/?category`} component={Blogs} />
                <Route path="/blog/:bptitle" component={BlogPost} />
              </>
            );
          }}
        />
        <Route exact path="/about-me" component={AboutMe} />
        <Route exact path="/contact" render={() => <div>contact</div>} />
        <Route component={NotFound} />
      </Switch>
    </NavBar>
  );
}
