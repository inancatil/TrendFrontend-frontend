import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { store } from "../store";
import { REFRESH_TOKEN } from "../store/User/types";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.withCredentials = true;
instance.interceptors.request.use(function (config) {
  const token = store.getState().userReducer.jwtToken;
  config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
});

const refreshAuthLogic = (failedRequest: any) =>
  instance
    .post("/api/users/refresh-token")
    .then((tokenRefreshResponse: any) => {
      console.log(tokenRefreshResponse);
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.jwtToken;

      store.dispatch({
        type: REFRESH_TOKEN,
        payload: {
          jwtToken: tokenRefreshResponse.data.jwtToken,
        },
      });
      return Promise.resolve();
    });
// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(instance, refreshAuthLogic);

export default instance;
