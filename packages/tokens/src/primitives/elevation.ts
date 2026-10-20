/**
 * Elevation levels. Each level is a list of shadow layers; the color comes from the brand theme
 * shadow tint, with stronger opacities in dark mode where shadows are harder to see.
 */
export type ShadowLayer = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  /** Opacity of the shadow tint in light mode. */
  alpha: number;
};

export const elevation = {
  0: [],
  1: [
    { x: 0, y: 1, blur: 2, spread: 0, alpha: 0.06 },
    { x: 0, y: 1, blur: 3, spread: 0, alpha: 0.1 }
  ],
  2: [
    { x: 0, y: 2, blur: 4, spread: -2, alpha: 0.06 },
    { x: 0, y: 4, blur: 8, spread: -2, alpha: 0.1 }
  ],
  3: [
    { x: 0, y: 4, blur: 6, spread: -2, alpha: 0.05 },
    { x: 0, y: 12, blur: 16, spread: -4, alpha: 0.1 }
  ],
  4: [
    { x: 0, y: 8, blur: 8, spread: -4, alpha: 0.04 },
    { x: 0, y: 20, blur: 24, spread: -4, alpha: 0.1 }
  ],
  5: [{ x: 0, y: 24, blur: 48, spread: -12, alpha: 0.25 }]
} as const satisfies Record<number, readonly ShadowLayer[]>;

export type ElevationLevel = keyof typeof elevation;

/** Dark mode multiplies shadow opacities by this factor. */
export const darkShadowStrength = 3;
