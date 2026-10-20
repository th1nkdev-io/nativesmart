/** Component dimensions in pixels. */
export const sizing = {
  /** Height of buttons, inputs and selects. */
  control: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56
  },
  icon: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  },
  /** Minimum interactive area (Apple HIG 44pt, WCAG 2.2 target size). */
  touchTarget: 44,
  /** Maximum content widths. */
  container: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
  }
} as const;

/** Control height multipliers per density. */
export const density = {
  compact: 0.875,
  comfortable: 1,
  spacious: 1.125
} as const;

export type DensityKey = keyof typeof density;
