import type { ColorScale, RadiusKey } from "../primitives";
import {
  resolveAvatars,
  resolveColors,
  resolveDataViz,
  type AvatarColors,
  type DataVizColors
} from "../semantic/derive";
import { resolveHighContrast } from "../semantic/high-contrast";
import { defaultPersonality, shapePresets, type Personality } from "../semantic/personality";
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
  /** Character traits: corners, motion, title weight and density. Unset traits use the defaults. */
  personality?: Partial<Personality>;
  /**
   * Corner radius per usage, picked from the radius scale. Unset usages come from the shape trait
   * of the personality; the secondary usages then follow the base ones.
   */
  shape?: Partial<BrandShape>;
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
export type BrandTheme = Omit<
  BrandThemeInput,
  "colors" | "typography" | "shape" | "personality"
> & {
  typography: { fontFamily: BrandFonts };
  personality: Personality;
  shape: BrandShape;
  colors: { light: SemanticColors; dark: SemanticColors };
  /** AAA versions of the colors, for `data-ns-theme="light-hc"` and `"dark-hc"`. */
  highContrast: { light: SemanticColors; dark: SemanticColors };
  dataviz: { light: DataVizColors; dark: DataVizColors };
  avatars: { light: AvatarColors; dark: AvatarColors };
};

export function defineBrandTheme<const T extends BrandThemeInput>(
  theme: T
): Omit<T, "colors" | "typography" | "shape" | "personality"> & BrandTheme {
  const { fontFamily } = theme.typography;
  const personality = { ...defaultPersonality, ...theme.personality };
  const shape = { ...shapePresets[personality.shape], ...theme.shape };
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
    personality,
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
    highContrast: {
      light: resolveHighContrast(colors.light, theme.palette, "light"),
      dark: resolveHighContrast(colors.dark, theme.palette, "dark")
    },
    dataviz: {
      light: resolveDataViz(colors.light, theme.palette, "light"),
      dark: resolveDataViz(colors.dark, theme.palette, "dark")
    },
    avatars: { light: resolveAvatars("light"), dark: resolveAvatars("dark") }
  };
}
