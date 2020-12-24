import { IUser } from "../../types";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

interface ILoginAction {
  type: typeof LOGIN;
  payload: Omit<IUser, "isLoggedIn">;
}

interface ILogoutAction {
  type: typeof LOGOUT;
}

interface IRefreshTokenAction {
  type: typeof REFRESH_TOKEN;
  payload: { jwtToken: string };
}

export type IUserActions = ILoginAction | ILogoutAction | IRefreshTokenAction;
