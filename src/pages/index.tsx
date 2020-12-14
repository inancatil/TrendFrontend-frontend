import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import AdminRoutes from "./Admin/index";
import NotFound from "./Fallback/NotFound/NotFound";
import LoginRoutes from "./Login";
import { useSelector } from "../store";

export default function Routes() {
  const { isLoggedIn } = useSelector((state) => state.userReducer);
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginRoutes} />
      {isLoggedIn ? (
        <Route path="/admin" component={AdminRoutes} />
      ) : (
        <Redirect to={"/login"} />
      )}
      <Route component={NotFound} />
    </Switch>
  );
}
