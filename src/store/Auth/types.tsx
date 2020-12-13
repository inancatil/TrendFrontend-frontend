import { IAuth } from "../../types";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

interface ILoginAction {
  type: typeof LOGIN;
  payload: Omit<IAuth, "isLoggedIn">;
}

interface ILogoutAction {
  type: typeof LOGOUT;
}

export type IAuthActions = ILoginAction | ILogoutAction;
