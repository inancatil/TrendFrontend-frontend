import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../Fallback/NotFound/NotFound";
import BlogPost from "./Blogs/BlogPost/BlogPost";
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar";
import Blogs from "./Blogs/Blogs";
import AboutMe from "./AboutMe/AboutMe";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useSelector } from "../../store";

export default function PublicRoutes() {
  const themeReducer = useSelector((state) => state.themeReducer);

  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          button: {
            outline: "none !important",
          },
        },
      },
    },
    palette: {
      type: themeReducer.type,
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
                  <Route path={`/blog/?tag`} component={Blogs} />
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
    </ThemeProvider>
  );
}
