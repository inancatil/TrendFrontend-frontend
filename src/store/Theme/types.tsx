export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

type ThemeType = "dark" | "light";

export interface ITheme {
  type: ThemeType;
}

interface IToggleDarkMode {
  type: typeof TOGGLE_DARK_MODE;
}

export type ThemeActionTypes = IToggleDarkMode;
