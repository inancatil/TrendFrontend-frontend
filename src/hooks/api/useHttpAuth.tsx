import { AxiosResponse } from "axios";
import { useCallback, useRef } from "react";
import axios from "../../config/axios-config";
import { IAuthResponse } from "../../types/auth";
import { useDispatch } from "react-redux";
import * as userActions from "../../store/User/action";
import * as alertActions from "../../store/Alert/action";

export default function useHttpAuth() {
  const dispatch = useDispatch();

  const login = useCallback(async (email: string, password: string) => {
    let isSuccesfull = false;
    try {
      await axios
        .post("/api/users/authenticate", {
          email,
          password,
        })
        .then((res: AxiosResponse<IAuthResponse>) => {
          isSuccesfull = true;
          startRefreshTokenTimer(res.data.jwtToken);
          dispatch(userActions.login(res.data!));
          dispatch(alertActions.alertClear());
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          //console.log(err.response.data.message);
          dispatch(alertActions.alertError(err.response.data.message));
        });
    } catch (err) {
      console.log("Unknown Error");
    }
    return isSuccesfull;
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios
        .post("/api/users/revoke-token")
        .then((res: AxiosResponse<any>) => {
          stopRefreshTokenTimer();
          dispatch(userActions.logout());
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          //console.log(err.response.data.message);
          dispatch(alertActions.alertSuccess(err.response.data.message));
        });
    } catch (err) {
      console.log("Unknown Error");
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      await axios
        .post("/api/users/refresh-token")
        .then((res: AxiosResponse<IAuthResponse>) => {
          dispatch(userActions.login(res.data));
          startRefreshTokenTimer(res.data!.jwtToken);
        })
        .catch((err) => {
          //Backend tarafındaki custom errors
          //console.log(err.response.data.message);
        });
    } catch (err) {
      console.log("Unknown Error");
    }
  }, []);

  const refreshTokenTimeout = useRef<any>(null);

  function startRefreshTokenTimer(tkn: string) {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(tkn.split(".")[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    refreshTokenTimeout.current = setTimeout(() => refreshToken(), timeout);
  }

  function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout.current);
  }

  return { login, logout, refreshToken };
}
