import { colors } from "./colors";
import { motion } from "./motion";
import { opacity } from "./opacity";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { zIndex } from "./zIndex";

export const primitives = {
  colors,
  spacing,
  radius,
  typography,
  shadows,
  opacity,
  zIndex,
  motion,
  breakpoints: {
    phone: 0,
    tablet: 768
  }
} as const;

export type NativesmartPrimitives = typeof primitives;
