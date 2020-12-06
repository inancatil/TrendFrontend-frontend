import { AnyAction } from "redux";
import { IAuth, IAuthActions, LOGIN } from "./types";

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

export const authReducer = (
  state = initialState,
  action: IAuthActions
): IAuth => {
  switch (action.type) {
    case LOGIN:
      return login(state, action);
    default:
      return state;
  }
};
