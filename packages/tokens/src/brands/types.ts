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
    /** `display` defaults to the heading font, `serif` to a system serif stack. */
    fontFamily: {
      sans: FontStack;
      heading: FontStack;
      mono: FontStack;
      display?: FontStack;
      serif?: FontStack;
    };
  };
  /**
   * Corner radius per usage, picked from the radius scale. The four first usages are required; the
   * others follow them unless the brand sets them.
   */
  shape: Pick<BrandShape, "control" | "card" | "overlay" | "badge"> & Partial<BrandShape>;
  /** Shadow color per mode; elevation opacities are applied on top. */
  shadowTint: {
    light: string;
    dark: string;
  };
  /** Accepted contrast failures, documented so they stay deliberate. */
  contrastExceptions?: readonly ContrastException[];
};

export type BrandShape = {
  /** Buttons, segmented controls, tabs. */
  control: RadiusKey;
  card: RadiusKey;
  /** Dialogs, menus, popovers. */
  overlay: RadiusKey;
  badge: RadiusKey;
  button: RadiusKey;
  input: RadiusKey;
  chip: RadiusKey;
  avatar: RadiusKey;
  image: RadiusKey;
  tooltip: RadiusKey;
  /** Top corners of bottom sheets; the bottom corners stay square. */
  sheet: RadiusKey;
};

export type BrandFonts = Required<BrandThemeInput["typography"]["fontFamily"]>;

const systemSerif: FontStack = ["Georgia", "Cambria", "Times New Roman", "serif"];

/** A brand theme with every role resolved, plus its chart and avatar colors. */
export type BrandTheme = Omit<BrandThemeInput, "colors" | "typography" | "shape"> & {
  typography: { fontFamily: BrandFonts };
  shape: BrandShape;
  colors: { light: SemanticColors; dark: SemanticColors };
  dataviz: { light: DataVizColors; dark: DataVizColors };
  avatars: { light: AvatarColors; dark: AvatarColors };
};

export function defineBrandTheme<const T extends BrandThemeInput>(
  theme: T
): Omit<T, "colors" | "typography" | "shape"> & BrandTheme {
  const { fontFamily } = theme.typography;
  const shape = theme.shape;
  const colors = {
    light: resolveColors(theme.colors.light, theme.palette, "light"),
    dark: resolveColors(theme.colors.dark, theme.palette, "dark")
  };
  return {
    ...theme,
    typography: {
      fontFamily: {
        ...fontFamily,
        display: fontFamily.display ?? fontFamily.heading,
        serif: fontFamily.serif ?? systemSerif
      }
    },
    shape: {
      button: shape.control,
      input: shape.control,
      chip: shape.badge,
      avatar: "full",
      image: shape.card,
      tooltip: shape.control,
      sheet: shape.overlay,
      ...shape
    },
    colors,
    dataviz: {
      light: resolveDataViz(colors.light, theme.palette, "light"),
      dark: resolveDataViz(colors.dark, theme.palette, "dark")
    },
    avatars: { light: resolveAvatars("light"), dark: resolveAvatars("dark") }
  };
}
