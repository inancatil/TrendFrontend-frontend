export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface IAuth {
  userData: IUserData;
  token: string;
}

export interface IUserData {
  userId: string;
  name: string;
  email: string;
}
export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  userData: IUserData;
  token: string;
}

interface ILoginAction {
  type: typeof LOGIN;
  payload: {
    userData: IUserData;
    token: string;
  };
}

interface ILogoutAction {
  type: typeof LOGOUT;
}

export type IAuthActions = ILoginAction | ILogoutAction;
