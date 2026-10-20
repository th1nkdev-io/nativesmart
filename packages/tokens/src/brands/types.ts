import type { ColorScale, RadiusKey } from "../primitives";
import type { SemanticColorRole, SemanticColors } from "../semantic/roles";

export type FontStack = readonly string[];

export type ContrastException = {
  foreground: SemanticColorRole;
  background: SemanticColorRole;
  mode: "light" | "dark";
  reason: string;
};

/**
 * A brand theme gives values to every semantic role. Components never change between brands:
 * only these values do.
 */
export type BrandTheme = {
  id: string;
  name: string;
  description: string;
  /** Brand scales, exposed as `--ns-palette-<name>-<step>`. */
  palette: {
    primary: ColorScale;
    secondary: ColorScale;
    neutral: ColorScale;
  };
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
  /** Corner radius per usage, picked from the radius scale. */
  shape: {
    control: RadiusKey;
    card: RadiusKey;
    overlay: RadiusKey;
    badge: RadiusKey;
  };
  /** Shadow color per mode; elevation opacities are applied on top. */
  shadowTint: {
    light: string;
    dark: string;
  };
  /** Accepted contrast failures, documented so they stay deliberate. */
  contrastExceptions?: readonly ContrastException[];
};

export function defineBrandTheme<const T extends BrandTheme>(theme: T): T {
  return theme;
}
