import axios from "../../config/axios-config";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import React from "react";
import NavigationDrawer from "../../components/Admin/Layout/NavigationDrawer/NavigationDrawer";
import useHttpAuth from "./../../hooks/api/useHttpAuth";

export interface IAdminProps {
  children: React.ReactNode;
}

export default function Admin(props: IAdminProps) {
  const httpAuth = useHttpAuth();

  const refreshAuthLogic = (failedRequest: any) =>
    httpAuth.refreshToken().then((tokenRefreshResponse) => {
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse;
      return Promise.resolve();
    });
  // Instantiate the interceptor (you can chain it as it returns the axios instance)
  createAuthRefreshInterceptor(axios, refreshAuthLogic);

  return <NavigationDrawer>{props.children}</NavigationDrawer>;
}
