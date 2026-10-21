/**
 * Icon drawing rules: a 24 unit grid with 2 units of padding, rounded strokes, and three stroke
 * weights. Sizes live in `sizing.icon`.
 */
export const iconography = {
  grid: 24,
  padding: 2,
  stroke: {
    thin: 1.5,
    regular: 2,
    bold: 2.5
  },
  /** Corner radius of shapes drawn inside an icon, in grid units. */
  cornerRadius: 2,
  /** Space between an icon and its label, relative to the font size. */
  gap: 0.5,
  /** Icon size that matches each text size. */
  forText: {
    "2xs": "xs",
    xs: "sm",
    sm: "sm",
    md: "md",
    lg: "md",
    xl: "lg",
    "2xl": "lg",
    "3xl": "xl"
  }
} as const;
