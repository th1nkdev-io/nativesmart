export const opacity = {
  disabled: 0.48,
  muted: 0.64,
  overlay: 0.56,
  /** State layers drawn in the content color over a surface, as in Material Design. */
  hover: 0.08,
  focus: 0.12,
  pressed: 0.12,
  selected: 0.1,
  dragged: 0.16
} as const;

/** Interaction states that draw a layer over a surface. */
export const stateLayers = ["hover", "focus", "pressed", "selected", "dragged"] as const;

export type StateLayer = (typeof stateLayers)[number];

/**
 * Translucent steps, from barely visible to almost opaque. Applied to white and black, they put
 * content over images, video and gradients in any mode.
 */
export const alpha = {
  1: 0.02,
  2: 0.04,
  3: 0.06,
  4: 0.08,
  5: 0.12,
  6: 0.16,
  7: 0.24,
  8: 0.32,
  9: 0.48,
  10: 0.64,
  11: 0.8,
  12: 0.92
} as const;
