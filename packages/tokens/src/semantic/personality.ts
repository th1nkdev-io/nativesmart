import type { DensityKey, FontWeightKey, RadiusKey } from "../primitives";

/**
 * A brand's character, beyond its colors and fonts. Each trait is a preset: a brand picks words,
 * and the tokens follow.
 */
export type Personality = {
  /** Corners: sharp for tools and finance, soft by default, round for friendly consumer apps. */
  shape: "sharp" | "soft" | "round";
  /** Calm slows things down and never overshoots; expressive is quicker and bouncier. */
  motion: "calm" | "standard" | "expressive";
  /** Weight of titles: light for elegance, heavy for impact. */
  headings: "light" | "balanced" | "heavy";
  /** Default density of the controls. */
  density: DensityKey;
};

export const defaultPersonality: Personality = {
  shape: "soft",
  motion: "standard",
  headings: "balanced",
  density: "comfortable"
};

/** Radius of the four base usages for each shape trait. */
export const shapePresets = {
  sharp: { control: "xs", card: "sm", overlay: "md", badge: "xs" },
  soft: { control: "md", card: "lg", overlay: "xl", badge: "full" },
  round: { control: "full", card: "2xl", overlay: "3xl", badge: "full" }
} as const satisfies Record<
  Personality["shape"],
  Record<"control" | "card" | "overlay" | "badge", RadiusKey>
>;

/** Duration factor and default curves for each motion trait. */
export const motionPresets = {
  calm: {
    durationFactor: 1.25,
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    emphasized: "cubic-bezier(0.3, 0, 0, 1)"
  },
  standard: {
    durationFactor: 1,
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    emphasized: "cubic-bezier(0.2, 0, 0, 1.2)"
  },
  expressive: {
    durationFactor: 0.85,
    standard: "cubic-bezier(0.2, 0, 0, 1.08)",
    emphasized: "cubic-bezier(0.3, 0, 0, 1.35)"
  }
} as const satisfies Record<
  Personality["motion"],
  { durationFactor: number; standard: string; emphasized: string }
>;

const weights: readonly FontWeightKey[] = [
  "light",
  "regular",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black"
];

/** Steps added to the weight of display and heading styles for each headings trait. */
export const headingShift: Record<Personality["headings"], number> = {
  light: -2,
  balanced: 0,
  heavy: 1
};

export function shiftWeight(weight: FontWeightKey, steps: number): FontWeightKey {
  const index = weights.indexOf(weight);
  return weights[Math.min(weights.length - 1, Math.max(0, index + steps))];
}
