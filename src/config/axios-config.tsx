import axios from "axios";
import { store } from "../store";
import * as userActions from "../store/User/action";
import * as alertActions from "../store/Alert/action";

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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        axios
          .post("/api/users/refresh-token")
          .then((res: any) => {
            store.dispatch(userActions.login(res.data));
            processQueue(null, res.data.token.jwtToken);
            resolve(axios(originalRequest));
            //startRefreshTokenTimer(res.data!.jwtToken);
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
            //Backend tarafındaki custom errors
            //console.log(err.response.data.message);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
