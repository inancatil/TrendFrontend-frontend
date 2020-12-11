import { AnyAction } from "redux";
import { IAuth, IAuthActions, LOGIN, LOGOUT } from "./types";

const initialState: IAuth = {
  userData: {
    userId: "",
    name: "",
    email: "",
  },
  token: "",
};

const login = (state = initialState, action: AnyAction) => {
  const newState = {
    userData: action.payload.userData,
    token: action.payload.token,
  };
  return newState;
};

const logout = (state = initialState, action: AnyAction) => {
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

export const authReducer = (
  state = initialState,
  action: IAuthActions
): IAuth => {
  switch (action.type) {
    case LOGIN:
      return login(state, action);
    case LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};
