import { IUser } from "../../types";
import { IUserActions, LOGIN, LOGOUT, REFRESH_TOKEN } from "./types";

const initialState: IUser = {
  id: "",
  name: "",
  email: "",
  blogPosts: [],
  isLoggedIn: false,
  jwtToken: "",
};

const login = (payload: Omit<IUser, "isLoggedIn">): IUser => {
  const newAuth: IUser = {
    ...payload,
    isLoggedIn: true,
  };
  return newAuth;
};

const logout = (): IUser => {
  const newState = {
    id: "",
    name: "",
    email: "",
    blogPosts: [],
    isLoggedIn: false,
    jwtToken: "",
  };
  return newState;
};

const refreshToken = (state: IUser, payload: { jwtToken: string }): IUser => {
  const newAuth: IUser = {
    ...state,
    jwtToken: payload.jwtToken,
  };
  return newAuth;
};

export const userReducer = (
  state = initialState,
  action: IUserActions
): IUser => {
  switch (action.type) {
    case LOGIN:
      return login(action.payload);
    case LOGOUT:
      return logout();
    case REFRESH_TOKEN:
      return refreshToken(state, action.payload);
    default:
      return state;
  }
};
