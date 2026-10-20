/** Corner radius scale in pixels. Brand themes map usages (control, card...) onto it. */
export const radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  full: 999
} as const;

export type RadiusKey = keyof typeof radius;
