import { IUser } from "../../types";
import { IUserActions, LOGIN, LOGOUT } from "./types";

const initialState: IUser = {
  userData: {
    userId: "",
    name: "",
    email: "",
  },
  token: "",
};

const login = (state = initialState, payload: IUser): IUser => {
  const newState = {
    userData: payload.userData,
    token: payload.token,
  };
  return newState;
};

const logout = (state = initialState): IUser => {
  const newState = {
    userData: {
      userId: "",
      name: "",
      email: "",
    },
    token: "",
  };
  return newState;
};

export const userReducer = (
  state = initialState,
  action: IUserActions
): IUser => {
  switch (action.type) {
    case LOGIN:
      return login(state, action.payload);
    case LOGOUT:
      return logout(state);
    default:
      return state;
  }
};
