import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import axios from "../config/axios-config";
import { ILogin, ILoginResponse } from "../store/Auth/types";

export default function useHttpAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const login = useCallback(
    async (loginData: ILogin): Promise<ILoginResponse | null> => {
      setIsLoading(true);
      let response: ILoginResponse | null = null;
      try {
        await axios
          .post("/api/users/login", {
            email: loginData.username,
            password: loginData.password,
          })
          .then((res: AxiosResponse<ILoginResponse>) => {
            response = {
              userData: res.data.userData,
              token: res.data.token,
            };

            setError("");
          })
          .catch((err) => {
            //Backend tarafındaki custom errors
            //console.log(err.response.data.message);
            setError(err.response.data.message);
          });
      } catch (err) {
        console.log("Unknown Error");
      }
      setIsLoading(false);
      return response;
    },
    []
  );

  return { isLoading, error, login };
}
