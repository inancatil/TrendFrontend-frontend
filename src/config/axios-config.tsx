import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:80",
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
