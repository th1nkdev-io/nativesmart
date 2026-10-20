export const typography = {
  fontFamily: {
    sans: "Inter",
    system: "System"
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
    "6xl": 60
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 30,
    "2xl": 32,
    "3xl": 38,
    "4xl": 44,
    "5xl": 56,
    "6xl": 68
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  },
  /** Letter spacing in em. */
  letterSpacing: {
    tighter: -0.02,
    tight: -0.01,
    normal: 0,
    wide: 0.02,
    wider: 0.06
  }
} as const;

export type FontSizeKey = keyof typeof typography.fontSize;
export type FontWeightKey = keyof typeof typography.fontWeight;
export type LetterSpacingKey = keyof typeof typography.letterSpacing;
