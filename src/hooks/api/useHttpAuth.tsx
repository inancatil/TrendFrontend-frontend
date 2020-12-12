import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import axios from "../../config/axios-config";
import { IUser } from "../../types";

export default function useHttpAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const login = useCallback(
    async (email: string, password: string): Promise<IUser | null> => {
      setIsLoading(true);
      let response: IUser | null = null;
      try {
        await axios
          .post("/api/users/login", {
            email,
            password,
          })
          .then((res: AxiosResponse<IUser>) => {
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
