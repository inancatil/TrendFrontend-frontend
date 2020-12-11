import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../Fallback/NotFound/NotFound";
import Admin from "./Admin";
import Categories from "./Categories/Categories";
import Home from "./Home/Home";
import { useSelector } from "../../store";

export default function AdminRoutes() {
  const { token } = useSelector((state) => state.authReducer);

  return token !== "" ? (
    <Route
      path="/admin"
      render={({ match: { url } }) => (
        <Switch>
          <Route
            path={`${url}/`}
            exact
            render={(props) => (
              <Admin {...props}>
                <Home />
              </Admin>
            )}
          />
          <Route
            path={`${url}/categories`}
            render={(props) => (
              <Admin {...props}>
                <Categories />
              </Admin>
            )}
          />
          <Route>
            <Admin>
              <NotFound />
            </Admin>
          </Route>
        </Switch>
      )}
    />
  ) : (
    <Redirect to={"/login"} />
  );
}
