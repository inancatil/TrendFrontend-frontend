import { IAuthResponse } from "../../types/auth";
import { IUserActions, LOGIN, LOGOUT, REFRESH_TOKEN } from "./types";

export const login = (res: IAuthResponse): IUserActions => {
  return {
    type: LOGIN,
    payload: res,
  };
};

export const logout = (): IUserActions => {
  return {
    type: LOGOUT,
  };
};

export const refreshToken = (jwtToken: string): IUserActions => {
  return {
    type: REFRESH_TOKEN,
    payload: { jwtToken },
  };
};
