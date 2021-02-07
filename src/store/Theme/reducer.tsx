import { ITheme, ThemeActionTypes, TOGGLE_DARK_MODE } from "./types";

const initialState: ITheme = {
  type: "light",
};

export const themeReducer = (
  state = initialState,
  action: ThemeActionTypes
): ITheme => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return { ...state, type: state.type === "light" ? "dark" : "light" };
    default:
      return state;
  }
};
