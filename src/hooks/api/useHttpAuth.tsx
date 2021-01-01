import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
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
      try {
        await axios
          .post("/api/users/authenticate", {
            email,
            password,
          })
          .then((res: AxiosResponse<IAuthResponse>) => {
            //startRefreshTokenTimer(res.data.jwtToken);
            dispatch(userActions.login(res.data!));
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
    [dispatch]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .post("/api/users/revoke-token")
        .then((res: AxiosResponse<any>) => {
          // stopRefreshTokenTimer();
          dispatch(userActions.logout());
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
  }, [dispatch]);

  const refreshToken = useCallback(async () => {
    try {
      await axios
        .post("/api/users/refresh-token")
        .then((res: AxiosResponse<IAuthResponse>) => {
          dispatch(userActions.login(res.data));
          //startRefreshTokenTimer(res.data!.jwtToken);
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

  return { login, logout, refreshToken, isLoggedIn, error, isLoading };
}
