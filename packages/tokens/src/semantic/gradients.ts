import type { SemanticColorRole } from "./roles";

export type Gradient = {
  /** Direction in degrees, as in CSS `linear-gradient`. */
  angle: number;
  stops: readonly SemanticColorRole[];
};

/** Brand gradients, built from roles so they follow the identity and the color mode. */
export const gradients = {
  brand: { angle: 135, stops: ["primary", "secondary"] },
  brandSoft: { angle: 135, stops: ["primaryMuted", "secondaryMuted"] },
  brandDeep: { angle: 160, stops: ["surfaceBrand", "primaryPressed"] },
  surface: { angle: 180, stops: ["surface", "surfaceMuted"] }
} as const satisfies Record<string, Gradient>;
