import { IAuthResponse } from "../../types/auth";
import { IUserActions, LOGIN, LOGOUT } from "./types";

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
