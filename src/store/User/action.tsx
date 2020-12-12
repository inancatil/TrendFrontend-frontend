import { IUser } from "../../types";
import { IUserActions, LOGIN, LOGOUT } from "./types";

export const login = (res: IUser): IUserActions => {
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
