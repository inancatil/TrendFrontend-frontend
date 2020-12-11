import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import AdminRoutes from "./Admin/index";
import NotFound from "./Fallback/NotFound/NotFound";
import Login from "./Login/Login";

export interface IRoutesProps {}

export default function Routes(props: IRoutesProps) {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/admin" component={AdminRoutes} />
      <Route>
        <NotFound />
      </Route>
    </>
  );
}
