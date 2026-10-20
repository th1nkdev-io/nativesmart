import { borders } from "./borders";
import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { elevation } from "./elevation";
import { motion } from "./motion";
import { opacity } from "./opacity";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { density, sizing } from "./sizing";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { zIndex } from "./zIndex";

export { colorSteps, palette, type ColorScale, type ColorStep, type PaletteName } from "./colors";
export type { ElevationLevel, ShadowLayer } from "./elevation";
export { darkShadowStrength } from "./elevation";
export type { RadiusKey } from "./radius";
export type { DensityKey } from "./sizing";
export type { FontSizeKey, FontWeightKey, LetterSpacingKey } from "./typography";

export const primitives = {
  colors,
  spacing,
  radius,
  typography,
  sizing,
  density,
  borders,
  elevation,
  /** Single-layer shadows used by the React Native and Flutter renderers. */
  shadows,
  opacity,
  zIndex,
  motion,
  breakpoints
} as const;

export type NativesmartPrimitives = typeof primitives;
