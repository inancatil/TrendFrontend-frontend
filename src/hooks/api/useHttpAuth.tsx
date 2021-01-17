import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import axios from "../../config/axios-config";
import { IAuthResponse } from "../../types/auth";
import { useDispatch } from "react-redux";
import * as userActions from "../../store/User/action";
import { useSelector } from "../../store";

export default function useHttpAuth() {
  const { isLoggedIn } = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [mounted, setmounted] = useState(true);
  //#region refresh token
  // const refreshTokenTimeout = useRef<any>(null);

  // const startRefreshTokenTimer = useCallback((tkn: string) => {
  //   // parse json object from base64 encoded jwt token
  //   const jwtToken = JSON.parse(atob(tkn.split(".")[1]));

  //   // set a timeout to refresh the token a minute before it expires
  //   const expires = new Date(jwtToken.exp * 1000);
  //   const timeout = expires.getTime() - Date.now() - 60 * 1000;
  //   refreshTokenTimeout.current = setTimeout(() => refreshToken(), timeout);
  // }, []);

  // function stopRefreshTokenTimer() {
  //   clearTimeout(refreshTokenTimeout.current);
  // }
  //#endregion

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);

      setmounted(true);
      try {
        await axios
          .post("/api/users/authenticate", {
            email,
            password,
          })
          .then((res: AxiosResponse<IAuthResponse>) => {
            mounted && dispatch(userActions.login(res.data));
          })
          .catch((err) => {
            setError(err.response.data.error.messages);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        setError(["Unknown Error"]);
      }
    },
    [dispatch, mounted]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    setmounted(true);
    try {
      await axios
        .post("/api/users/revoke-token")
        .then((res: AxiosResponse<any>) => {
          mounted && dispatch(userActions.logout());
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          setError(err.response.data.error.messages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      setError(["Unknown Error"]);
    }
  }, [dispatch, mounted]);

  const refreshToken = useCallback(async () => {
    try {
      await axios
        .post("/api/users/refresh-token")
        .then((res: AxiosResponse<IAuthResponse>) => {
          dispatch(userActions.login(res.data));
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          setError(err.response.data.error.messages);
        });
    } catch (err) {
      setError(["Unknown Error"]);
      console.log("Unknown Error");
    }
  }, [dispatch]);

  const createNewUser = useCallback(
    async (email: string, password: string, role: string) => {
      setIsLoading(true);
      try {
        await axios
          .post("/api/users/create-user", { email, password, role })
          .then((res: AxiosResponse<any>) => {
            console.log(res.data);
          })
          .catch((err) => {
            //Backend tarafındaki custom errors
            setError(err.response.data.error.messages);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        setError(["Unknown Error"]);
        console.log("Unknown Error");
      }
    },
    []
  );

  //To fix updating redux state on unmounted component error
  useEffect(() => {
    return () => {
      setmounted(false);
    };
  }, []);

  return {
    login,
    logout,
    refreshToken,
    isLoggedIn,
    error,
    isLoading,
    createNewUser,
  };
}
