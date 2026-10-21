/** Corner radius scale in pixels. Brand themes map usages (control, card...) onto it. */
export const radius = {
  none: 0,
  "2xs": 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  "3xl": 32,
  full: 999
} as const;

export type RadiusKey = keyof typeof radius;

/**
 * Corner smoothing for platforms that draw continuous corners (iOS, Figma): 0 is a circular arc,
 * 1 the smoothest squircle. CSS has no equivalent yet and keeps circular corners.
 */
export const cornerSmoothing = 0.6;
