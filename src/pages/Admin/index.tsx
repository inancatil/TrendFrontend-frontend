import * as React from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import NotFound from "../Fallback/NotFound/NotFound";
import Admin from "./Admin";
import Categories from "./Categories/Categories";
import Home from "./Home/Home";
import { useSelector } from "../../store";

export default function AdminRoutes() {
  const { path } = useRouteMatch();

  const { token } = useSelector((state) => state.authReducer);

  return token !== "" ? (
    <Admin>
      <Switch>
        <Route path={path} component={Home} exact />
        <Route path={`${path}/categories`} component={Categories} />
      </Switch>
    </Admin>
  ) : (
    <Redirect to={"/login"} />
  );
}
