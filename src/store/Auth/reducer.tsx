import { IAuth } from "../../types";
import { IAuthActions, LOGIN, LOGOUT } from "./types";

const initialState: IAuth = {
  userId: "",
  token: "",
  isLoggedIn: false,
};

const login = (payload: Omit<IAuth, "isLoggedIn">): IAuth => {
  const newAuth: IAuth = {
    ...payload,
    isLoggedIn: true,
  };
  return newAuth;
};

const logout = (): IAuth => {
  const newState = {
    userId: "",
    token: "",
    isLoggedIn: false,
  };
  return newState;
};

export const authReducer = (
  state = initialState,
  action: IAuthActions
): IAuth => {
  switch (action.type) {
    case LOGIN:
      return login(action.payload);
    case LOGOUT:
      return logout();
    default:
      return state;
  }
};
