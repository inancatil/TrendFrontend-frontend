import axios from "axios";
import { store } from "../store";

const instance = axios.create({
  baseURL: "http://localhost:80",
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(function (config) {
  const token = store.getState().authReducer.token;
  config.headers.common["Authorization"] = `Bearer ${token}`;

  return config;
});

export default instance;
