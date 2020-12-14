import { IUser } from "../../types";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

interface ILoginAction {
  type: typeof LOGIN;
  payload: Omit<IUser, "isLoggedIn">;
}

interface ILogoutAction {
  type: typeof LOGOUT;
}

export type IUserActions = ILoginAction | ILogoutAction;
