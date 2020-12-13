import { IAuth } from "../../types";
import { IAuthActions, LOGIN, LOGOUT } from "./types";

export const login = (res: Omit<IAuth, "isLoggedIn">): IAuthActions => {
  return {
    type: LOGIN,
    payload: res,
  };
};

export const logout = (): IAuthActions => {
  return {
    type: LOGOUT,
  };
};
