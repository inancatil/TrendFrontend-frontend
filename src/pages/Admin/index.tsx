import * as React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useSelector } from "../../store";
import NotFound from "../Fallback/NotFound/NotFound";
import Admin from "./Admin";
import Categories from "./Categories/Categories";
import Home from "./Home/Home";
import Posts from "./Posts/Posts";
import PostDetails from "./../../components/Admin/PostDetails/PostDetails";
import Users from "./Users/Users";

export default function AdminRoutes({ match }) {
  const { path } = useRouteMatch();
  const { isLoggedIn } = useSelector((state) => state.userReducer);
  return (
    <>
      {isLoggedIn ? (
        <Admin>
          <Switch>
            <Route path={path} component={Home} exact />
            <Route path={`${path}/categories`} component={Categories} />
            <Route
              path={`${path}/posts`}
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} component={Posts} exact />
                  <Route path={`${url}/:postTitle`} component={PostDetails} />
                </>
              )}
            />
            <Route path={`${path}/users`} component={Users} />
            <Route component={NotFound} />
          </Switch>
        </Admin>
      ) : (
        <Redirect to={"/login"} />
      )}
    </>
  );
}
