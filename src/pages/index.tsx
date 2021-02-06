import * as React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import AdminRoutes from "./Admin/index";
import LoginRoutes from "./Login";
import useHttpAuth from "./../hooks/api/useHttpAuth";
import { useEffect } from "react";
import { useSelector } from "../store";
import PublicRoutes from "./Public/index";

export default function Routes() {
  const { refreshToken } = useHttpAuth();
  const { jwtToken, isLoggedIn } = useSelector((state) => state.userReducer);
  const refreshTokenTimeout = React.useRef<any>(null);
  const location = useLocation();

  //Refreshes token every 15 min
  useEffect(() => {
    function stopRefreshTokenTimer() {
      clearTimeout(refreshTokenTimeout.current);
    }
    if (location.pathname.slice(1, 6) === "admin") {
      const startRefreshTokenTimer = () => {
        // parse json object from base64 encoded jwt token
        const token = JSON.parse(atob(jwtToken.split(".")[1]));
        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(token.exp * 1000);
        const timeout = expires.getTime() - Date.now() - 60 * 1000;
        refreshTokenTimeout.current = setTimeout(refreshToken, timeout);
      };

      if (isLoggedIn) startRefreshTokenTimer();
      else stopRefreshTokenTimer();
    }
  }, [jwtToken, isLoggedIn, refreshToken, location]);

  return (
    <Switch>
      {/*strict is to remove extra backslahses */}
      <Route strict path="/login" component={LoginRoutes} />
      <Route strict path="/admin" component={AdminRoutes} />
      <Route strict path="/" component={PublicRoutes} />
    </Switch>
  );
}
