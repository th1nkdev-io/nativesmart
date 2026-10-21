/** Background blur radii in pixels. */
export const blur = {
  sm: 4,
  md: 12,
  lg: 24,
  xl: 40
} as const;

/**
 * Translucent materials, as on iOS and Windows: the surface lets the content behind it show
 * through, blurred and slightly saturated. `opacity` is the share of the surface color.
 */
export const materials = {
  thin: { opacity: 0.6, blur: 12, saturate: 1.6 },
  regular: { opacity: 0.72, blur: 20, saturate: 1.8 },
  thick: { opacity: 0.86, blur: 32, saturate: 1.8 }
} as const;

export type MaterialName = keyof typeof materials;
