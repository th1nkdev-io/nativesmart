import React, { createContext, useContext, useMemo } from "react";
import { primitives, themes, type NativesmartThemeMode } from "@nativesmart/tokens";

export type NativesmartTheme = (typeof themes)[NativesmartThemeMode] & {
  spacing: typeof primitives.spacing;
  radius: typeof primitives.radius;
  typography: typeof primitives.typography;
  shadows: typeof primitives.shadows;
};

const createTheme = (mode: NativesmartThemeMode): NativesmartTheme => ({
  ...themes[mode],
  spacing: primitives.spacing,
  radius: primitives.radius,
  typography: primitives.typography,
  shadows: primitives.shadows
});

const ThemeContext = createContext<NativesmartTheme>(createTheme("light"));

export type NativesmartProviderProps = {
  mode?: NativesmartThemeMode;
  children: React.ReactNode;
};

export function NativesmartProvider({ mode = "light", children }: NativesmartProviderProps) {
  const theme = useMemo(() => createTheme(mode), [mode]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useNativesmartTheme() {
  return useContext(ThemeContext);
}
