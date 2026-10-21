import { thinkdevTheme } from "./brands/thinkdev";

/** Default themes of the mobile renderers: the Thinkdev colors with every role resolved. */
export const lightTheme = {
  mode: "light",
  colors: thinkdevTheme.colors.light
} as const;

export const darkTheme = {
  mode: "dark",
  colors: thinkdevTheme.colors.dark
} as const;

export const themes = {
  light: lightTheme,
  dark: darkTheme
} as const;

export type NativesmartTheme = typeof lightTheme;
export type NativesmartThemeMode = keyof typeof themes;
