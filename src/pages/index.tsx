import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import AdminRoutes from "./Admin/index";
import NotFound from "./Fallback/NotFound/NotFound";
import LoginRoutes from "./Login";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginRoutes} />
      <Route path="/admin" component={AdminRoutes} />
      <Route component={NotFound} />
    </Switch>
  );
}
