export const typography = {
  fontFamily: {
    sans: "Inter",
    system: "System"
  },
  /** Font sizes in pixels. */
  fontSize: {
    "2xs": 11,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60,
    "7xl": 72,
    "8xl": 96
  },
  /** Line height in pixels for each font size. */
  lineHeight: {
    "2xs": 14,
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 30,
    "2xl": 32,
    "3xl": 38,
    "4xl": 44,
    "5xl": 56,
    "6xl": 68,
    "7xl": 80,
    "8xl": 100
  },
  /** Relative line heights, for text whose size is not on the scale (fluid titles, user content). */
  leading: {
    none: 1,
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.65,
    loose: 2
  },
  fontWeight: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900"
  },
  /** Letter spacing in em. */
  letterSpacing: {
    tightest: -0.04,
    tighter: -0.02,
    tight: -0.01,
    normal: 0,
    wide: 0.02,
    wider: 0.06,
    widest: 0.12
  },
  /** Comfortable line lengths in characters. */
  measure: {
    narrow: 45,
    normal: 65,
    wide: 80
  },
  /** Link underlines, in pixels. */
  underline: {
    thickness: 1,
    hoverThickness: 2,
    offset: 3
  }
} as const;

export type FontSizeKey = keyof typeof typography.fontSize;
export type FontWeightKey = keyof typeof typography.fontWeight;
export type LetterSpacingKey = keyof typeof typography.letterSpacing;
export type LeadingKey = keyof typeof typography.leading;
