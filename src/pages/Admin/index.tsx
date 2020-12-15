import * as React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFound from "../Fallback/NotFound/NotFound";
import Admin from "./Admin";
import Categories from "./Categories/Categories";
import Home from "./Home/Home";
import NewPost from "./NewPost/NewPost";

export default function AdminRoutes() {
  const { path } = useRouteMatch();

  return (
    <Admin>
      <Switch>
        <Route path={path} component={Home} exact />
        <Route path={`${path}/categories`} component={Categories} />
        <Route path={`${path}/newpost`} component={NewPost} />
        <Route component={NotFound} />
      </Switch>
    </Admin>
  );
}
