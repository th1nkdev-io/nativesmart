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

/** Elevation level of each kind of surface, so components pick a role rather than a number. */
export const elevationUsages = {
  flat: 0,
  card: 1,
  raised: 2,
  sticky: 2,
  dropdown: 3,
  popover: 3,
  toast: 4,
  drag: 4,
  sheet: 4,
  modal: 5
} as const satisfies Record<string, ElevationLevel>;

/** Inner shadows: wells, inputs and pressed controls. Same tint and dark mode boost as elevation. */
export const insetShadows = {
  sm: [{ x: 0, y: 1, blur: 2, spread: 0, alpha: 0.06 }],
  md: [{ x: 0, y: 2, blur: 4, spread: 0, alpha: 0.1 }],
  lg: [{ x: 0, y: 4, blur: 10, spread: -2, alpha: 0.14 }]
} as const satisfies Record<string, readonly ShadowLayer[]>;

/**
 * In dark mode shadows barely show, so raised surfaces also get lighter, as in Material Design 3.
 * Amount of white mixed into the surface at each level.
 */
export const darkSurfaceLift = { 0: 0, 1: 0.03, 2: 0.05, 3: 0.07, 4: 0.09, 5: 0.12 } as const;

/** Colored halos drawn around an element in an intent color, for emphasis or a soft focus. */
export const glows = {
  sm: { spread: 3, blur: 12, alpha: 0.25 },
  md: { spread: 4, blur: 24, alpha: 0.35 },
  lg: { spread: 6, blur: 40, alpha: 0.45 }
} as const;
