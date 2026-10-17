import type { SemanticColors } from "../semantic/roles";

export type FontStack = readonly string[];

/**
 * A brand theme gives values to every semantic role. Components never change between brands:
 * only these values do.
 */
export type BrandTheme = {
  id: string;
  name: string;
  description: string;
  colors: {
    light: SemanticColors;
    dark: SemanticColors;
  };
  typography: {
    fontFamily: {
      sans: FontStack;
      heading: FontStack;
      mono: FontStack;
    };
  };
};

export function defineBrandTheme<const T extends BrandTheme>(theme: T): T {
  return theme;
}
