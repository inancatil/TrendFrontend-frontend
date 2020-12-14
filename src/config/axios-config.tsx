import axios from "axios";
import React from "react";
import { store } from "../store";

const instance = axios.create({
  baseURL: "http://localhost:80",
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.withCredentials = true;
instance.interceptors.request.use(function (config) {
  const token = store.getState().userReducer.jwtToken;
  config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
});

export default instance;
