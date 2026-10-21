import type { ColorScale, RadiusKey } from "../primitives";
import {
  resolveAvatars,
  resolveColors,
  resolveDataViz,
  type AvatarColors,
  type DataVizColors
} from "../semantic/derive";
import type { BrandColors, SemanticColorRole, SemanticColors } from "../semantic/roles";

export type FontStack = readonly string[];

export type ContrastException = {
  foreground: SemanticColorRole;
  background: SemanticColorRole;
  mode: "light" | "dark";
  reason: string;
};

/**
 * A brand theme as written: the core color roles, plus any derived role to override. Components
 * never change between brands: only these values do.
 */
export type BrandThemeInput = {
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
    light: BrandColors;
    dark: BrandColors;
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

/** A brand theme with every semantic role resolved, plus its chart and avatar colors. */
export type BrandTheme = Omit<BrandThemeInput, "colors"> & {
  colors: { light: SemanticColors; dark: SemanticColors };
  dataviz: { light: DataVizColors; dark: DataVizColors };
  avatars: { light: AvatarColors; dark: AvatarColors };
};

export function defineBrandTheme<const T extends BrandThemeInput>(
  theme: T
): Omit<T, "colors"> & BrandTheme {
  const colors = {
    light: resolveColors(theme.colors.light, theme.palette, "light"),
    dark: resolveColors(theme.colors.dark, theme.palette, "dark")
  };
  return {
    ...theme,
    colors,
    dataviz: {
      light: resolveDataViz(colors.light, theme.palette, "light"),
      dark: resolveDataViz(colors.dark, theme.palette, "dark")
    },
    avatars: { light: resolveAvatars("light"), dark: resolveAvatars("dark") }
  };
}
