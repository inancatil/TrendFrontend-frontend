import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../Fallback/NotFound/NotFound";
import Admin from "./Admin";
import Categories from "./Categories/Categories";
import Home from "./Home/Home";
import { useSelector } from "../../store";

export default function AdminRoutes({ match }) {
  const { token } = useSelector((state) => state.authReducer);

  return token !== "" ? (
    <Admin>
      <Switch>
        <Route path={`${match.url}/`} component={Home} exact />
        <Route path={`${match.url}/categories`} component={Categories} />
      </Switch>
    </Admin>
  ) : (
    <Redirect to={"/login"} />
  );
}
