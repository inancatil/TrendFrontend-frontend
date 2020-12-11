import { ILoginResponse, LOGIN, LOGOUT } from "./types";

export const login = (res: ILoginResponse) => {
  return {
    type: LOGIN,
    payload: {
      userData: res.userData,
      token: res.token,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
