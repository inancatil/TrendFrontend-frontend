import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Public/Home/Home";
import AdminRoutes from "./Admin/index";
import NotFound from "./Fallback/NotFound/NotFound";
import LoginRoutes from "./Login";
import useHttpAuth from "./../hooks/api/useHttpAuth";
import { useEffect } from "react";
import { useSelector } from "../store";
import BlogPost from "./Public/BlogPost/BlogPost";
import NavBar from "./Public/Home/NavBar/NavBar";
import { Container } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import PublicRoutes from "./Public/Home/index";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "0 var(--gap)",
    },
  })
);

export default function Routes() {
  const classes = useStyles();
  const { refreshToken } = useHttpAuth();
  const { jwtToken, isLoggedIn } = useSelector((state) => state.userReducer);
  const refreshTokenTimeout = React.useRef<any>(null);

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
      {/*strict is to remove extra backslahses */}
      <Route strict path="/login" component={LoginRoutes} />
      <Route strict path="/admin" component={AdminRoutes} />
      <Route strict path="/" component={PublicRoutes} />
    </Switch>
  );
}
