import { semanticColors } from "./semantic/colors";

export const lightTheme = {
  mode: "light",
  colors: semanticColors.light
} as const;

export const darkTheme = {
  mode: "dark",
  colors: semanticColors.dark
} as const;

export const themes = {
  light: lightTheme,
  dark: darkTheme
} as const;

export type NativesmartTheme = typeof lightTheme;
export type NativesmartThemeMode = keyof typeof themes;
