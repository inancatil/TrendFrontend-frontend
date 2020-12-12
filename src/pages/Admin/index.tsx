import * as React from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Admin from "./Admin";
import Categories from "./Categories/Categories";
import Home from "./Home/Home";
import { useSelector } from "../../store";
import NewPost from "./NewPost/NewPost";

export default function AdminRoutes() {
  const { path } = useRouteMatch();

  const { token } = useSelector((state) => state.authReducer);

  return token !== "" ? (
    <Admin>
      <Switch>
        <Route path={path} component={Home} exact />
        <Route path={`${path}/categories`} component={Categories} />
        <Route path={`${path}/newpost`} component={NewPost} />
      </Switch>
    </Admin>
  ) : (
    <Redirect to={"/login"} />
  );
}
