import * as React from "react";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import { useSelector } from "../../store";
import Login from "./Login";

export default function LoginRoutes() {
  const { path } = useRouteMatch();
  const { isLoggedIn } = useSelector((state) => state.userReducer);

  return !isLoggedIn ? (
    <Route path={path} component={Login} exact />
  ) : (
    <Redirect to={"/admin"} />
  );
}
