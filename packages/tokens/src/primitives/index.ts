import { borders } from "./borders";
import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { accessibility } from "./accessibility";
import { darkSurfaceLift, elevation, elevationUsages, glows, insetShadows } from "./elevation";
import { iconography } from "./icons";
import { blur, materials } from "./materials";
import { motion } from "./motion";
import { alpha, opacity } from "./opacity";
import { chrome, grid } from "./layout";
import { cornerSmoothing, radius } from "./radius";
import { shadows } from "./shadows";
import { aspectRatios, density, sizing } from "./sizing";
import { spaceUsages, spacing } from "./spacing";
import { typography } from "./typography";
import { zIndex } from "./zIndex";

export { colorSteps, palette, type ColorScale, type ColorStep, type PaletteName } from "./colors";
export type { ElevationLevel, ShadowLayer } from "./elevation";
export { darkShadowStrength } from "./elevation";
export { sampleSpring, type DurationKey, type EasingKey, type SpringName } from "./motion";
export type { MaterialName } from "./materials";
export { stateLayers, type StateLayer } from "./opacity";
export type { RadiusKey } from "./radius";
export type { SpacingKey } from "./spacing";
export { safeAreas, type GridBreakpoint } from "./layout";
export type { DensityKey } from "./sizing";
export type { FontSizeKey, FontWeightKey, LeadingKey, LetterSpacingKey } from "./typography";

export const primitives = {
  colors,
  spacing,
  /** Spacing by intent: inset, stack, inline and section. */
  spaceUsages,
  radius,
  cornerSmoothing,
  typography,
  sizing,
  density,
  aspectRatios,
  /** Responsive grid per breakpoint. */
  grid,
  /** Sizes of the application frame. */
  chrome,
  borders,
  elevation,
  /** Elevation level per kind of surface. */
  elevationUsages,
  insetShadows,
  darkSurfaceLift,
  glows,
  blur,
  materials,
  iconography,
  accessibility,
  /** Single-layer shadows used by the React Native and Flutter renderers. */
  shadows,
  opacity,
  /** Translucent steps applied to white and black. */
  alpha,
  zIndex,
  motion,
  breakpoints
} as const;

export type NativesmartPrimitives = typeof primitives;
