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
    "2xs": 10,
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    "2xl": 40,
    "3xl": 48
  },
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    "2xl": 96
  },
  /** Minimum interactive area (Apple HIG 44pt, WCAG 2.2 target size). */
  touchTarget: 44,
  /** Interactive areas: WCAG 2.2 AA minimum, Apple HIG and Material Design. */
  touchTargets: {
    minimum: 24,
    comfortable: 44,
    android: 48
  },
  /** Maximum content widths. */
  container: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
  },
  /** Dialog widths; `full` takes the whole screen on phones. */
  dialog: {
    sm: 400,
    md: 560,
    lg: 720,
    xl: 960
  },
  /** Maximum widths of floating content. */
  floating: {
    tooltip: 240,
    popover: 320,
    menu: 280,
    toast: 400
  }
} as const;

/** Media ratios, written as in CSS `aspect-ratio`. */
export const aspectRatios = {
  square: "1 / 1",
  photo: "4 / 3",
  video: "16 / 9",
  wide: "21 / 9",
  portrait: "3 / 4",
  story: "9 / 16"
} as const;

/** Control height multipliers per density. */
export const density = {
  compact: 0.875,
  comfortable: 1,
  spacious: 1.125
} as const;

export type DensityKey = keyof typeof density;
