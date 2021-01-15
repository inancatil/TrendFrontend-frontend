import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import AdminRoutes from "./Admin/index";
import NotFound from "./Fallback/NotFound/NotFound";
import LoginRoutes from "./Login";
import useHttpAuth from "./../hooks/api/useHttpAuth";
import { useEffect } from "react";
import { useSelector } from "../store";
import BlogPost from "./BlogPost/BlogPost";
import NavBar from "./Home/NavBar/NavBar";
import { Container, useMediaQuery } from "@material-ui/core";

export default function Routes() {
  const { refreshToken } = useHttpAuth();
  const { jwtToken, isLoggedIn } = useSelector((state) => state.userReducer);
  const refreshTokenTimeout = React.useRef<any>(null);
  const matches = useMediaQuery("(min-width:1200px)");

  //Refreshes token every 15 min
  useEffect(() => {
    const startRefreshTokenTimer = () => {
      // parse json object from base64 encoded jwt token
      const token = JSON.parse(atob(jwtToken.split(".")[1]));
      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(token.exp * 1000);
      const timeout = expires.getTime() - Date.now() - 60 * 1000;
      refreshTokenTimeout.current = setTimeout(refreshToken, timeout);
    };
    function stopRefreshTokenTimer() {
      clearTimeout(refreshTokenTimeout.current);
    }

    if (isLoggedIn) startRefreshTokenTimer();
    else stopRefreshTokenTimer();
  }, [jwtToken, isLoggedIn, refreshToken]);

  return (
    <Switch>
      <NavBar>
        <Container style={{ width: `${matches ? "940px" : ""}` }}>
          <Route exact path="/" component={Home} />
          <Route path="/blog/:bptitle" component={BlogPost} />
        </Container>
      </NavBar>
      {/*strict is to remove extra backslahses */}
      <Route strict path="/login" component={LoginRoutes} />{" "}
      <Route strict path="/admin" component={AdminRoutes} />
      <Route component={NotFound} />
    </Switch>
  );
}
