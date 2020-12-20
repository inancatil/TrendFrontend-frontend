import * as React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import useHttpAuth from "../../hooks/api/useHttpAuth";
import { useSelector } from "../../store";
import NotFound from "../Fallback/NotFound/NotFound";
import Admin from "./Admin";
import Categories from "./Categories/Categories";
import Home from "./Home/Home";
import NewPost from "./NewPost/NewPost";

export default function AdminRoutes() {
  const { path } = useRouteMatch();
  const { isLoggedIn } = useSelector((state) => state.userReducer);
  const alertReducer = useSelector((state) => state.alertReducer);
  const httpAuth = useHttpAuth();
  if (alertReducer.message.includes("Auth") || !isLoggedIn)
    httpAuth.refreshToken();

  return (
    <>
      {isLoggedIn ? (
        <Admin>
          <Switch>
            <Route path={path} component={Home} exact />
            <Route path={`${path}/categories`} component={Categories} />
            <Route path={`${path}/newpost`} component={NewPost} />
            <Route component={NotFound} />
          </Switch>
        </Admin>
      ) : (
        <Redirect to={"/login"} />
      )}
    </>
  );
}
