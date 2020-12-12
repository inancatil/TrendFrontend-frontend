import { IUser } from "../../types";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

interface ILoginAction {
  type: typeof LOGIN;
  payload: IUser;
}

interface ILogoutAction {
  type: typeof LOGOUT;
}

export type IUserActions = ILoginAction | ILogoutAction;
